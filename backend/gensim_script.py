import gensim.downloader as api

# load a pre-trained model
model = api.load('glove-wiki-gigaword-50')

similar_words = model.most_similar("", topn=10)
print(similar_words)