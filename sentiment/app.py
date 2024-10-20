# app.py
from flask import Flask, request, jsonify
from transformers import pipeline
import spacy
import requests
from bs4 import BeautifulSoup

# Initialize the Flask application
app = Flask(_emotion_tracker_)

# Load the sentiment analysis pipeline and Spacy model
pipe = pipeline("sentiment-analysis", model="bhadresh-savani/bert-base-go-emotion")
nlp = spacy.load("en_core_web_sm")

def normalise(text):
    return text.lower()

# Add your other preprocessing functions here
def remove_numbers(text):
    # Your logic for removing numbers
    return text

def remove_stop_words(text):
    # Your logic for removing stop words
    return text

def lemmatisation(text):
    # Your logic for lemmatization
    return text

def predict_emotion(text):
    after_normalise = normalise(text)
    after_remove_numbers = remove_numbers(after_normalise)
    after_remove_Stopwords = remove_stop_words(after_remove_numbers)
    lemmatised = lemmatisation(after_remove_Stopwords)
    emotion = pipe(lemmatised)
    return emotion[0]['label']

emotion_mapping = {
    "anger": "Anger",
    "disgust": "Disgust",
    "fear": "Anxiety/Fear",
    "happiness": "Happiness",
    "sadness": "Sadness",
    "surprise": "Neutral",
    "amusement": "Happiness",
    "approval": "Happiness",
    "caring": "Happiness",
    "joy": "Happiness",
    "relief": "Happiness",
    "trust": "Happiness",
    "admiration": "Happiness",
    "optimism": "Happiness",
    "gratitude": "Happiness",
    "curiosity": "Neutral",
    "nostalgia": "Neutral",
    "desire": "Neutral",
    "interest": "Neutral",
    "pride": "Neutral",
    "realization": "Neutral",
    "sympathy": "Neutral",
    "confusion": "Neutral",
    "annoyance": "Anger",
    "disappointment": "Sadness",
    "boredom": "Neutral",
}

def map_emotion(goemotion_label):
    return emotion_mapping.get(goemotion_label, "Unknown emotion")

def get_recommendations(mapped_emotion):
    recommendations = []
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
    }

    if mapped_emotion == 'anger':
        url = "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/anger-management/art-20045434"
        
        try:
            response = requests.get(url, headers=headers)

            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                headings = soup.find_all('h3')

                for heading in headings:
                    heading_text = heading.get_text(strip=True)
                    if "Thank you for subscribing" in heading_text:
                        break
                    recommendations.append(heading_text)
                    next_p = heading.find_next_sibling('p')
                    if next_p:
                        recommendations.append(next_p.get_text(strip=True))

        except requests.RequestException as e:
            recommendations.append(f"Error fetching recommendations: {str(e)}")

    # Add recommendations for other emotions similarly...

    return {
        "emotion": mapped_emotion,
        "recommendations": recommendations
    }

@app.route('/predict/text', methods=['POST'])
def predict_text():
    data = request.json
    input_text = data['text']
    
    # Predict emotion
    predicted_emotion = predict_emotion(input_text)
    
    # Map the predicted emotion
    mapped_emotion = map_emotion(predicted_emotion)
    
    # Get recommendations based on the mapped emotion
    result = get_recommendations(mapped_emotion)
    
    return jsonify(result)

if _emotion_box_ == '_main_':
    app.run(debug=True)