import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./Components/Screens/SplashScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/Screens/HomeScreen";
import SignInScreen from "./Components/Screens/SignInScreen";
import SignUpScreen from "./Components/Screens/SignUpScreen";
import IntrestsScreen from "./Components/Screens/IntrestsScreen";

import AppNav from "./Navigation/AppNav";
import { AuthProvider } from "./Context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EventProvider } from "./Context/EventContext";

import { useEffect } from "react";

export default function App() {
  return (
    <>
      <AuthProvider>
        <EventProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppNav />
          </GestureHandlerRootView>
        </EventProvider>
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
