import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator } from 'react-native';
import RefreshListView from 'react-native-refresh-list-view';
import UserPerfil from '../userPerfil.js';

const Ranking = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchData = () => {
        fetch(`https://play-senas-springboot-api-production.up.railway.app/Ranking`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const formattedData = data.map(user => ({
                    ...user,
                    image: { uri: user.fotoPerfil }
                }));
                setData(formattedData);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 1000); // 每秒刷新一次数据

        return () => clearInterval(interval);
    }, []);

    const renderUserItem = ({ item, index }) => (
        <TouchableWithoutFeedback
            key={index}
            onPress={() => {
                setSelectedUser(item);
                setModalVisible(true);
            }}
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
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.nombre} {item.apellido}</Text>
                    <Text style={styles.experience}>{item.exp} EXP</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>Error fetching data: {error.message}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>TOP JUGADORES</Text>
            </View>
            <RefreshListView
                data={data}
                renderItem={renderUserItem}
                keyExtractor={item => item.id.toString()}
            />
            {selectedUser && (
                <UserPerfil
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    user={selectedUser}
                />
            )}
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
        flex: 1,
    },
    experience: {
        fontSize: 16,
        color: '#666',
        marginLeft: 10,
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
