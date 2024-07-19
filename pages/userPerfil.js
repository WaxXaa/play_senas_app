import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

export default function UserPerfil({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.name,
      headerStyle: {
        backgroundColor: '#3A3B3C', // Dark background for the header
      },
      headerTintColor: '#fff', // Light color for header text
    });
  }, [navigation, route.params.name]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.propicArea}>
          <Image source={route.params.image} style={styles.propic} />
        </View>
        <Text style={styles.name}>{route.params.name} {route.params.apellido}</Text>
        <Text style={styles.experience}>Experiencia: {route.params.exp}</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Light background color for the whole screen
  },
  topSection: {
    height: Dimensions.get('window').height * 0.4, // Responsive height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2B2C', // Dark background for the top section
    borderBottomLeftRadius: 40, // More rounded corners
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
    padding: 20,
    position: 'relative', // Ensure the button is positioned correctly
  },
  propicArea: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: '#FFBB3B',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    marginBottom: 15,
  },
  propic: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 34,
    color: '#fff', // White text for contrast
    fontWeight: 'bold',
    textAlign: 'center',
  },
  experience: {
    color: '#FFBB3B',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFBB3B',
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
