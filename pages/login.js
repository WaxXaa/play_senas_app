import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity} from 'react-native'
import React, {useContext}from 'react'
import EmailIcon from 'react-native-vector-icons/MaterialIcons';
import PasswordIcon from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';

const Login = (props) => {
  const{login} = useContext(AuthContext);

  return (
    <SafeAreaView style={{flex:1,justifyContent:'center'}}>
      <View style={{paddingHorizontal:25}}>
        <View style={{alignItems:'center'}}>
            <Image 
                source={require('../imagen/logo.png')}
                style={{ width: 100, height: 100 , transform:[{rotate:'-35deg'}]}}
            />
        </View>
        <Text style={{
            fontSize:28, 
            fontWeight:'500',
            color:"#000",
            marginBottom:30,
            }}>
            Login
        </Text>


        <View style={{
            flexDirection:'row',
            borderBottomColor: '#ccc',
            borderBottomWidth:1,
            paddingBottom:8,
            marginBottom:25
            }}>

          <EmailIcon 
            name='alternate-email' 
            size={20} color='#666'
            olor="#666"
            style={{marginRight: 5}}
          />
          <TextInput 
            placeholder='Email ID'
            style={{flex:1,paddingVertical:0}}
            keyboardType='email-address'
            />
        </View>

        <View style={{
            flexDirection:'row',
            borderBottomColor: '#ccc',
            borderBottomWidth:1,
            paddingBottom:8,
            marginBottom:25
            }}>

          <PasswordIcon 
            name='lock' 
            size={20} color='#666'
            olor="#666"
            style={{marginRight: 5}}
          />
          <TextInput 
            placeholder='Password'
            style={{flex:1,paddingVertical:0}}
            secureTextEntry={true}
            />
        </View>

        <TouchableOpacity 
            onPress={()=>{login()}} 
            style={{
                backgroundColor:'#8CDE9C', 
                padding:20,
                borderRadius:10,
                marginBottom:30,
            }}>
            <Text style={{
                textAlign:'center',
                fontWeight:'700',
                fontSize:16,
                color:'#fff'
            }}>
            Login
            </Text>
        </TouchableOpacity>
        
        <View style={{flexDirection:'row',justifyContent:'center',marginBottom:30}}>
            <Text>Nuevo en la APP?</Text>
            <TouchableOpacity onPress={()=> props.navigation.navigate('Registrar')}>
                <Text style={{color:'#8CDE9C', fontWeight:'700'}}> Registrar</Text>
            </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

export default Login
