from supabase import Client, create_client
from dotenv import load_dotenv
import os

load_dotenv()

supabase = create_client(
    supabase_key=os.getenv("SUPABASE_SECRET_KEY"),
    supabase_url=os.getenv("SUPABASE_URL"),
)

def find_categories(query: str, category_list: list) -> list:
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
    # return ast.literal_eval(response)


def feed_LLM():
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


if __name__ == "__main__":
    find_categories(query="Birthday, Male, Family, Funny", category_list=feed_LLM())
