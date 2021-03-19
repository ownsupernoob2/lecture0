import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Custom Components:
import Home from '../screens/home';
import Scratch from '../screens/scratch';
import { Header }  from '../shared/header';

const { Navigator, Screen } = createStackNavigator();

export const HomeStack = ({ navigation }) => (
  <Navigator
    // headerMode='screen' //default option
    initialRouteName='Home'
    screenOptions={{
      gestureEnabled: false,
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#03993a', height: 70 },
      headerTitleStyle: { fontWeight: 'bold' },
      headerTitleAlign: 'center',
    }}>
    <Screen
      name='Home'
      component={Home}
      options={{
        headerTitle: () => <Header title={'EarnIt'} navigation={navigation} />,
      }}
    />

    <Screen
      name='Scratch'
      component={Scratch}
      options={{
        title: 'Scratch tile',
      }}
    />
  </Navigator>
);



