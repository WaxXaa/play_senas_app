import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

export default function Leccion({ route, navigation }) {
    const { theme, leccion, id } = route.params || {};
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [videoUrl, setVideoUrl] = useState('');
    const [nombre, setNombre] = useState('');


    useEffect(() => {
        fetch(`https://play-senas-springboot-api-production.up.railway.app/etapas/lecciones/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log('Nombre:', data.nombre);
                setNombre(data.nombre);
                setVideoUrl(data.video);
            })
            .catch(error => {
                console.error('Error fetching lesson data:', error);
            });
    }, [id]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>{nombre} {leccion}</Text>
            <View style={styles.videoContainer}>
                {videoUrl ? (
                    <Video
                        ref={video}
                        style={styles.video}
                        source={{ uri: videoUrl }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                ) : (
                    <Text style={styles.errorText}>Cargando video...</Text>
                )}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Nivel', { theme, leccion, id })}
            >
                <Text style={styles.buttonText}>Ir a Nivel</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 10,
        backgroundColor: '#FFFFFF', // White background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3A3B3C', // Dark gray text color
        marginBottom: 20,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#FFBB3B', // Orange border color
        paddingBottom: 10,
    },
    videoContainer: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    video: {
        flex: 1,
        alignSelf: 'stretch',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    itemContainer: {
        width: Dimensions.get('window').width / 2 - 20,
        marginBottom: 20,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    text: {
        fontSize: 16,
        color: '#3A3B3C', // Dark gray text color
        marginVertical: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#FFBB3B', // Orange background color
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    buttonText: {
        color: '#000000', // Black text color
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
