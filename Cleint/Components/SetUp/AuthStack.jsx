import { View, Text } from "react-native";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import BookingsScreen from "../Screens/BookingsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import EditProfileScreen from "../Screens/EditProfileScreen";
import AddEvent from "../Screens/AddEvent";
import EventSuccessScreen from "../Screens/EventSucessScreen";

const AuthStack = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  
  function HomeStack() {
    return (
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false}} >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    );
  }


  function ProfileStack() {
    return (
      <Stack.Navigator initialRouteName="EventSuccessScreen" screenOptions={{headerShown: false}} >
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="AddEventScreen" component={AddEvent} />
        <Stack.Screen name="EventSuccessScreen" component={EventSuccessScreen} />
      </Stack.Navigator>
    );
  }


  function BookingStack() {
    return (
      <Stack.Navigator initialRouteName="BookingsScreen" screenOptions={{headerShown: false}} >
        <Stack.Screen name="BookingsScreen" component={BookingsScreen} />
      </Stack.Navigator>
    );
  }




  return (
  

  
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket-outline" size={size} color={color} />
          ),
        }}
        name="Bookings"
        component={BookingStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default AuthStack;
