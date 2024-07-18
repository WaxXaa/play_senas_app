// In App.js in a new project

import * as React from 'react';
import { View, Text} from 'react-native';

import {AuthProvider} from './context/AuthContext.js'
import AppNav from './navegation/appNav.js'


function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;