import React, { useState, useEffect ,useContext} from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const Nivel = ({ route, navigation }) => {
  const { id } = route.params || {};
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]); 
  const [userAnswers, setUserAnswers] = useState([]); 
  id: userInfo?.id
  const handleexp = async()=> {
    await fetch("http://172.20.10.5:8080/exp/" + userInfo.id,{
      method : "PUT"
    })
    navigation.navigate('Home')
  }
  useEffect(() => {
    fetch(`http://172.20.10.5:8080/preguntas/nivel/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setQuestions(data);
        setLoading(false);
        // Initialize correct answers and user answers
        const initialCorrectAnswers = data.map(q => q.respuestas.find(r => r.correcta).respuesta);
        setCorrectAnswers(initialCorrectAnswers);
        setUserAnswers(new Array(data.length).fill(null));
      })
      .catch(error => {
        console.error("There was an error fetching the questions!", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleAnswer = (answer) => {
    setSelectedOption(answer);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      // Save the user's answer
      setUserAnswers(prevAnswers => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestionIndex] = selectedOption;
        return updatedAnswers;
      });
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando preguntas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hubo un error al cargar las preguntas.</Text>
        <Button title="Reintentar" onPress={() => {
          setLoading(true);
          setError(null);
          fetch(`http://172.20.10.5:8080/preguntas/nivel/${id}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              setQuestions(data);
              setLoading(false);
              const initialCorrectAnswers = data.map(q => q.respuestas.find(r => r.correcta).respuesta);
              setCorrectAnswers(initialCorrectAnswers);
              setUserAnswers(new Array(data.length).fill(null));
            })
            .catch(error => {
              console.error("There was an error fetching the questions!", error);
              setError(error);
              setLoading(false);
            });
        }} />
      </View>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>¡Felicidades! Has terminado todas las preguntas.</Text>
        <Text style={styles.title}>Resumen:</Text>
        {questions.map((question, index) => (
          <View key={index} style={styles.summaryContainer}>
            <Text style={styles.title}>Pregunta: {question.pregunta}</Text>
            <Image source={{ uri: question.foto }} style={styles.image} />
            <Text style={styles.title}>Tu respuesta: {userAnswers[index]}</Text>
            <Text style={styles.title}>Respuesta correcta: {correctAnswers[index]}</Text>
          </View>
        ))}
        <Button title="Volver al inicio" onPress={() => handleexp()} />
      </ScrollView>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {question ? (
        <>
          <Text style={styles.title}>{question.pregunta}</Text>
          <Image source={{ uri: question.foto }} style={styles.image} />
          <View style={styles.optionsContainer}>
            {question.respuestas.map((respuesta, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === respuesta.respuesta && styles.selectedOptionButton
                ]}
                onPress={() => handleAnswer(respuesta.respuesta)}
              >
                <Text style={styles.optionText}>{respuesta.respuesta}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedOption && (
            <Button title="Siguiente pregunta" onPress={handleNextQuestion} />
          )}
        </>
      ) : (
        <Text style={styles.title}>No se encontraron preguntas.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: '#ffd700',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  summaryContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
});

export default Nivel;
