// App.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { getEmotionRecommendations } from './services/api';

const App = () => {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        try {
            const data = await getEmotionRecommendations(inputText);
            setResult(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Enter your text here"
                value={inputText}
                onChangeText={setInputText}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <Button title="Analyze Emotion" onPress={handleSubmit} />
            {result && (
                <View style={{ marginTop: 20 }}>
                    <Text>Emotion: {result.emotion}</Text>
                    {result.recommendations.map((rec, index) => (
                        <Text key={index}>{rec}</Text>
                    ))}
                </View>
            )}
        </View>
    );
};

export default App;