import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import RefreshListView from 'react-native-refresh-list-view';

const Aprender = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://172.20.10.5:8080/etapas/all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderNewsItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => props.navigation.navigate('Detail', { id: item.id })}
            >
                <View>
                    <View style={styles.textImage}>
                        <Text style={styles.text}>{item.nombre}</Text>
                        <Text>{item.descripcion}</Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={{ uri: item.image_url }}  
                    />     
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>Error fetching data: {error.message}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <RefreshListView
                data={data}
                renderItem={renderNewsItem}
                keyExtractor={item => item.id.toString()}
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
        height: 200,
        resizeMode: "cover",
    },
    text: {
        fontSize: 24,
        color: '#000000DD',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default Aprender;
