import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./Components/Screens/SplashScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/Screens/HomeScreen";
import SignInScreen from "./Components/Screens/SignInScreen";
import SignUpScreen from "./Components/Screens/SignUpScreen";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="OnBoarding">
        <Stack.Screen name="OnBoarding" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
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
