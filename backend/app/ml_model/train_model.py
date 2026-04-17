import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle
import re


data = pd.read_csv("data.csv")
data.columns = data.columns.str.strip().str.lower()

def clean_text(text):
    if not isinstance(text, str): return ""
    text = text.lower().strip()
   
    text = re.sub(r'\s+', ' ', text)
    return text


data["text"] = data["text"].apply(clean_text)


X = data["text"]
y = data["category"]


vectorizer = TfidfVectorizer(
    ngram_range=(1, 2),
    stop_words="english"
)
X_vectorized = vectorizer.fit_transform(X)


model = MultinomialNB(alpha=0.1)
model.fit(X_vectorized, y)


with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print(f"Success! Trained on {len(data)} examples.")