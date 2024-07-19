// pages/subpages/aprender.js

import * as React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import RefreshListView from 'react-native-refresh-list-view';
import { newsList } from '../data';

const Aprender = (props) => {
    const renderNewsItem = ({item, index}) => (
        <TouchableOpacity
            style={styles.container}
            key={index}
            onPress={() => props.navigation.navigate('Detail', {
                title: item.title,
                image: item.image,
                desc: item.desc,
                theme: item.theme // 确保传递 theme
            })}
        >
            <View>
                <View style={styles.textImage}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text>{item.author}</Text>
                </View>
                <Image
                    style={styles.image}
                    source={item.image}
                />     
            </View>
        </TouchableOpacity>
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
        borderWidth: 4,
        borderColor: '#000000',
        margin: 10, 
        borderRadius: 8, 
    },
    textImage: {
        paddingTop: 6,
    },
    image: {
        width: Dimensions.get('window').width * 0.925,
        resizeMode: "cover",
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
