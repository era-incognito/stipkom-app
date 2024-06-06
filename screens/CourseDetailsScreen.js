import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchCourseDetails as fetchCourseDetailsFromAPI, fetchStudentDetails as fetchStudentDetailsFromAPI, enrollInCourse } from '../services/graphql';
import { colors } from '../constants/Colors';

const CourseDetailsScreen = ({ route }) => {
  const { courseId, userInfo, refreshKey } = route.params;
  const [course, setCourse] = useState(null);
  const [student, setStudent] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
    fetchStudentDetails();
  }, [refreshKey]);

  const fetchCourseDetails = async () => {
    const course = await fetchCourseDetailsFromAPI(courseId);
    setCourse(course);
  };

  const fetchStudentDetails = async () => {
    const student = await fetchStudentDetailsFromAPI(userInfo.user.email);
    setStudent(student);
    setIsEnrolled(student.enrolledCourses.some((enrolledCourse) => enrolledCourse.id === courseId));
  };

  const handleEnrollPress = async () => {
    await enrollInCourse(userInfo.user.email, course.id);
    setIsEnrolled(true);
  };

  const navigation = useNavigation();

  const handleChapterPress = (chapter) => {
    navigation.navigate('Chapter', {
      chapter,
      courseId: course.id,
      courseTitle: course.title,
      userInfo: userInfo,
    });
  };

  if (!course) {
    return <Text>Загрузка...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: course.coverImage.url }} style={styles.coverImage} />
      <Text style={styles.title}>Описание курса</Text>
      <Text style={styles.description}>{course.description}</Text>
      <TouchableOpacity
        style={[styles.enrollButton, isEnrolled && styles.enrolledButton]}
        onPress={handleEnrollPress}
        disabled={isEnrolled}
      >
        <Text style={styles.enrollButtonText}>
          {isEnrolled ? 'Вы записаны на курс' : 'Записаться'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.chaptersTitle}>Содержание:</Text>
      <View style={styles.chaptersContainer}>
        {course.chapters.map((chapter) => {
          const isCompleted = student && student.completedChapters.some(
            (completedChapter) => completedChapter.id === chapter.id
          );
          return (
            <TouchableOpacity
              key={chapter.id}
              style={[styles.chapterButton, !isEnrolled && styles.disabledChapterButton, isCompleted && styles.completedChapterButton]}
              onPress={() => handleChapterPress(chapter)}
              disabled={!isEnrolled}
            >
              <Text
                style={[styles.chapterButtonText, !isEnrolled && styles.disabledChapterButtonText, isCompleted && styles.completedChapterButtonText]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {chapter.title}
              </Text>
              <Text style={styles.chapterProgress}>{isCompleted ? 'Завершено 🎉' : 'Не завершено'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  coverImage: {
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
  description: {
    fontSize: 16,
    fontFamily: 'Golos-Regular',
    color: colors.text,
    marginBottom: 20,
  },
  enrollButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  enrolledButton: {
    backgroundColor: colors.success,
  },
  enrollButtonText: {
    fontSize: 16,
    fontFamily: 'Golos-Regular',
    color: colors.contrastElements,
    textAlign: 'center',
  },
  chaptersTitle: {
    fontSize: 20,
    fontFamily: 'Golos-SemiBold',
    color: colors.text,
    marginBottom: 10,
  },
  chaptersContainer: {
    flex: 1,
    marginBottom: 40,
  },
  chapterButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disabledChapterButton: {
    backgroundColor: colors.disabled,
  },
  completedChapterButton: {
    backgroundColor: colors.completed,
  },
  chapterButtonText: {
    fontSize: 16,
    fontFamily: 'Golos-Regular',
    color: colors.primary,
    flexShrink: 1,
    marginRight: 10,
  },
  disabledChapterButtonText: {
    color: colors.secondaryText,
  },
  completedChapterButtonText: {
    color: colors.text,
  },
  chapterProgress: {
    fontSize: 14,
    fontFamily: 'Golos-Regular',
    color: colors.text,
  },
});

export default CourseDetailsScreen;