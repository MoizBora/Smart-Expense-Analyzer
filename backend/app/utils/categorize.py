import pickle
import re

# Load the AI model and vectorizer
try:
    with open("ml_model/model.pkl", "rb") as f:
        model = pickle.load(f)
    with open("ml_model/vectorizer.pkl", "rb") as f:
        vectorizer = pickle.load(f)
except FileNotFoundError:
    print("Warning: Model files not found. Using keyword-only mode.")
    model, vectorizer = None, None

def categorize(text):
    # Use .lower() and .strip() to remove hidden spaces/newlines
    clean_text = str(text).lower().strip()
    
    # Use "in" to find the word anywhere in the sentence
    if "swiggy" in clean_text or "zomato" in clean_text:
        return "Food"
    if "gym" in clean_text or "fitness" in clean_text:
        return "Health"
    # ... rest of your code
    return "Other"