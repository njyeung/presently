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
        df[["name", "url", "imageUrls", "salePrice", "reviewCount"]]
        .copy()
        .drop_duplicates()
        .dropna()
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
    cleaned_df["reviewCount"] = cleaned_df["reviewCount"].astype(int)

    supabase.table("products").upsert(cleaned_df.to_dict(orient="records")).execute()

    return cleaned_df


def generate_categories() -> set:
    """
    Generates a unique set of categories from the given DataFrame and stores them in Supabase.
    Now includes 'importance' based on the category's position in breadcrumbs.
    """
    df = pd.read_csv("amazon_com_best_sellers_2025_01_27.csv", low_memory=False)
    cleand_df = df[["breadcrumbs"]]
    
    # Dictionary to store category:importance pairs
    categories_importance = {}
    
    for index, row in cleand_df.iterrows():
        try:
            categories_dict = ast.literal_eval(row["breadcrumbs"])
            categories = None

            if len(categories_dict) < 2:
                categories = categories_dict[0:1]
            elif len(categories_dict) < 3:
                categories = categories_dict[0:3]
            else:
                categories = categories_dict[0:-1]
                
            # Process categories with their positions
            for pos, category_dict in enumerate(categories):
                category_name = category_dict.get("name")
                # Store the maximum position (most niche) for each category
                if category_name not in categories_importance or pos > categories_importance[category_name]:
                    categories_importance[category_name] = pos
                    
        except Exception as e:
            continue

    print(f"Found {len(categories_importance)} categories")

    # Create the final list of categories with IDs and importance
    all_categories_dict = []
    i = 1
    for category, importance in categories_importance.items():
        all_categories_dict.append({
            "name": category,
            "id": i,
            "importance": importance
        })
        i += 1

    supabase.table("categories").upsert(all_categories_dict).execute()
    return set(categories_importance.keys())


def update_categories():
    """
    Updates the productCount column in the categories table based on the number of
    products associated with each category in the product_categories table.
    Uses bulk update for better performance.
    """
    # Get all categories and product_categories
    product_categories_df = pd.DataFrame(query_all_from_table("product_categories"))
    
    # Group by category_id and count products
    category_counts = (
        product_categories_df.groupby("category_id")
        .size()
        .reset_index(name="productCount")
    )
    
    # Rename category_id to id to match the categories table
    category_counts = category_counts.rename(columns={"category_id": "id"})
    
    # Prepare bulk update data
    update_data = category_counts.to_dict(orient="records")
    
    # Perform bulk update
    supabase.table("categories").upsert(update_data).execute()
    
    logging.info(f"Bulk updated product counts for {len(category_counts)} categories")
    return category_counts


def generate_product_categories():
    """
    Creates N:N mapping between products and categories.
    """
    sp_products: pd.DataFrame = pd.DataFrame(query_all_from_table("products"))
    sp_categories: pd.DataFrame = pd.DataFrame(query_all_from_table("categories"))
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
                categories = categories_dict[0:1]
            elif len(categories_dict) < 3:
                categories = categories_dict[0:3]
            else:
                categories = categories_dict[0:-1]

            product_id = products_id_dict.get(row["name"])
            if not product_id:
                logging.warning(f"Product not found in mapping: {row['name']}")
                continue

            # Process each selected category
            for category_dict in categories:
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


def query_all_from_table(table_name: str):
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


if __name__ == "__main__":
    # generate_products()
    generate_product_categories()
    # generate_categories()
    # update_categories()
    pass
