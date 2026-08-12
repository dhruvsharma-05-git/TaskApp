import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';

// We added our new screens to the state tracker
type ScreenState = 'Login' | 'Register' | 'TaskList' | 'AddTask';

function App() {
  // We'll temporarily set the default screen to 'TaskList' so you can see your new work immediately!
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('TaskList');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Login':
        // For now, logging in just takes you to the Task List
        return (
          <View style={{flex: 1}}>
            <LoginScreen onSwitchToRegister={() => setCurrentScreen('Register')} />
            {/* Temporary dev button to skip login */}
            <TouchableOpacity onPress={() => setCurrentScreen('TaskList')} style={styles.devBtn}>
              <Text style={{textAlign: 'center', color: '#4F46E5', fontWeight: 'bold'}}>Skip Login (Dev Only)</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Register':
        return <RegisterScreen onSwitchToLogin={() => setCurrentScreen('Login')} />;
      case 'TaskList':
        return (
          <TaskListScreen 
            onAddNewTask={() => setCurrentScreen('AddTask')} 
            onLogout={() => setCurrentScreen('Login')} 
          />
        );
      case 'AddTask':
        return (
          <AddTaskScreen 
            onCancel={() => setCurrentScreen('TaskList')} 
            onSave={() => setCurrentScreen('TaskList')} 
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      {renderScreen()}
    </SafeAreaView>
  );
}

import { View, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  devBtn: {
    padding: 16,
    backgroundColor: '#E0E7FF',
    margin: 24,
    borderRadius: 8,
  }
});

export default App;