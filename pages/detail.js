// pages/Detail.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

export default function Detail({ navigation, route }) {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.title,
        });
    }, [navigation, route.params.title]);

    const navigateToLeccion = (leccion) => {
        navigation.navigate('Leccion', {
            theme: route.params.theme, // 传递 theme
            leccion
        });
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={route.params.image}
            />

            <View style={styles.detail}>
                <Text style={styles.detail_text}>
                    &#12288;&#12288;{route.params.desc}
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                {[1, 2, 3, 4].map(leccion => (
                    <TouchableOpacity
                        key={leccion}
                        style={styles.button}
                        onPress={() => navigateToLeccion(leccion)}
                    >
                        <Text style={styles.buttonText}>Entrar en Lección {leccion}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    image: {
        width: Dimensions.get('window').width,
        height: 200,
    },
    detail: {
        alignSelf: 'flex-start',
        padding: 10,
    },
    detail_text: {
        fontSize: 16,
        color: '#333333',
        margin: 6,
        textAlign: 'justify',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 10,
        width: '40%',
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
