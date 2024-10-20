import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const SentimentAnalysisPage = () => {
  const [userInput, setUserInput] = useState('');
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  // Function to analyze sentiment using Flask API
  const analyzeSentiment = async () => {
    if (!userInput) {
      setInsight("Please enter your thoughts.");
      return;
    }

    setLoading(true); // Show loading indicator while waiting for the API response
    try {
      console.log(userInput);
      const response = await fetch('http://127.0.0.1:5000/predict/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
      });

      const data = await response.json();
      console.log("hsjadfhlksja",data);
      
      // Update insight based on API response
      if (response.ok) {
        // Assuming recommendations are in an array
        console.log(data)

        // Format recommendations into a readable string
        let formattedRecommendations = ""
        for(let i = 0; i < data.length; i++) formattedRecommendations = formattedRecommendations + data[i] + "\n"

        // Set the insight to display both emotion and recommendations
        setInsight(`\nRecommendations:\n- ${formattedRecommendations}`);
      } else {
        setInsight("Error analyzing sentiment. Please try again.");
      }
    } catch (error) {
      setInsight("Network error: " + error.message);
    }
    setLoading(false); // Stop the loading indicator
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sentiment Analysis</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Write your thoughts here..."
        multiline
        value={userInput}
        onChangeText={setUserInput}
      />

      <Button title="Analyze Sentiment" onPress={analyzeSentiment} color="#4682b4"/>

      {loading && <ActivityIndicator size="large" color="#4682b4" />} {/* Show loader when loading */}
      
      {insight !== '' && (
        <View style={styles.insightContainer}>
          <Text style={styles.insightText}>{insight}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    height: 150,
    marginBottom: 20,
  },
  insightContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#eef',
    borderRadius: 10,
  },
  insightText: {
    fontSize: 18,
    color: '#333',
  },
});

export default SentimentAnalysisPage;