import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchCourses as fetchCoursesFromAPI } from '../services/graphql';
import { colors } from '../constants/Colors';
import Toolbar from '../components/MainScreen/Toolbar';
import CourseList from '../components/MainScreen/CourseList';

export default function MainScreen({ userInfo, onSignOut }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const courses = await fetchCoursesFromAPI();
    setCourses(courses);
  };

  const navigation = useNavigation();

  const handleCoursePress = (course) => {
    navigation.navigate('CourseDetails', {
      courseId: course.id,
      courseTitle: course.title,
      userInfo: userInfo,
    });
  };

  return (
    <View style={styles.container}>
      <Toolbar userInfo={userInfo} onSignOut={onSignOut} />
      <CourseList courses={courses} onCoursePress={handleCoursePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
});