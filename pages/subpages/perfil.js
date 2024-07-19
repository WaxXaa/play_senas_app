import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import LogoutIcon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/Feather';

const Perfil = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [experience, setExperience] = useState('5 years');
  const [avatar, setAvatar] = useState('https://p1.itc.cn/q_70/images03/20230427/97e4cf398c1c453f98f8135b202479d6.jpeg');

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => { logout() }},
    ]);
  };

  const handleEditProfile = () => {
    navigation.navigate('EditarPerfil', { 
      firstName, 
      lastName, 
      avatar, 
      onSave: (updatedFirstName, updatedLastName, updatedAvatar) => {
        setFirstName(updatedFirstName);
        setLastName(updatedLastName);
        setAvatar(updatedAvatar);
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
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <Text style={styles.experience}>Experience: {experience}</Text>
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
    backgroundColor: '#3A3B3C', // Dark button background
    borderRadius: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
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
