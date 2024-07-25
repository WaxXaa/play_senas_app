import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ActionSheet from 'react-native-actionsheet';

const EditarPerfil = ({ route, navigation }) => {
  const { firstName, lastName, avatar, onSave, id } = route.params;
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
      const uri = result.assets[0].uri;
      const fileType = uri.split('.').pop();
      const newfile = {
        uri,
        type: `image/${fileType}`,
        name: `photo.${fileType}`
      };
      handleUpload(newfile);
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
      const uri = result.assets[0].uri;
      const fileType = uri.split('.').pop();
      const newfile = {
        uri,
        type: `image/${fileType}`,
        name: `photo.${fileType}`
      };
      handleUpload(newfile);
    } else {
      Alert.alert('No se capturó ninguna imagen', 'No has capturado ninguna imagen.');
    }
  };


  const handleUpload = (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'freddy_pan');

    fetch("https://api.cloudinary.com/v1_1/dohyqqpyb/image/upload", {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.secure_url) {
          setUpdatedAvatar(result.secure_url);
          Alert.alert('Éxito', 'Imagen subida con éxito.');
        } else {
          Alert.alert('Error', 'Hubo un problema al subir la imagen.');
        }
      })
      .catch(error => {
        console.error('Upload error:', error);
        Alert.alert('Error', `Hubo un error al subir la imagen: ${error.message}`);
      });
  };

  const handleSave = () => {
    onSave(updatedFirstName, updatedLastName, updatedAvatar);
    const newUserData = { nombre: updatedFirstName, apellido: updatedLastName, fotoPerfil: updatedAvatar, id }
    fetch("https://play-senas-springboot-api-production.up.railway.app/users/actualizar", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUserData)
    }).then(resp => {
      if (resp.ok) {
        navigation.goBack();
        Alert.alert('Guardado', 'Perfil cambiado con éxito!', [
          { text: 'OK' }
        ]);
      } else {
        navigation.goBack();
        Alert.alert('ERROR', 'hubo un error en el sistema intenta mas tarde', [
          { text: 'OK' }
        ]);
      }
    }).catch(err => {
      navigation.goBack();
      Alert.alert('ERROR', 'hubo un error en el la red intenta mas tarde ' + err.message, [
        { text: 'OK' }
      ]);
    })

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

      <Text style={styles.label}>uri:</Text>
      <TextInput
        style={styles.input}
        value={updatedAvatar}
        onChangeText={setUpdatedAvatar}
        placeholder="Ingresa tu nombre"
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
