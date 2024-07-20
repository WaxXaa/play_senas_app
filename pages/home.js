import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome6';

import Aprender from './subpages/aprender.js';
import Ayuda from './subpages/ayuda.js';
import Ranking from './subpages/ranking.js';
import Perfil from './subpages/perfil.js';
import axios from 'axios';

const Tab = createBottomTabNavigator();


// 使用 axios 从服务器获取数据
axios.get('http://localhost:8080/hello%20world')
  .then(response => {
    console.log(response.data); // 在控制台输出数据
    // 在这里处理数据，例如更新组件的状态
  })
  .catch(error => {
    console.error('请求失败:', error); // 处理错误
  });

const HomeScreen = () => {
    return (
        <Tab.Navigator 
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBarStyle, 
            tabBarInactiveTintColor: '#FFD700',
            tabBarActiveTintColor: '#fff',
          }}
        >
          <Tab.Screen
            name="Aprender"
            component={Aprender}
            options={{
              tabBarLabel: 'Aprender',
              tabBarIcon: ({ color, size }) => (
                <Icon name='home' color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Ranking"
            component={Ranking}
            options={{
              tabBarLabel: 'Ranking',
              tabBarIcon: ({ color, size }) => (
                <Icon1 name='ranking-star' color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Ayuda"
            component={Ayuda}
            options={{
              tabBarLabel: 'Ayuda',
              tabBarIcon: ({ color, size }) => (
                <Icon name='search' color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={Perfil}
            options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: ({ color, size }) => (
                <Icon name='user' color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#2A2B2C',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    paddingVertical: 5,
  },
});

export default HomeScreen;
