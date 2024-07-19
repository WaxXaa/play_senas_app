import * as React from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Primera_pantalla = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    PLAYSEÑA
                </Text>
            </View>
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../imagen/logo.png')}
                    style={styles.logo}
                />
            </View>
            <TouchableOpacity 
                onPress={() => props.navigation.navigate({name: 'Login'})}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Empezar</Text>
                <MaterialIcons name='arrow-forward-ios' size={22} color="#fff"/>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFBB3B',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    transform: [{ rotate: '-35deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  button: {
    backgroundColor: '#3A3B3C',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFBB3B',
  },
});

export default Primera_pantalla;
