import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import EmailIcon from 'react-native-vector-icons/MaterialIcons';
import PasswordIcon from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';

const Login = (props) => {
  const { login, userToken, isLoading } = useContext(AuthContext);
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');

  useEffect(() => {
    if (userToken) {
      props.navigation.navigate('Home');
    }
  }, [userToken, props.navigation]);

  const handleLogin = () => {
    login(correo, contra)
      .catch(() => {
        Alert.alert("Login Error", "Correo o contraseña incorrectos.");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../imagen/logo.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Login</Text>
        
        <View style={styles.inputContainer}>
          <EmailIcon 
            name='alternate-email' 
            size={20} 
            color='#666'
            style={styles.icon}
          />
          <TextInput 
            placeholder='Email ID'
            style={styles.input}
            keyboardType='email-address'
            value={correo}
            onChangeText={(text) => setCorreo(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <PasswordIcon 
            name='lock' 
            size={20} 
            color='#666'
            style={styles.icon}
          />
          <TextInput 
            placeholder='Password'
            style={styles.input}
            secureTextEntry={true}
            value={contra}
            onChangeText={(text) => setContra(text)}
          />
        </View>

        <TouchableOpacity 
          onPress={handleLogin} 
          style={styles.button}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Login'}</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text>Nuevo en la APP?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Registrar')}>
            <Text style={styles.registerText}> Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  innerContainer: {
    paddingHorizontal: 25,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    transform: [{ rotate: '-35deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: "#FFBB3B",
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    color: '#000',
  },
  button: {
    backgroundColor: '#FFBB3B',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  registerText: {
    color: '#FFBB3B',
    fontWeight: '700',
    marginLeft: 5,
  },
});

export default Login;
