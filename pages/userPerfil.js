import React from 'react';
import { Modal, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons for the close icon

export default function UserPerfil({ modalVisible, setModalVisible, user }) {
  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <View style={styles.propicArea}>
            <Image source={user.image} style={styles.propic} />
          </View>
          <Text style={styles.name}>{user.nombre} {user.apellido}</Text>
          <Text style={styles.experience}>Experiencia: {user.exp}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  topSection: {
    width: '90%',
    maxHeight: Dimensions.get('window').height * 0.6, // Max height for the modal content
    backgroundColor: '#2A2B2C',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
    position: 'relative', // Ensure the close button is positioned correctly
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
    color: '#fff',
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    padding: 10,
  },
});
