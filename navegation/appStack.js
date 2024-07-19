import * as React from 'react';
import { View, Text ,Image, SafeAreaView, TouchableOpacity} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import HomeScreen from '../pages/home.js'
import Detail from '../pages/detail.js';
import UserPerfil from '../pages/userPerfil.js';
import EditarPerfil from '../pages/subpages/editarPerfil.js'

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
          <Stack.Navigator 
            screenOptions={{
              headerTitleAlign: 'center',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen 
              name="Home" 
              options={{title:'Home', headerShown:false}}
              component={HomeScreen} 
              />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="UserPerfil" component={UserPerfil} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
          </Stack.Navigator>
      );
}

export default AppStack