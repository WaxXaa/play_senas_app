// pages/subpages/aprender.js

import * as React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import RefreshListView from 'react-native-refresh-list-view';
import { newsList } from '../data';


const Aprender = (props) => {
    const renderNewsItem = ({item, index}) => (
    <TouchableWithoutFeedback
        style={styles.container}
        key={index}
        onPress={() => props.navigation.navigate({name:'Detail', params: item})}>
        <View>
            <Image
                style={styles.image}
                source={item.image}
            />

            <View style={styles.textImage}>
                <Text style={styles.text}>{item.title}</Text>
                <Text>{item.author}</Text>
            </View>
        </View>
  </TouchableWithoutFeedback>
  );
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
      <RefreshListView
        data={newsList}
        renderItem={renderNewsItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      paddingVertical: 5,
    },
    textImage: {
      padding: 6,
    },
    image: {
      width: Dimensions.get('window').width,
      height: 200,
    },
    text: {
      fontSize: 24,
      color: '#000000DD',
      fontWeight: 'bold',
      alignSelf: 'center',
      textAlign: 'center',
    },
  });

export default Aprender;
