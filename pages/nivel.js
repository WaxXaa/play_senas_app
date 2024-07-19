// pages/Nivel.js

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { questionsData } from '../pages/data/niveldatos.js'; // 确保有这个数据文件

const Nivel = ({ route, navigation }) => {
  const { theme, leccion } = route.params || {};
  const questions = questionsData[theme] ? questionsData[theme][leccion] : [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (answer) => {
    // 处理答案的逻辑
    setSelectedOption(answer);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Felicidades! Has terminado todas las preguntas.</Text>
        <Button title="Volver al inicio" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{question.text}</Text>
      {question.type === 'trueFalse' ? (
        <View style={styles.optionsContainer}>
          <Button title="Verdadero" onPress={() => handleAnswer('Verdadero')} />
          <Button title="Falso" onPress={() => handleAnswer('Falso')} />
        </View>
      ) : (
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <Button
              key={index}
              title={option}
              onPress={() => handleAnswer(option)}
            />
          ))}
        </View>
      )}
      {selectedOption && (
        <Button title="Siguiente pregunta" onPress={handleNextQuestion} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  optionsContainer: {
    marginBottom: 20,
  },
});

export default Nivel;
