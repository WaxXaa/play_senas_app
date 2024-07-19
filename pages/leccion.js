// pages/Leccion.js

import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { leccionesData } from '../pages/data/leccion.js';

export default function Leccion({ route, navigation }) {
  const { theme, leccion } = route.params || {}; 

  const leccionData = leccionesData[theme] ? leccionesData[theme][leccion] : [];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Lección {leccion}</Text>
      <View style={styles.row}>
        {leccionData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image
              source={item.image}
              style={styles.image}
            />
            <Text style={styles.text}>
              {item.text}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Nivel', { theme, leccion })}
      >
        <Text style={styles.buttonText}>Ir a Nivel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5', // Light grey background for the whole page
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#007bff', // Border color under the title
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: Dimensions.get('window').width / 2 - 20, // Each image will take half of the screen width minus margins
    marginBottom: 20,
    borderRadius: 10, // Rounded corners for the item container
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff', // White background for each item container
    shadowColor: '#000', // Shadow color for better visual depth
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 3, // Elevation for Android shadow effect
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10, // Rounded corners for images
    borderColor: '#FFD700', // Border color for images
    borderWidth: 2, // Border width for images
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
