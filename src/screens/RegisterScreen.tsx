import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // REPLACE THIS WITH YOUR ACTUAL IPV4 ADDRESS
  const API_URL = 'http://192.168.29.19:5001/api/auth/register'; 

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success!', 'Account created successfully. Please log in.');
        onSwitchToLogin(); // Send them to login screen
      } else {
        Alert.alert('Registration Failed', data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Network Error', 'Could not connect to the server. Check your IP address and ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.formContainer}>
        <Text style={styles.headerTitle}>Create Account</Text>
        <Text style={styles.subHeader}>Start organizing your life today</Text>

        <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#9CA3AF" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#9CA3AF" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#9CA3AF" value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity style={[styles.primaryButton, isLoading && styles.disabledButton]} onPress={handleRegister} disabled={isLoading}>
          <Text style={styles.primaryButtonText}>{isLoading ? 'Creating...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Already have an account? </Text>
          <TouchableOpacity onPress={onSwitchToLogin}>
            <Text style={styles.switchLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', justifyContent: 'center', padding: 24 },
  formContainer: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 8, textAlign: 'center' },
  subHeader: { fontSize: 16, color: '#6B7280', marginBottom: 32, textAlign: 'center' },
  input: { backgroundColor: '#F3F4F6', borderRadius: 10, padding: 16, marginBottom: 16, fontSize: 16, color: '#111827' },
  primaryButton: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  disabledButton: { backgroundColor: '#A5B4FC' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  switchContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  switchText: { color: '#6B7280', fontSize: 14 },
  switchLink: { color: '#4F46E5', fontSize: 14, fontWeight: 'bold' },
});

export default RegisterScreen;