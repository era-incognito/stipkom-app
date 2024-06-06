import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { upsertStudentInHygraph } from './services/graphql';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';

GoogleSignin.configure();

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const restoreUserInfo = async () => {
      try {
        const savedUserInfo = await AsyncStorage.getItem('userInfo');
        if (savedUserInfo !== null) {
          setUserInfo(JSON.parse(savedUserInfo));
        }
      } catch (error) {
        console.log('Error restoring user info:', error);
      }
    };

    restoreUserInfo();
  }, []);

  const handleSignIn = async (userData) => {
    setUserInfo(userData);
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      await upsertStudentInHygraph(userData);
    } catch (error) {
      console.log('Error saving user info:', error);
    }
  };

  const handleSignOut = async () => {
    setUserInfo(null);
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('userInfo');
    } catch (error) {
      console.log('Error removing user info:', error);
    }
  };

  const [fontsLoaded] = useFonts({
    'Golos-Regular': require('./assets/fonts/GolosText-Regular.ttf'),
    'Golos-SemiBold': require('./assets/fonts/GolosText-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      {userInfo ? (
        <MainNavigator userInfo={userInfo} onSignOut={handleSignOut} />
      ) : (
        <AuthNavigator onSignIn={handleSignIn} />
      )}
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}