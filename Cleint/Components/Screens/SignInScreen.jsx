import React, { useContext, useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
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
  const [error,setError]=useState(null)
  // const {loading,error}=useSelector((state)=>state.user)

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  handlePress = async (e) => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      setError(null)
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
        setError(data.message)
        console.log(data);
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
      setError(null)
    }
  };
  console.log(error);

  const validateForm = () => {
    const requiredFields = ["email", "password"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return `The field ${field} is required.`;
      }
    }
    return null;
  };

  navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView>
       <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* <View style={styles.container}> */}
        <View style={styles.subContainer}>
          <View style={styles.LogoContainer}>
            <Image
              style={styles.Image}
              source={require("../../assets/EJBlack.png")}
            />
            <Text style={styles.LogoCap}>Event Junction</Text>
          </View>
          <View style={styles.SignUpdisc}>
            <Text style={{textAlign:'center'}}>Sign in and discover unforgettable experiences</Text>
          </View>
        </View>
        <View style={styles.BtnContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="enter email"
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="enter password"
            secureTextEntry={true}
            onChangeText={(text) => handleChange("password", text)}
          />
          <Text style={styles.SplashButton} onPress={handlePress}>
            Login
          </Text>
          <Text style={styles.errorMsg}>{error ? error : ""}</Text>
        </View>
        <View>
          <Text>
            Dont have an acount?
            <Text onPress={navigateToSignUp} style={styles.HighText}>
              signup
            </Text>
          </Text>
        </View>
      {/* </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    // height: "100%",
    // display: "flex",
    // justifyContent: "space-around",
    // alignItems: "center",
    // paddingVertical: 20,
    gap:15,
     paddingVertical: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height:'100%'
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
  subContainer:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      
    },
    LogoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 40,
    },
    SignUpdisc: {
      fontSize: 17,
      fontWeight: "normal",
      color: "black",
      width:'50%',
    },
    LogoCap: {
      fontSize: 35,
      fontWeight: "bold",
      color: "black",
  },
    Image: {
      tintColor: color.primaryColor,
      marginBottom: -20,
    },
    errorMsg: {
      color: "red",
      maxWidth: "80%",
      textAlign: "center",
      marginTop: 10, // Added margin top to create space above the error message
    },
});
