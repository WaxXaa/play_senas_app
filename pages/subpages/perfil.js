// pages/subpages/perfil.js

import React, {useContext}from 'react';
import { View, Text , TouchableOpacity} from 'react-native';
import LogoutIcon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';

const Perfil = () => {
  const{logout} = useContext(AuthContext);
  return (
    <TouchableOpacity onPress={()=>{logout()}} style={{paddingVertical:15}}>
      <View style={{flexDirectio:'row', alignItems: 'center', marginTop:50}}>
        <LogoutIcon name='exit-outline' size={22}/>
        <Text style={{fontSize:15, marginLeft:5,}}>sign out</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Perfil;
