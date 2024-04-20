import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from '../Context/AuthContext';
import AuthStack from '../Components/SetUp/AuthStack';
import AppStack from '../Components/SetUp/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

const AppNav = () => {
    const { currentUser ,setCurrentUser,setUserData} = useContext(AuthContext);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getToken = async () => {
            try {
                const authToken = await AsyncStorage.getItem('authToken');
                const authDataString = await AsyncStorage.getItem('authData');
                const authData = JSON.parse(authDataString);
                setAccessToken(authToken);
                setUserData(authData);
                setCurrentUser(true);
                setLoading(false); // Set loading to false after token retrieval
            } catch (error) {
                console.log(error);
                setLoading(false); // Set loading to false on error
            }
        }
        getToken();
    }, []); // Add accessToken as a dependency

    if (loading) {
        // Show loading indicator or splash screen while retrieving token
        return <Text>Loading...</Text>;
    }

    return (
        <NavigationContainer>
            <StatusBar />
            {currentUser !== false ? <AuthStack /> : <AppStack />}
        </NavigationContainer>
    );
}

export default AppNav;
