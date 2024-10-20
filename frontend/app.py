# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

from transformers import pipeline
import spacy
import requests
from bs4 import BeautifulSoup

# Initialize the Flask application
app = Flask(__name__)
CORS(app)
# Load the sentiment analysis pipeline
my_model = pipeline("sentiment-analysis", model="bhadresh-savani/bert-base-go-emotion")
print(my_model)

nlp = spacy.load("en_core_web_sm")

def normalise(text):
    return text.lower()

def remove_numbers(text):
    print("hi")
    return ''.join(filter(lambda x: not x.isdigit(), text))

def remove_stop_words(text):
    print("hello")
    return ''.join([word for word in text.split() if not nlp.vocab[word].is_stop])

def lemmatisation(text):
    doc = nlp(text)
    print("ji")
    return ' '.join([token.lemma_ for token in doc])

def predict_emotion(text):
    after_normalise = normalise(text)
    after_remove_numbers = remove_numbers(after_normalise)
    after_remove_Stopwords = remove_stop_words(after_remove_numbers)
    lemmatised = lemmatisation(after_remove_Stopwords)
    emotion = my_model(lemmatised)
    return emotion[0]['label']

emotion_mapping = {
    "anger": "anger",
    "disgust": "disgust",
    "fear": "anxiety/fear",
    "happiness": "happiness",
    "sadness": "sadness",
    "surprise": "neutral",
    "amusement": "happiness",
    "approval": "happiness",
    "caring": "happiness",
    "joy": "happiness",
    "relief": "happiness",
    "trust": "happiness",
    "admiration": "happiness",
    "optimism": "happiness",
    "gratitude": "happiness",
    "curiosity": "neutral",
    "nostalgia": "neutral",
    "desire": "neutral",
    "interest": "neutral",
    "pride": "neutral",
    "realization": "neutral",
    "sympathy": "neutral",
    "confusion": "neutral",
    "annoyance": "anger",
    "disappointment": "sadness",
    "boredom": "neutral",
}

def map_emotion(goemotion_label):
    return emotion_mapping.get(goemotion_label, "Unknown emotion")

def get_recommendations(mapped_emotion):
    recommendations = []
    
    if mapped_emotion == "anger":
        recommendations.append("1. Count up to 10")
    elif mapped_emotion == "sadness":
        recommendations.extend([
            "1. Acknowledge Your Feelings: Recognize that it’s okay to feel sad. Accepting your emotions is the first step toward healing.",
            "2. Limit Social Media",
            "3. Vent out your feelings",
            "4. It's okay to cry",
            "5. Meditation",
            "6. Practice gratitude",
            "7. Journal your thoughts",
            "8. Stop alcohol and drugs"
        ])
    elif mapped_emotion == "disgust":
        recommendations.extend([
            "1. Acknowledge Your Feelings",
            "2. Identify triggers.",
            "3. Practice mindfulness.",
            "4. Distract yourself positively.",
            "5. CBT",
            "6. Express yourself"
        ])
    elif mapped_emotion == "fear":
        recommendations.extend([
            "1. Identify source",
            "2. Practice deep breathing",
            "3. Gradual Exposure",
            "4. Limit exposure to triggers",
            "5. Seek professional help",
            "6. CBT"
        ])
    elif mapped_emotion == "neutral":
        recommendations.append("Feeling Neutral? That's Okay! It's perfectly normal to experience moments of neutrality.")
    elif mapped_emotion == "happiness":
        recommendations.append("Feeling Happy? Celebrate it!")

    print(recommendations)
    return recommendations
@app.route('/predict/text', methods=['POST'])
def predict_text():
    data = request.json
    input_text = data['text']
    
    # Predict emotion
    predicted_emotion = predict_emotion(input_text)
    print(predicted_emotion)

    # Map the predicted emotion
    mapped_emotion = map_emotion(predicted_emotion)
    print(mapped_emotion)
    
    # Get recommendations based on the mapped emotion
    result = get_recommendations(mapped_emotion)
    print(result)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
