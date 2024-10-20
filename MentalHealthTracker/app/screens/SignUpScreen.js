import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../services/api'; // Import the api instance

const LoginSignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle login
  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/login', { username: email, password });
      if (response.status >= 200 && response.status < 300) {
        Alert.alert('Login Success', `Welcome back, ${email}!`);
        navigation.navigate('Home', { isAuthenticated: true }); // Navigate to Home on successful login
      } else {
        Alert.alert('Error', 'Invalid credentials.');
      }
    } catch (error) {
      Alert.alert('Error', error.response ? error.response.data.message : 'Login failed. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle signup
  const handleSignup = async () => {
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/signup', { username: email, password });
      if (response.status >= 200 && response.status < 300) {
        Alert.alert('Signup Success', `Account created for ${email}!`);
        navigation.navigate('Home', { isAuthenticated: true }); // Navigate to Home on successful signup
      } else {
        Alert.alert('Error', 'Signup failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.response ? error.response.data.message : 'Signup failed. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? 'Signup' : 'Login'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      {isSignup && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      )}

      <Button
        title={isSignup ? "Signup" : "Login"}
        onPress={isSignup ? handleSignup : handleLogin}
        color="#4682b4"
        disabled={isLoading} // Disable button while loading
      />

      {isLoading && <Text style={styles.loadingText}>Loading...</Text>} {/* Optional loading text */}

      <TouchableOpacity
        style={styles.toggleContainer}
        onPress={() => setIsSignup(!isSignup)}
      >
        <Text style={styles.toggleText}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  toggleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    color: 'gray',
  },
});

export default LoginSignupScreen;