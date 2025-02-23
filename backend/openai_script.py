def generate_keywords(query: str) -> list:
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
                "content": "You are a helpful assistant that helps with generating keywords for products.",
            },
            {
                "role": "user",
                "content": f"Generate me 20 amazon product categories associated with this information: {query}, ONLY return a python list without putting it into a code block.",
            },
        ],
        temperature=0.7,
    )
    response = completion.choices[0].message.content
    print(response)
    # return ast.literal_eval(response)


if __name__ == "__main__":
    generate_keywords("Valentine's, Male, Gift, Car")
    # print(generate_keywords("laptop"))
