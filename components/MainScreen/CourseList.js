import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CourseCard from './CourseCard';
import { colors } from '../../constants/Colors';

const CourseList = ({ courses, onCoursePress }) => {
  const renderCourseItem = ({ item }) => (
    <CourseCard course={item} onPress={() => onCoursePress(item)} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Чему хотите научиться сегодня?</Text>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Golos-SemiBold',
    color: colors.text,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 15,
  },
});

export default CourseList;