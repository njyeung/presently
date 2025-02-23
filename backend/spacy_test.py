import pandas as pd
import json
import re
import spacy
import numpy as np

##### This is an attempt to turn a few key subcategories of the product into a vector.
#  Save the vector for each product (average out 2 categories). Currently, vectors keep increasing, which means something 
# is strange about how they save (see output.txt, they increase until becoming infinite). Need a different way to get vectors

df = pd.read_csv("amazon_com_best_sellers_2025_01_27.csv", header = 0)

def clean_breadcrumbs(breadcrumbs):
    try:
        # Parse the JSON-like string
        breadcrumb_list = json.loads(breadcrumbs)

        # Extract values from 'name' and remove non-letter characters
        cleaned = [" ".join(re.findall(r'[A-Za-z]+', item["name"])) for item in breadcrumb_list]

        # Join back into a string
        cleaned = " ".join(cleaned)
        return cleaned
    
    except Exception:
        return ""

# Apply function to the entire column
df["breadcrumbs"] = df["breadcrumbs"].apply(clean_breadcrumbs)

nlp = spacy.load("en_core_web_lg")

# get a vector value for each row
vector_array = np.zeros(shape = (26000, 300))
hashmap = dict()
for index, row in df.iterrows():
    try:
        # get set of vectors for the "breadcrumbs" words
        nlps = np.zeroes()
#        for i in df.loc[index,["breadcrumbs"]].to_string().split():

        doc = nlp((df.loc[index,["breadcrumbs"]]).to_string())
        n = len(df.loc[index,["breadcrumbs"]].to_string().split())

        summation = doc[0].vector
        # summation is vector for the row 0 of "breadcrumbs" column
        for i in range(n-2, n):
            if doc[i] not in hashmap:
                # the average vector for the position
                t = 0
                for token in doc:
                    t += 1
                # get the average
                hashmap[doc[i]] = doc[i].vector / t
            summation += hashmap[doc[i]]
        vector_array[index] = summation/2
        if index%500 == 0:
            print(index)
    except:
        if index%500 == 0:
            print(index)
        print("Potential Error")
        continue

# add the new column
# df["vector"] = np.array(vector_array)
#df.to_csv('modified_amazon.csv', index=False)

# save output to file

#with open("output.txt", "w") as filehandle:
#    json.dump(vector_array, filehandle)

# save numpy array
np.savetxt('output.txt', vector_array)