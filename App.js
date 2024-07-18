// In App.js in a new project

import * as React from 'react';
import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import AppStack from './navegation/appStack.js'
import AuthStack from './navegation/authStack.js'


function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto '/>
        {/* <AppStack /> */}
        <AuthStack />
    </NavigationContainer>
  );
}

export default App;