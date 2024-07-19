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
                <View style={styles.rankContainer}>
                    <Text style={styles.rank}>{index + 1}</Text>
                </View>
                <Image
                    style={styles.avatar}
                    source={item.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name} {item.apellido}</Text>
                    <Text style={styles.experience}>{item.exp} EXP</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>TOP JUGADORES</Text>
            </View>
            <RefreshListView
                data={sortedUserList}
                renderItem={renderUserItem}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    rankContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    rank: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
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
    headerContainer: {
        padding: 20,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default Ranking;
