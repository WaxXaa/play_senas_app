import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import  ActionSheet from 'react-native-actionsheet';

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
      Alert.alert('Permission required', 'We need permission to access your photo library.');
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
      Alert.alert('No image selected', 'You did not select any image.');
    }
  };

  // 处理拍照
  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need permission to access your camera.');
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
      Alert.alert('No se capturó ninguna imagen', 'No has capturado ninguna imagen');
    }
  };

  const handleSave = () => {
    onSave(updatedFirstName, updatedLastName, updatedAvatar);
    navigation.goBack();
    Alert.alert('Guardado', 'Perfil cambiado con exito!', [
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
        placeholder="Enter your first name"
      />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={updatedLastName}
        onChangeText={setUpdatedLastName}
        placeholder="Enter your last name"
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
    backgroundColor: '#f0f0f0',
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  propicArea: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#FFBB3B',
    overflow: 'hidden',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propic: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 32,
    color: 'black',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#8CDE9C',
    marginTop:20,
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
