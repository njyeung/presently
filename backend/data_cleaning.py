import pandas as pd
import ast
import logging
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

supabase = create_client(
    supabase_key=os.getenv("SUPABASE_SECRET_KEY"),
    supabase_url=os.getenv("SUPABASE_URL"),
)


def _format_array_for_postgres(arr):
    """Convert a Python list to a PostgreSQL array format string. Helper method for generate_products()"""
    if not arr:
        return "{}"
    return "{" + ",".join(f'"{str(x).replace("""'""", """''""")}"' for x in arr) + "}"


def generate_products():
    """
    Generates a DataFrame of products from the given CSV file and store them in Supabase.
    """
    df = pd.read_csv("amazon_com_best_sellers_2025_01_27.csv")
    cleaned_df = (
        df[["name", "url", "imageUrls", "salePrice"]].copy().drop_duplicates().dropna()
    )
    i = 1
    for index, row in cleaned_df.iterrows():
        try:
            cleaned_df.loc[index, "id"] = i
            i += 1
            # Handle both regular strings and Unicode escape sequences
            try:
                name = row["name"].encode("ascii").decode("unicode-escape")
            except UnicodeEncodeError:
                name = row["name"]
            cleaned_df.loc[index, "name"] = name
            image_urls = ast.literal_eval(row["imageUrls"])
            cleaned_df.loc[index, "imageUrls"] = _format_array_for_postgres(image_urls)
            cleaned_df.loc[index, "salePrice"] = (
                row["salePrice"] if not pd.isna(row["salePrice"]) else None
            )
        except Exception as e:
            logging.error(f"Error processing row {index}: {e}")
            continue
    cleaned_df["id"] = cleaned_df["id"].astype(int)

    supabase.table("products").upsert(cleaned_df.to_dict(orient="records")).execute()

    return cleaned_df


def generate_categories() -> set:
    """
    Generates a unique set categories from the given DataFrame and store them in Supabase.
    """

    df = pd.read_csv("amazon_com_best_sellers_2025_01_27.csv")
    cleand_df = df[["breadcrumbs"]]
    all_categories = set()
    for index, row in cleand_df.iterrows():
        try:
            categories_dict = ast.literal_eval(row["breadcrumbs"])
            categories = categories_dict[0:1] + categories_dict[-2:-1]
            categories = [category.get("name") for category in categories]
            for category in categories:
                all_categories.add(category)
        except Exception as e:
            continue
    print(len(all_categories))

    all_categories_dict = []
    i = 1
    for category in all_categories:
        all_categories_dict.append({"name": category, "id": i})
        i += 1

    supabase.table("categories").upsert(all_categories_dict).execute()
    return all_categories


def generate_product_categories():
    """
    Creates N:N mapping between products and categories.
    """
    sp_products: pd.DataFrame = pd.read_csv("products_rows.csv")
    sp_categories: pd.DataFrame = pd.read_csv("categories_rows.csv")
    products_df = pd.read_csv("amazon_com_best_sellers_2025_01_27.csv")
    clean_df = (
        products_df[["breadcrumbs", "name"]]
        .dropna(subset=["breadcrumbs", "name"])
        .drop_duplicates(subset=["name"])
    )
    logging.info(f"Processing {len(clean_df)} unique products")

    products_id_dict = dict(zip(sp_products["name"], sp_products["id"]))
    categories_id_dict = dict(zip(sp_categories["name"], sp_categories["id"]))
    product_categories = []

    for index, row in clean_df.iterrows():
        try:
            categories_dict = ast.literal_eval(row["breadcrumbs"])

            # Validate breadcrumbs structure
            if not isinstance(categories_dict, list):
                logging.warning(f"Invalid breadcrumbs format for product {row['name']}")
                continue

            # We need at least 2 categories for our logic
            if len(categories_dict) < 2:
                logging.warning(f"Too few breadcrumbs for product {row['name']}")
                continue

            # Get the first and second-to-last categories
            categories_to_use = []
            if len(categories_dict) >= 1:
                categories_to_use.append(categories_dict[0])
            if len(categories_dict) >= 2:
                categories_to_use.append(categories_dict[-2])

            product_id = products_id_dict.get(row["name"])
            if not product_id:
                logging.warning(f"Product not found in mapping: {row['name']}")
                continue

            # Process each selected category
            for category_dict in categories_to_use:
                if not isinstance(category_dict, dict) or "name" not in category_dict:
                    logging.warning(
                        f"Invalid category format for product {row['name']}"
                    )
                    continue

                category_name = category_dict["name"]
                category_id = categories_id_dict.get(category_name)

                if not category_id:
                    logging.warning(f"Category not found in mapping: {category_name}")
                    continue

                product_categories.append(
                    {"product_id": product_id, "category_id": category_id}
                )

        except Exception as e:
            logging.error(f"Error processing product {row['name']}: {e}")
            continue

    product_categories = pd.DataFrame(product_categories).drop_duplicates()
    logging.info(f"Generated {len(product_categories)} product-category mappings")

    supabase.table("product_categories").upsert(
        product_categories.to_dict(orient="records")
    ).execute()

    return product_categories


# TODO
def query_all_from_table(table_name: str):
    all_data = []
    more = True
    offset = 0
    limit = 1000
    while more:
        list = (
            supabase.table(table_name)
            .select("*")
            .range(offset, offset + limit - 1)
            .execute()
            .data
        )
        all_data.extend(list)
        if len(list) < limit:
            more = False
    return all_data


if __name__ == "__main__":
    # generate_products()
    generate_product_categories()
    # generate_categories()
