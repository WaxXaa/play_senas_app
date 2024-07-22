import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Detail = ({ route }) => {
    const { id } = route.params;
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [niveles, setNiveles] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        console.log("Received ID:", id);
        const fetchData = async () => {
            try {
                const response = await fetch('http://172.20.10.5:8080/etapas/niveles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                const etapa = result.find(item => item.id === id);
                if (etapa) {
                    setDetails(etapa);
                    setNiveles(Array.isArray(etapa.niveles) ? etapa.niveles : []);
                } else {
                    throw new Error('Etapa not found');
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [id]);
    

    const handleNivelPress = (nivel) => {
        navigation.navigate('Leccion', { 
            id: nivel.id, 
            nivelesData: niveles 
        });
    };

    const renderNivelButton = (nivel) => (
        <TouchableOpacity
            key={nivel.id}
            style={styles.nivelButton}
            onPress={() => handleNivelPress(nivel)}
        >
            <Text style={styles.nivelButtonTitle}>{nivel.nombre}</Text>
            <Text style={styles.nivelButtonDescription}>{nivel.descripcion}</Text>
        </TouchableOpacity>
    );
    
    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFBB3B" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>Error fetching details: {error.message}</Text>
            </SafeAreaView>
        );
    }

    if (!details) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>No details available</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{details.nombre}</Text>
                <Text style={styles.description}>{details.descripcion}</Text>
            </View>
            <View style={styles.nivelesContainer}>
                {niveles.length > 0 ? (
                    niveles.map(nivel => renderNivelButton(nivel))
                ) : (
                    <Text style={styles.noNivelesText}>No niveles available</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Background color white
        padding: 15,
    },
    headerContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFBB3B', // Title color orange
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: '#3A3B3C', // Description color dark gray
    },
    nivelesContainer: {
        flex: 1,
    },
    nivelButton: {
        backgroundColor: '#FFBB3B', // Button color orange
        borderRadius: 8,
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FFBB3B', // Button border color orange
    },
    nivelButtonTitle: {
        fontSize: 18,
        color: '#FFFFFF', // Button text color white
        fontWeight: 'bold',
    },
    nivelButtonDescription: {
        fontSize: 14,
        color: '#FFFFFF', // Button description color white
        marginTop: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // Background color white
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // Background color white
    },
    errorText: {
        color: '#FFBB3B', // Error text color orange
    },
    noNivelesText: {
        color: '#3A3B3C', // Text color dark gray
    },
});

export default Detail;
