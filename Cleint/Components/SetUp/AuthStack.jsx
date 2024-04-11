import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from '../Screens/HomeScreen'
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="onBoarding"
    >
    <Stack.Screen name="Home" component={HomeScreen} />
   
    </Stack.Navigator>
  )
}

export default AuthStack