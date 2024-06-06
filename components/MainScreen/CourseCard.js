import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/Colors';

const CourseCard = ({ course, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: course.coverImage.url }} style={styles.coverImage} />
      <View style={styles.details}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.info}>
          {course.isTheoretical ? 'Теория' : 'Практика'} · {course.chapters.length} глав · {course.estimatedTime} минут
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.contrastElements,
    shadowColor: colors.shadow,
    elevation: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  details: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Golos-SemiBold',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    fontFamily: 'Golos-Regular',
    color: colors.secondaryText,
  },
});

export default CourseCard;