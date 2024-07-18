// pages/subpages/ranking.js

import * as React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import RefreshListView from 'react-native-refresh-list-view';
import { userList } from '../data/userList';

const Ranking = (props) => {
    const sortedUserList = [...userList].sort((a, b) => b.exp - a.exp);

    const renderUserItem = ({ item, index }) => (
        <TouchableWithoutFeedback
            key={index}
            onPress={() => props.navigation.navigate({ name: 'UserPerfil', params: item })}
        >
            <View style={styles.itemContainer}>
                <Image
                    style={styles.avatar}
                    source={item.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.experience}>{item.exp} EXP</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
        <RefreshListView
            data={sortedUserList}
            renderItem={renderUserItem}
        />
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingVertical: 5,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        color: '#000',
    },
    experience: {
        fontSize: 16,
        color: '#666',
    },
});

export default Ranking;
