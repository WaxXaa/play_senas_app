import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ScreenWidth = Dimensions.get('window').width;

const Ayuda = ({ navigation }) => {
  const [newsList, setNewsList] = useState([]);
  const [filteredNewsList, setFilteredNewsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://172.20.10.5:8080/admin/ayuda')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => ({
          title: item.pregunta,
          desc: item.respuesta,
        }));
        setNewsList(formattedData);
        setFilteredNewsList(formattedData);
      })
      .catch(error => {
        console.error('Error fetching ayuda data:', error);
      });
  }, []);

  const handleBack = () => navigation.goBack();

  const onSubmit = e => {
    const query = e.nativeEvent.text.toLowerCase();
    setSearchQuery(query);
    const filteredData = newsList.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query),
    );
    setFilteredNewsList(filteredData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.searchContainer}>
        <View style={styles.back}>
          <TouchableWithoutFeedback onPress={handleBack}>
            <Icon name="angle-double-left" size={25} color={'#0000008A'} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="search"
            size={16}
            style={styles.iconSearch}
            color={'#00000042'}
          />
          <TextInput
            style={styles.input}
            placeholder={'Buscar con palabra clave'}
            returnKeyType="search"
            onSubmitEditing={onSubmit}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>
      </View>
      <FlatList
        data={filteredNewsList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No se encontraron resultados</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  back: {
    paddingHorizontal: 15,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    backgroundColor: '#0000000D',
    borderRadius: 18,
    alignItems: 'center',
    marginRight: 15,
  },
  input: {
    flex: 1,
    height: 40,
  },
  iconSearch: {
    marginLeft: 15,
    marginRight: 2,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  desc: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Ayuda;
