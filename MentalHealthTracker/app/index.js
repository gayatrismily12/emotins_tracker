import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SentimentScreen from './screens/SentimentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Home" >
        
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
            headerTitleAlign: 'center', // Center the header title
            headerShown: true // Show header for VoiceAnalyser
          }} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ 
          headerTitleAlign: 'center', // Center the header title
          headerShown: true // Show header for SignUpScreen
        }} 
      />
      <Stack.Screen 
        name="Sentiment" 
        component={SentimentScreen} 
        options={{ 
          headerTitleAlign: 'center', // Center the header title
          headerShown: true // Show header for SentimentScreen
        }} 
      />
    </Stack.Navigator>
  );
}