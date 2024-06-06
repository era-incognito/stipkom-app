import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/Colors';

GoogleSignin.configure();

export default function AuthScreen({ onSignIn }) {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      onSignIn(userInfo);
    } catch (error) {
      console.error('Sign in error:', error);
      ToastAndroid.show('Произошла ошибка, попробуйте войти снова', ToastAndroid.SHORT)
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name='ruler-square-compass'
        size={128}
        color={colors.contrastElements}/>
      <Text style={styles.headerText}>Все знания – в одном приложении</Text>
      <TouchableOpacity
        onPress={signIn}
        style={styles.ouathButton}>
          <MaterialCommunityIcons
            name='google'
            size={24}
            color={colors.text}/>
          <Text style={styles.buttonText}>Войти через Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ouathButton: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.contrastElements,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    gap: 10,
    marginTop: 40,
    padding: 10,
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'Golos-SemiBold',
    color: colors.contrastElements,
    textAlign:'center',
    marginTop: 20,
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Golos-Regular',
    color: colors.text,
  },
});