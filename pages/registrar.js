import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import EmailIcon from 'react-native-vector-icons/MaterialIcons';
import PasswordIcon from 'react-native-vector-icons/Feather';
import PersonIcon from 'react-native-vector-icons/Ionicons';

const Registrar = (props) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setErrorMessage('Email incorrecto');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.4:8080/users/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          contra: password,
        }),
      });

      if (response.ok) {
        Alert.alert('Listo', 'Usuario registrado exitosamente');
        props.navigation.goBack();
      } else {
        const errorData = await response.text();
        setErrorMessage(errorData);
        Alert.alert('Error', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error de red o servidor');
    }
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
        <Text style={styles.title}>Registrar</Text>

        <View style={styles.inputContainer}>
          <PersonIcon 
            name='person-outline' 
            size={20} 
            color='#666'
            style={styles.icon}
          />
          <TextInput 
            placeholder='Nombre'
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputContainer}>
          <PersonIcon 
            name='person-outline' 
            size={20} 
            color='#666'
            style={styles.icon}
          />
          <TextInput 
            placeholder='Apellido'
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
          />
        </View>

        <View style={styles.inputContainer}>
          <EmailIcon 
            name='alternate-email' 
            size={20} 
            color='#666'
            style={styles.icon}
          />
          <TextInput 
            placeholder='Email ID'
            style={[styles.input, !validateEmail(email) && email !== '' && styles.inputError]}
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            textContentType='emailAddress'
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
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity 
          onPress={handleRegister} 
          style={styles.button}
        >
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text>Ya se registró?</Text>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={styles.loginText}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  innerContainer: {
    paddingHorizontal: 25,
    paddingTop: 20, 
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -200, 
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
  inputError: {
    borderBottomColor: 'red',
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
  loginText: {
    color: '#FFBB3B',
    fontWeight: '700',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Registrar;
