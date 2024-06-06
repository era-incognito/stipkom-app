import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = ({ onSignIn }) => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Auth" options={{ headerShown: false }}>
      {(props) => <AuthScreen {...props} onSignIn={onSignIn} />}
    </AuthStack.Screen>
  </AuthStack.Navigator>
);

export default AuthNavigator;