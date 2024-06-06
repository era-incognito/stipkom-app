import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../constants/Colors';
import MainScreen from '../screens/MainScreen';
import CourseDetailsScreen from '../screens/CourseDetailsScreen';
import ChapterScreen from '../screens/ChapterScreen';

const MainStack = createStackNavigator();

const MainNavigator = ({ userInfo, onSignOut }) => (
  <MainStack.Navigator>
    <MainStack.Screen name="Main" options={{ headerShown: false }}>
      {(props) => <MainScreen {...props} userInfo={userInfo} onSignOut={onSignOut} />}
    </MainStack.Screen>
    <MainStack.Screen
      name="CourseDetails"
      component={CourseDetailsScreen}
      options={({ route }) => ({
        title: route.params.courseTitle,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.contrastElements,
        headerTitleStyle: {
          fontFamily: 'Golos-SemiBold',
        },
      })}
    />
    <MainStack.Screen
      name="Chapter"
      component={ChapterScreen}
      options={({ route }) => ({
        title: route.params.chapter.title,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.contrastElements,
        headerTitleStyle: {
          fontFamily: 'Golos-SemiBold',
        },
      })}
    />
  </MainStack.Navigator>
);

export default MainNavigator;