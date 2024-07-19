import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import color from "../../assets/color";

function SignUpScreen({ navigation }) {
  navigateToSignUp = () => {
    navigation.navigate("SignIn");
  };

  const [formData, setFormData] = useState({});
  const [passMatch, setPassMatch] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (key, value) => {
    if (key === "password" || key === "confirm") {
      // Check if both password and confirm are being changed
      if (key === "password" && formData.confirm !== value) {
        setPassMatch(false);
      } else if (key === "confirm" && formData.password !== value) {
        setPassMatch(false);
      } else {
        setPassMatch(true);
      }
    }
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  const validateForm = () => {
    const requiredFields = ["username", "email", "password"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return `The field ${field} is required.`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {

      setLoading(true);
      e.preventDefault();
      const { confirm, ...restFormData } = formData;
      // Check if passwords match
      if (formData.password !== formData.confirm) {
        setPassMatch(false);
        setLoading(false);
        console.log("doesnt match password");
        return;
      }

      const res = await fetch("http://192.168.43.4:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restFormData),
      });

      const data = await res.json();

      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        console.log("data success false");
        return;
      }
      setLoading(false);
      setError(null);
      console.log("data success ");
      navigation.navigate("SignIn");
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error in signup", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.Container}
    >
      <View style={styles.subContainer}>
        <View style={styles.LogoContainer}>
          <Image
            style={styles.Image}
            source={require("../../assets/EJBlack.png")}
          />
          <Text style={styles.LogoCap}>Event Junction</Text>
        </View>
        <View style={styles.SignUpdisc}>
          <Text style={{textAlign:'center'}}>Enter your details to begin the excitement</Text>
        </View>
      </View>
      <View style={styles.FormContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter username"
          onChangeText={(text) => handleChange("username", text)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter email"
          onChangeText={(text) => handleChange("email", text)}
        />
        <View style={styles.inputStyle}>
          <TextInput
            placeholder="Enter password"
            onChangeText={(text) => handleChange("password", text)}
          />
        </View>
        <View style={styles.inputStyle}>
          <TextInput
            placeholder="Confirm password"
            onChangeText={(text) => handleChange("confirm", text)}
          />
        </View>
        {passMatch === false ? <Text style={{color:"red"}}>Passwords do not match</Text> : null}
        <Pressable onPress={handleSubmit}>
          <Text style={styles.SplashButton}>
            {loading ? "Loading.." : "Sign Up"}
          </Text>
        </Pressable>
        <Text style={styles.errorMsg}>{error ? error : ""}</Text>
      </View>
      <View style={styles.subContainer3}>
        <Text>
          Don't have an account?
          <Text onPress={() => navigation.navigate("SignIn")} style={styles.HighText}>
            Sign In
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>

  );
}

export default SignUpScreen;
const styles = StyleSheet.create({
  Container: {

    paddingVertical: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  LogoCap: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",

  },
  subContainer:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  LogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  inputStyle: {
    width: 300,
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10, // Added margin bottom to create space between input fields
  },
  SplashButton: {
    color: "#fff",
    backgroundColor: color.primaryColor,
    width: 300,
    paddingHorizontal: 11,
    paddingVertical: 14,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10, // Added margin top to create space above the button
  },
  FormContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // Adjusted margin to create space between sub-container and form container
  },
  SignUpdisc: {
    fontSize: 17,
    fontWeight: "normal",
    color: "black",
    width:'50%',
  },
  subContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginBottom: 20, // Added margin bottom to create space between logo and form container
  },
  HighText: {
    color: "#1976D2",
    fontWeight: "bold",
    fontSize: 15,
  },
  errorMsg: {
    color: "red",
    maxWidth: "80%",
    textAlign: "center",
    marginTop: 10, // Added margin top to create space above the error message
  },
  Image: {
    tintColor: color.primaryColor,
    marginBottom: -20,
  },
  subContainer3: {
    marginTop: 20, // Added margin top to create space above the footer text
  },
});
