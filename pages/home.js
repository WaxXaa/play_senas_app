import * as React from 'react';
import { View, Text ,} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome6';

import Aprender from './subpages/aprender.js';
import Ayuda from './subpages/ayuda.js';
import Ranking from './subpages/ranking.js';
import Perfil from './subpages/perfil.js';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarStyle:{backgroundColor:'#8CDE9C'}, 
          tabBarInactiveTintColor:'#000',
          tabBarActiveTintColor:'#fff'
        }}>
          <Tab.Screen
            name = "Aprender"
            component={Aprender}
            options={{
              tabBarLabel: 'Aprender',
              tabBarIcon: ({color, size}) =>(
                <Icon name='home' color={color} size={size}/>
              )
            }}
          />
        <Tab.Screen
            name = "Ranking"
            component={Ranking}
            options={{     
              tabBarLabel: 'Ranking',
              tabBarIcon: ({color, size}) =>(
                <Icon1 name='ranking-star' color={color} size={size}/>
              )
            }}
          />
          <Tab.Screen
            name = "Ayuda"
            component={Ayuda}
            options={{
              tabBarLabel: 'Ayuda',
              tabBarIcon: ({color, size}) =>(
                <Icon name='search' color={color} size={size}/>
              )
            }}
          />
          <Tab.Screen
            name = "Perfil"
            component={Perfil}
            options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: ({color, size}) =>(
                <Icon name='user' color={color} size={size}/>
              )
            }}
          />
    
        </Tab.Navigator>
      );
}

export default HomeScreen