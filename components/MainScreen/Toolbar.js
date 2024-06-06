import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/Colors';

export default function Toolbar({ userInfo, onSignOut }) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View>
          {userInfo && userInfo.user ? (
            <>
              <Text style={[styles.text, styles.regularText]}>Добро пожаловать,</Text>
              <Text style={[styles.text, styles.semiBoldText]}>{userInfo.user.name}</Text>
            </>
          ) : (
            <Text style={[styles.text, styles.semiBoldText]}>Пользователь не авторизован</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={onSignOut}
          style={styles.signOutButton}>
            <MaterialCommunityIcons
              name='exit-to-app'
              size={24}
              color={colors.contrastElements}/>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginTop: 40,
  },
  userInfoContainer: {
    display:'flex',
    flexDirection:'row',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent:'space-between',
    borderRadius: 20,
    padding: 20,
  },
  signOutButton: {
    borderColor: colors.contrastElements,
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
  },
  text: {
    fontSize: 16,
    color: colors.contrastElements,
  },
  regularText: {
    fontFamily: 'Golos-Regular',
  },
  semiBoldText: {
    fontFamily: 'Golos-SemiBold',
  },
});