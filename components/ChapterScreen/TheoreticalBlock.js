import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../../constants/Colors';

const TheoreticalBlock = ({ block, onNext, onPrevious, isFirst, isLast, onComplete }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {block.imageUrl && <Image source={{ uri: block.imageUrl }} style={styles.image} />}
        <Text style={styles.title}>{block.title}</Text>
        <Text style={styles.content}>{block.content}</Text>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.leftButton, isFirst && styles.disabledButton]}
          onPress={onPrevious}
          disabled={isFirst}
        >
          <Text style={[styles.buttonText, isFirst && styles.disabledButtonText]}>Назад</Text>
        </TouchableOpacity>
        {!isLast ? (
          <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={onNext}>
            <Text style={styles.buttonText}>Далее</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={onComplete}>
            <Text style={styles.buttonText}>Завершить главу</Text>
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
  scrollViewContent: {
    paddingBottom: 60, // Отступ снизу для кнопок
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Golos-SemiBold',
    color: colors.text,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    fontFamily: 'Golos-Regular',
    color: colors.text,
    marginBottom: 20,
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
});

export default TheoreticalBlock;