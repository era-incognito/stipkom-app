import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { colors } from '../../constants/Colors';

const PracticalBlock = ({ block, onNext, onPrevious, isFirst, isLast, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  useEffect(() => {
    // Сбрасываем состояние при изменении блока
    setSelectedOption(null);
    setManualInput('');
    setIsAnswerCorrect(false);
    setIsAnswerSubmitted(false);
  }, [block]);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    const isCorrect =
      (block.type === 'MULTIPLE_CHOICE' && selectedOption === block.correctAnswer) ||
      (block.type === 'MANUAL_INPUT' && manualInput.trim().toLowerCase() === block.correctAnswer.toLowerCase());

    setIsAnswerCorrect(isCorrect);
    setIsAnswerSubmitted(true);

    if (!isCorrect) {
      setSelectedOption(null);
      setManualInput('');
    }
  };

  const handleNext = () => {
    if (isAnswerCorrect) {
      onNext();
    }
  };

  const handleComplete = () => {
    if (isAnswerCorrect && onComplete) {
      onComplete();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <Text style={styles.question}>{block.question}</Text>
        {block.type === 'MULTIPLE_CHOICE' && (
          <View style={styles.optionButtonContainer}>
            {block.options.split('; ').map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.optionButton, selectedOption === option && styles.selectedOptionButton]}
                onPress={() => handleOptionPress(option)}
                disabled={isAnswerSubmitted && isAnswerCorrect}
              >
                <Text style={styles.optionButtonText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {block.type === 'MANUAL_INPUT' && (
          <TextInput
            style={styles.input}
            onChangeText={setManualInput}
            value={manualInput}
            editable={!isAnswerSubmitted || !isAnswerCorrect}
            placeholder='Введите ответ'
            placeholderTextColor={colors.secondaryText}
          />
        )}
        {isAnswerSubmitted && (
          <>
            {isAnswerCorrect ? (
              <Text style={styles.feedbackText}>Правильный ответ!</Text>
            ) : (
              <Text style={styles.feedbackText}>Неправильный ответ, попробуйте еще раз</Text>
            )}
          </>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.leftButton, isFirst && styles.disabledButton]}
          onPress={onPrevious}
          disabled={isFirst}
        >
          <Text style={[styles.buttonText, isFirst && styles.disabledButtonText]}>Назад</Text>
        </TouchableOpacity>
        {isAnswerSubmitted && isAnswerCorrect && !isLast && (
          <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={handleNext}>
            <Text style={styles.buttonText}>Далее</Text>
          </TouchableOpacity>
        )}
        {isAnswerSubmitted && isAnswerCorrect && isLast && (
          <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={handleComplete}>
            <Text style={styles.buttonText}>Завершить главу</Text>
          </TouchableOpacity>
        )}
        {(!isAnswerSubmitted || !isAnswerCorrect) && (
          <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Ответить</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60, // Отступ снизу для кнопок
  },
  question: {
    fontSize: 20,
    fontFamily: 'Golos-SemiBold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButtonContainer: {
    width: '100%',
    marginBottom: 10,
  },
  optionButton: {
    width: '100%',
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOptionButton: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  optionButtonText: {
    fontSize: 16,
    fontFamily: 'Golos-Regular',
    color: colors.primary,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: colors.contrastElements,
    padding: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Golos-Regular',
    textAlign: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.background,
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  leftButton: {
    marginRight: 5,
  },
  rightButton: {
    marginLeft: 5,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Golos-Regular',
    color: colors.contrastElements,
  },
  disabledButtonText: {
    color: colors.secondaryText,
  },
  feedbackText: {
    flexWrap: 'wrap',
    width: 200,
    color: colors.secondaryText,
    fontSize: 16,
    fontFamily: 'Golos-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default PracticalBlock;