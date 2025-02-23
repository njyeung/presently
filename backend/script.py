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


def find_categories(query: str, category_list: list) -> list:
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

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that helps with finding product categories given specific user queries.",
            },
            {
                "role": "user",
                "content": f"""Given this query: {query}, find the most relevant categories from this list: {category_list}. 
                I want you to pick out the category that you think is the most representative of what this person wants to buy. 
                Then, the relevant categories that I want you to pick out from the list should be very closely related to this said category.
                Limit your answer to FIVE categories, and return them as a list of python strings. 
                In your output, ONLY inclde the list, don't include the code block indents. 
                Order the items in the list by the most relevant keywords that will pinpoint the best products for the user.""",
            },
        ],
        temperature=1,
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


def find_top_products(query: str) -> list:
    """
    Finds the top 10 products for each category, prioritizing niche products.
    """
    category_list = LLM_feed()
    top_categories = find_categories(query=query, category_list=category_list)

    all_products = pd.DataFrame(query_all_from_table("products"))
    all_product_categories = pd.DataFrame(query_all_from_table("product_categories"))
    all_categories = pd.DataFrame(query_all_from_table("categories"))

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

    return sorted_results.head(10).to_dict("records")


if __name__ == "__main__":
    import json

    top_products = find_top_products(query="Car,Male,Age 16")
    print(json.dumps(top_products, indent=4))


def lambda_handler(event, context):
    try:
        # Extract query from request body
        body = json.loads(event.get("body", "{}"))
        query = body.get("query", "")

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

        # Get product recommendations
        products = find_top_products(query)

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
