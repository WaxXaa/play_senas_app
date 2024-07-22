import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import LogoutIcon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Perfil = ({ navigation }) => {
  const { logout, userInfo, setUserInfo } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(userInfo?.fotoPerfil);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        
          fetch("http://172.20.10.5:8080/users/obtenerUsuario/" + userInfo.id).then(res => {
            return res.json()
          }).then(data => {
            setUserInfo(data)
          }).catch(err => {
          setUserInfo(JSON.parse(storedUserInfo));
          console.error('Failed to load user info from AsyncStorage:', error);
          })
        }
        
       catch (error) {
        console.error('Failed to load user info from AsyncStorage:', error);
      }
    }

    loadUserInfo();
  }), [];

  useEffect(() => {
    if (userInfo) {
      setAvatar(userInfo.fotoPerfil);
    }
  }, [userInfo]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => { 
        logout();
        AsyncStorage.removeItem('userInfo');
      }},
    ]);
  };

  const handleEditProfile = () => {
    navigation.navigate('EditarPerfil', { 
      firstName: userInfo?.nombre, 
      lastName: userInfo?.apellido, 
      avatar: userInfo?.fotoPerfil, 
      id: userInfo?.id,
      onSave: async (updatedFirstName, updatedLastName, updatedAvatar) => {
        const updatedUserInfo = {
          ...userInfo,
          nombre: updatedFirstName,
          apellido: updatedLastName,
          fotoPerfil: updatedAvatar,
        };
        setUserInfo(updatedUserInfo);
        try {
          await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        } catch (error) {
          console.error('Failed to save user info to AsyncStorage:', error);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topSection}>
          <View style={styles.propicArea}>
            <Image source={{ uri: avatar }} style={styles.propic} />
          </View>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{userInfo?.nombre} {userInfo?.apellido}</Text>
          <Text style={styles.experience}>EXP: {userInfo?.exp}</Text>
        </View>

        <View style={styles.buttonList}>
          <TouchableOpacity style={styles.buttonSection} onPress={handleEditProfile}>
            <View style={styles.buttonArea}>
              <MaterialIcons name='edit' size={24} style={styles.iconStyle} />
              <Text style={styles.buttonName}>Editar Perfil</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSection} onPress={handleLogout}>
            <View style={styles.buttonArea}>
              <LogoutIcon name='exit-outline' size={24} style={styles.iconStyle} />
              <Text style={styles.buttonName}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background color
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFBB3B',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingBottom: 30,
  },
  propicArea: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 5,
    borderColor: '#FFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  propic: {
    borderRadius: 85,
    width: '100%',
    height: '100%',
  },
  name: {
    marginTop: 20,
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft:30,
    marginRight:30
  },
  experience: {
    color: '#FFF',
    fontSize: 18,
  },
  buttonList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  buttonSection: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#3A3B3C', 
    borderRadius: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  buttonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconStyle: {
    color: '#FFBB3B', // Yellow icon color
  },
  buttonName: {
    fontSize: 18,
    color: '#FFF', // White text color
    marginLeft: 15,
  },
});

export default Perfil;
