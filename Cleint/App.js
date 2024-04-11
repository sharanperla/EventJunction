import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./Components/Screens/SplashScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/Screens/HomeScreen";
import SignInScreen from "./Components/Screens/SignInScreen";
import SignUpScreen from "./Components/Screens/SignUpScreen";
import IntrestsScreen from "./Components/Screens/IntrestsScreen";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import AppNav from "./Navigation/AppNav";
import { AuthProvider } from "./Context/AuthContext";

export default function App() {


  return (
    <>
    <AuthProvider>
       <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNav/>
        </PersistGate>
      </Provider>
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
