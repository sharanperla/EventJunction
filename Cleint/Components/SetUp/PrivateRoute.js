import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../Screens/SignInScreen';


const Stack = createStackNavigator();

export default function PrivateRoute() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUser ? (
          // If user is authenticated, render Outlet
          <Stack.Screen name="PrivateRoute" component={Outlet} />
        ) : (
          // If user is not authenticated, navigate to sign-in screen
          <Stack.Screen name="SignIn" component={SignInScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
