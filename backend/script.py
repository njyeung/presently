from supabase import Client, create_client
from dotenv import load_dotenv
import os
from data_cleaning import query_all_from_table
import pandas as pd

load_dotenv()

supabase = create_client(
    supabase_key=os.getenv("SUPABASE_SECRET_KEY"),
    supabase_url=os.getenv("SUPABASE_URL"),
)


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
                "content": f"Given this query: {query}, find the most relevant categories from this list: {category_list}. Limit your answer to 10 categories, and return them as a list of python strings. In your output, ONLY inclde the list, don't include the code block indents",
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


def find_top_products(query: str) -> list:
    """
    Finds the top 10 products for each category.
    """
    # category_list = LLM_feed()
    # top_categories = find_categories(query=query, category_list=category_list)
    top_categories = [
        "Gift Cards",
        "Humor & Satire",
        "Party Supplies",
        "Toys & Games",
        "Funny Gifts",
        "Comedy & Spoken Word",
        "Boys",
        "Men",
        "Family",
        "Comedy",
    ]

    all_products = pd.DataFrame(query_all_from_table("products"))
    all_product_categories = pd.DataFrame(query_all_from_table("product_categories"))
    all_categories = pd.DataFrame(query_all_from_table("categories"))

    # Category joins
    category_mapping = all_product_categories.merge(
        all_categories, left_on="category_id", right_on="id", how="left"
    )
    matching_categories = category_mapping[
        category_mapping["name"].isin(top_categories)
    ]
    product_category_counts = (
        matching_categories.groupby("product_id")
        .size()
        .reset_index(name="category_count")
    )

    # Product joins
    results = product_category_counts.merge(
        all_products, left_on="product_id", right_on="id", how="left"
    )
    sorted_results = results.sort_values(
        by=["category_count", "reviewCount"], ascending=[False, False]
    )

    return sorted_results.head(20).to_dict("records")


if __name__ == "__main__":
    import json

    top_products = find_top_products(query="")
    print(json.dumps(top_products, indent=4))
