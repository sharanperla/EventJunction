import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./Components/Screens/SplashScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/Screens/HomeScreen";
import SignInScreen from "./Components/Screens/SignInScreen";
import SignUpScreen from "./Components/Screens/SignUpScreen";
import IntrestsScreen from "./Components/Screens/IntrestsScreen";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Intrests">
        <Stack.Screen name="OnBoarding" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Intrests" component={IntrestsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
