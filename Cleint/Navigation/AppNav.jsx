
import React, { useContext } from 'react'
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from '../Context/AuthContext';
import AuthStack from '../Components/SetUp/AuthStack';
import AppStack from '../Components/SetUp/AppStack';
// import { persistor, store } from "./redux/store.js";
// import PrivateRoute from "./Components/SetUp/PrivateRoute";

const AppNav = () => {
    const {currentUser}=useContext(AuthContext);
  return (
    <NavigationContainer>
       <StatusBar />
        {currentUser !== null ?<AuthStack/> : <AppStack/>}
</NavigationContainer>
  )
}

export default AppNav