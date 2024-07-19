import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ActionSheet from 'react-native-actionsheet';

const EditarPerfil = ({ route, navigation }) => {
  const { firstName, lastName, avatar, onSave } = route.params;
  const [updatedFirstName, setUpdatedFirstName] = useState(firstName);
  const [updatedLastName, setUpdatedLastName] = useState(lastName);
  const [updatedAvatar, setUpdatedAvatar] = useState(avatar);

  const actionSheetRef = useRef(null);

  const handleImageSelection = () => {
    actionSheetRef.current?.show();
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos permiso para acceder a tu galería de fotos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUpdatedAvatar(result.assets[0].uri);
    } else {
      Alert.alert('No se seleccionó ninguna imagen', 'No seleccionaste ninguna imagen.');
    }
  };

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos permiso para acceder a tu cámara.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUpdatedAvatar(result.assets[0].uri);
    } else {
      Alert.alert('No se capturó ninguna imagen', 'No has capturado ninguna imagen.');
    }
  };

  const handleSave = () => {
    onSave(updatedFirstName, updatedLastName, updatedAvatar);
    navigation.goBack();
    Alert.alert('Guardado', 'Perfil cambiado con éxito!', [
      { text: 'OK' }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity onPress={handleImageSelection} style={styles.propicArea}>
          <Image source={{ uri: updatedAvatar }} style={styles.propic} />
        </TouchableOpacity>
        <Text style={styles.name}>{updatedFirstName} {updatedLastName}</Text>
      </View>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={updatedFirstName}
        onChangeText={setUpdatedFirstName}
        placeholder="Ingresa tu nombre"
      />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={updatedLastName}
        onChangeText={setUpdatedLastName}
        placeholder="Ingresa tu apellido"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar cambios</Text>
      </TouchableOpacity>

      <ActionSheet
        ref={actionSheetRef}
        title={'Editar foto de perfil'}
        options={['Tomar con cámara', 'Seleccionar en galería', 'Cancelar']}
        cancelButtonIndex={2}
        onPress={(index) => {
          if (index === 0) {
            handleCamera();
          } else if (index === 1) {
            handleImagePicker();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  propicArea: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#FFBB3B',
    overflow: 'hidden',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propic: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditarPerfil;
