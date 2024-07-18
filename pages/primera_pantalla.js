
import * as React from 'react';
import { View, Text ,Image, SafeAreaView, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Primera_pantalla = (props) => {
    return (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor:'#fff',
            
          }}>
            <View style={{marginTop: 50}}>
              <Text style={{fontSize:30, fontWeight:'bold', color:'#000000'}}>
                PLAYSEÑA
              </Text>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
             <Image 
              source={require('../imagen/logo.png')}
              style={{ width: 300, height: 300 , transform:[{rotate:'-35deg'}]}}
              />
              </View>
            <TouchableOpacity 
              onPress={()=> props.navigation.navigate({name:'Login'})}
              style={{
              backgroundColor:'#8CDE9C', 
              padding:20, width:'90%', 
              borderRadius:5, 
              flexDirection:'row',
              justifyContent:'space-between',
              marginBottom: 50
              }}>
              <Text style={{fontWeight:'bold',fontSize:18,color:'#fff'}}>Empezar</Text>
              <MaterialIcons name='arrow-forward-ios' size={22} color="#fff"/>
            </TouchableOpacity>
        </SafeAreaView>
      );
}

export default Primera_pantalla