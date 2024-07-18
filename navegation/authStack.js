import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/login.js'
import Registrar from '../pages/registrar.js';
import Primera_pantalla from '../pages/primera_pantalla.js'

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator 
            screenOptions={{
              headerShown:false
            }}>
            <Stack.Screen 
              name="Primera_pantalla" 
              component={Primera_pantalla} />
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{headerShown:false}}/>
            <Stack.Screen 
              name="Registrar" 
              component={Registrar} 
              options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

export default AuthStack