import * as React from 'react';
import {useContext} from 'react'
import { View, Text, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import AppStack from './appStack.js'
import AuthStack from './authStack.js'
import react from 'react';
import { AuthContext } from '../context/AuthContext.js';


const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if(isLoading){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={'large'}/>
        </View>
    )
  }

  return (
    <NavigationContainer>
        <StatusBar style='auto '/>
          {userToken !== null ? <AppStack /> : <AuthStack />}
          {/* <AppStack /> */}
          {/* <AuthStack />*/}
      </NavigationContainer>
  ); 
}

export default AppNav