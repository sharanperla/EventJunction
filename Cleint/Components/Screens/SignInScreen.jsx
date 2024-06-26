import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from "../../Context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import color from "../../assets/color";

function SignInScreen({ navigation }) {
  const {
    currentUser,
    setCurrentUser,
    signInStart,
    signInSuccess,
    globalError,
    signInFailure,
  } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  // const {loading,error}=useSelector((state)=>state.user)

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  handlePress = async (e) => {
    try {
      signInStart();
      e.preventDefault();
      const res = await fetch("http://192.168.43.4:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        signInFailure(data.message);
        return;
      }

      // AsyncStorage.setItem('authToken','ji');
      const AccessToken = data.token;
      AsyncStorage.setItem("authToken", AccessToken);
      AsyncStorage.setItem("authData", JSON.stringify(data));
      signInSuccess(data);
      setCurrentUser(true);

      // navigation.navigate("Home");
    } catch (error) {
      signInFailure(error.message);
    }
  };

  navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View></View>
        <View style={styles.BtnContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="enter email"
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="enter password"
            onChangeText={(text) => handleChange("password", text)}
          />
          <Text style={styles.SplashButton} onPress={handlePress}>
            Login
          </Text>
          <Text style={styles.errorMsg}>{globalError ? globalError : ""}</Text>
        </View>
        <View>
          <Text>
            Dont have an acount?
            <Text onPress={navigateToSignUp} style={styles.HighText}>
              signup
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  BtnContainer: {
    display: "flex",
    gap: 10,
  },
  SplashButton: {
    color: "#fff",
    // backgroundColor: "#F10EDB",
    backgroundColor: color.primaryColor,
    width: 300,
    paddingHorizontal: 11,
    paddingVertical: 14,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  inputStyle: {
    width: 300,
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  HighText: {
    color: "#1976D2",
    fontWeight: "bold",
    fontSize: 15,
  },
});
