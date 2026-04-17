import pickle
import re

# Load model and vectorizer
# Ensure the paths are correct relative to where you run the server
with open("ml_model/model.pkl", "rb") as f:
    model = pickle.load(f)

with open("ml_model/vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

def predict_category(text):
    text=text.lower().strip()
    if not text:
        return "Other"

   
    processed_text = text.lower().strip()
    processed_text = re.sub(r'[^a-zA-Z\s]', '', processed_text)

    
    text_vector = vectorizer.transform([processed_text])

    #
    probs = model.predict_proba(text_vector)[0]
    max_prob = max(probs)

    
    if max_prob < 0.4:
        return "Other"


    prediction = model.predict(text_vector)
    return prediction[0]