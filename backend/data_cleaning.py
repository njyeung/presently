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
            image_urls = ast.literal_eval(row["imageUrls"])
            cleaned_df.loc[index, "imageUrls"] = _format_array_for_postgres(image_urls)
            cleaned_df.loc[index, "salePrice"] = (
                row["salePrice"] if not pd.isna(row["salePrice"]) else None
            )
        except Exception as e:
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
            categories = [categories_dict[-2].get("name")]
            for category in categories:
                all_categories.add(category)
        except Exception as e:
            # logging.error(f"Error processing row {index}: {e}")
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
    clean_df = products_df[["breadcrumbs", "name"]].dropna().drop_duplicates()

    products_id_dict = dict(zip(sp_products["name"], sp_products["id"]))
    categories_id_dict = dict(zip(sp_categories["name"], sp_categories["id"]))

    product_categories = []
    for index, row in clean_df.iterrows():
        try:
            categories_dict = ast.literal_eval(row["breadcrumbs"])
            if len(categories_dict) < 2:
                continue
            tmp_categories = categories_dict[-2:]
            tmp_categories = [category.get("name") for category in tmp_categories]
            for category in tmp_categories:
                product_id = products_id_dict.get(row["name"]) or None
                category_id = categories_id_dict.get(category) or None

                if product_id and category_id:
                    product_categories.append(
                        {"product_id": product_id, "category_id": category_id}
                    )
                else:
                    continue

        except (ValueError, SyntaxError) as e:
            logging.error(f"Error processing row {index}: {e}")
            continue
        except Exception as e:
            logging.info(f"Unexpected error processing row {index}: {e}", exc_info=True)
            continue
    product_categories = pd.DataFrame(product_categories).drop_duplicates()
    supabase.table("product_categories").upsert(
        product_categories.to_dict(orient="records")
    ).execute()


if __name__ == "__main__":
    # generate_products()
    generate_product_categories()
