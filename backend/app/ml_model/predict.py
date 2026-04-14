import pickle
import re

# Load model and vectorizer
# Ensure the paths are correct relative to where you run the server
with open("app/ml_model/model.pkl", "rb") as f:
    model = pickle.load(f)

with open("app/ml_model/vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

def predict_category(text):
    if not text:
        return "Other"

    # 1. PRE-PROCESSING (Crucial!)
    # Convert to lowercase and remove special characters/numbers
    # This makes "Swiggy!!!" and "swiggy" look the same to the AI
    processed_text = text.lower().strip()
    processed_text = re.sub(r'[^a-zA-Z\s]', '', processed_text)

    # 2. VECTORIZE
    text_vector = vectorizer.transform([processed_text])

    # 3. PROBABILITY CHECK (Confidence Thresholding)
    # This checks how "sure" the AI is.
    probs = model.predict_proba(text_vector)[0]
    max_prob = max(probs)

    # If the AI is less than 40% sure, don't let it guess wrong.
    if max_prob < 0.4:
        return "Other"

    # 4. PREDICT
    prediction = model.predict(text_vector)
    return prediction[0]