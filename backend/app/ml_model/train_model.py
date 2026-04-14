import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle
import re

# 1. Load dataset
data = pd.read_csv("data.csv")

# 2. CLEANING FUNCTION (Step 3 from earlier)
def clean_text(text):
    if not isinstance(text, str): return ""
    text = text.lower().strip()
    # Remove special characters/numbers so "Swiggy!" becomes "swiggy"
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text

# Apply cleaning to your data before training
data["text"] = data["text"].apply(clean_text)

# 3. Input and output
X = data["text"]
y = data["category"]

# 4. Convert text to numbers 
# Added ngram_range=(1,2) so it learns "swiggy" AND "swiggy dinner" as unique units
vectorizer = TfidfVectorizer(ngram_range=(1, 2))
X_vectorized = vectorizer.fit_transform(X)

# 5. Train model
# alpha=0.1 helps the model handle words it hasn't seen before without panicking
model = MultinomialNB(alpha=0.1)
model.fit(X_vectorized, y)

# 6. Save BOTH files
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print(f"Success! Trained on {len(data)} examples.")