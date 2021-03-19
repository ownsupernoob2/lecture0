import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens
import loginLandingScreen from '../screens/auth/loginLandingScreen';
import loginScreen from '../screens/auth/loginScreen';
import signUpScreen from '../screens/auth/signUpScreen';

const { Navigator, Screen } = createStackNavigator();

export const RegisterStack = ({ navigation }) => (
  <Navigator
    // headerMode='screen' //default option
    initialRouteName='loginLandingScreen'
    screenOptions={{
      gestureEnabled: false,
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#03993a', height: 70 },
      headerTitleStyle: { fontWeight: 'bold' },
      headerTitleAlign: 'center',
      
    }}>
    <Screen
      name='Login Option.'
      component={loginLandingScreen}
      
    />
    <Screen
      name='signUpScreen'
      component={signUpScreen}
      options={{
        title: 'Register',
      }}
    />
    <Screen
      name='loginScreen'
      component={loginScreen}
      options={{
        title: 'Login',
      }}
    />
  </Navigator>
);