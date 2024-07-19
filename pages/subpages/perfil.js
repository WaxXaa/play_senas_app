import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ToastAndroid } from 'react-native';
import LogoutIcon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';

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
              <View style={styles.iconArea}>
                <LogoutIcon name='create-outline' size={30} style={styles.iconStyle} resizeMode="contain" />
              </View>
              <Text style={styles.buttonName}>Editar Perfil</Text>
            </View>
            <View style={styles.sp}></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSection} onPress={handleLogout}>
            <View style={styles.buttonArea}>
              <View style={styles.iconArea}>
                <LogoutIcon name='exit-outline' size={30} style={styles.iconStyle} resizeMode="contain" />
              </View>
              <Text style={styles.buttonName}>Logout</Text>
            </View>
            <View style={styles.sp}></View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propicArea: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 4,
    borderColor: '#FFBB3B'
  },
  propic: {
    borderRadius: 85,
    width: '100%',
    height: '100%'
  },
  name: {
    marginTop: 20,
    color: 'black',
    fontSize: 32,
  },
  experience: {
    color: '#FFBB3B',
    fontSize: 18,
  },
  buttonList: {
    marginTop: 20,
  },
  buttonSection: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconArea: {
    marginLeft: 20,
    width: 40,
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    color:'black',
  },
  buttonName: {
    width: 270,
    fontSize: 20,
    color: 'black',
    marginLeft:20,
  },
  sp: {
    marginTop: 10,
    height: 2,
    backgroundColor: 'black'
  }
});

export default Perfil;
