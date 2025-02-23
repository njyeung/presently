from supabase import Client, create_client
from dotenv import load_dotenv
import os
import pandas as pd
import json

load_dotenv()

supabase = create_client(
    supabase_key=os.getenv("SUPABASE_SECRET_KEY"),
    supabase_url=os.getenv("SUPABASE_URL"),
)


def query_all_from_table(table_name: str):
    """Returns all data from a given table in the supabase database."""
    all_data = []
    more = True
    offset = 0
    limit = 10000
    while more:
        list = (
            supabase.table(table_name)
            .select("*")
            .range(offset, offset + limit - 1)
            .execute()
            .data
        )
        all_data.extend(list)
        offset += limit
        if len(list) < limit:
            more = False
    return all_data


def find_categories(title: str, query: str, category_list: list) -> list:
    """
    Finds the most relevant categories given a user query.
    """
    from dotenv import load_dotenv
    import os
    from openai import OpenAI
    import ast

    load_dotenv()
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    client = OpenAI(api_key=OPENAI_API_KEY)
    first_term = query.split(",")[0]
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that helps with finding product categories given specific user queries.",
            },
            {
                "role": "user",
                "content": f"""Given the occasion '{title}' and search query '{query}', analyze these categories: {category_list}
                    Select up to 3 most relevant categories, with:
                    1. The single most representative category for this search
                    2. Three similar related categories that are relevant to the search
                    The first term of the query ({first_term}) is the one that the person is most interested in.
                    Return only a Python list of strings, ordered by relevance. 
                    Remove the python block formatting, only return the list.""",
            },
        ],
        temperature=0.7,
    )
    response = completion.choices[0].message.content
    print(response)
    return ast.literal_eval(response)


def LLM_feed():
    """
    Returns a list of all categories from the supabase database.
    """
    all_data = []
    more = True
    offset = 0
    limit = 1000
    while more:
        categories_list = (
            supabase.table("categories")
            .select("*")
            .range(offset, offset + limit - 1)
            .execute()
            .data
        )
        categories_list = [category["name"] for category in categories_list]
        offset += limit
        all_data.extend(categories_list)
        if len(categories_list) < limit:
            more = False

    return all_data


def find_top_products(title: str, query: str, price: float = None) -> list:
    """
    Finds the most relevant products based on categories and refines the selection using GPT.
    """
    category_list = LLM_feed()
    top_categories = find_categories(
        title=title, query=query, category_list=category_list
    )

    all_products = pd.DataFrame(query_all_from_table("products"))
    all_product_categories = pd.DataFrame(query_all_from_table("product_categories"))
    all_categories = pd.DataFrame(query_all_from_table("categories"))

    # Filter products by price if price parameter is provided
    if price is not None and price > 0:
        price_tolerance = 0.2  # 20% tolerance
        price_min = price * (1 - price_tolerance)
        price_max = price * (1 + price_tolerance)
        all_products = all_products[
            (all_products["salePrice"] >= price_min)
            & (all_products["salePrice"] <= price_max)
            & (all_products["salePrice"] <= price)
        ]

    # Category joins with productCount and importance included
    category_mapping = all_product_categories.merge(
        all_categories[["id", "name", "productCount", "importance"]],
        left_on="category_id",
        right_on="id",
        how="left",
    )

    matching_categories = category_mapping[
        category_mapping["name"].isin(top_categories)
    ]

    # Calculate category stats including importance
    product_stats = (
        matching_categories.groupby("product_id")
        .agg(
            {
                "name": "count",  # This becomes category_count
                "productCount": "min",  # Get the most niche category count
                "importance": "max",  # Get the most specific category level
            }
        )
        .reset_index()
    )
    product_stats.columns = [
        "product_id",
        "category_count",
        "min_product_count",
        "max_importance",
    ]

    # Get categories for each product
    product_categories = (
        category_mapping[["product_id", "name"]]
        .groupby("product_id")
        .agg({"name": lambda x: list(x)})
        .reset_index()
        .rename(columns={"name": "categories"})
    )

    # Product joins
    results = product_stats.merge(
        all_products, left_on="product_id", right_on="id", how="left"
    ).merge(product_categories, on="product_id", how="left")

    # Sort by importance (descending), then other criteria
    sorted_results = results.sort_values(
        by=[
            "max_importance",  # Most specific categories first
            "min_product_count",  # Then most niche products
            "category_count",  # Then most matching categories
            "reviewCount",  # Then most reviewed
        ],
        ascending=[True, True, False, False],
    )

    # Get initial top 10 products
    initial_results = sorted_results.head(10).to_dict("records")

    # Refine to top 5 most relevant products
    final_results = refine_products(initial_results, title, query, price)

    return final_results


def refine_products(products: list, title: str, query: str, price: float) -> list:
    """
    Uses GPT to analyze and select the top 5 most relevant products from the initial 10 products.
    """
    from openai import OpenAI
    import ast

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    # Prepare product information for GPT
    product_info = []
    for p in products:
        info = {
            "name": p["name"],
            "categories": p["categories"],
            "price": p["salePrice"],
            "id": p["id"],
        }
        product_info.append(info)

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that analyzes product relevance for gift recommendations.",
            },
            {
                "role": "user",
                "content": f"""For the occasion '{title}', search criteria '{query}' and given price {price}, analyze these products:
                    {product_info}
                    
                    Select the FIVE most relevant products considering:
                    1. How well the product matches the occasion
                    2. How well it matches the search criteria
                    3. How appropriate the product categories are
                    4. How closely it matches the price
                    
                    Return only a Python list of product IDs, ordered by relevance.
                    No explanation needed, just the list of IDs without the python indentation block.""",
            },
        ],
        temperature=0.7,
    )

    selected_ids = ast.literal_eval(completion.choices[0].message.content)

    # Filter and sort the original products list based on selected IDs
    selected_products = [p for p in products if p["id"] in selected_ids]
    # Sort products to match the order of selected_ids
    selected_products.sort(key=lambda x: selected_ids.index(x["id"]))

    return selected_products


if __name__ == "__main__":
    import json

    top_products = find_top_products(
        title="Birthday", query="Toys,Male,Age 32", price=20
    )
    print(json.dumps(top_products, indent=4))


def lambda_handler(event, context):
    try:
        # Extract query and price from request body
        body = json.loads(event.get("body", "{}"))
        title = body.get("title", "")
        query = body.get("query", "")
        price = body.get("price", None)
        price = float(price) if price is not None else None
        if not query:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                "body": json.dumps(
                    {"error": "Query parameter is required in request body"}
                ),
            }

        # Get product recommendations with refined selection
        products = find_top_products(title=title, query=query, price=price)

        # Return successful response
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps(products),
        }
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"error": "Invalid JSON in request body"}),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"error": str(e)}),
        }
