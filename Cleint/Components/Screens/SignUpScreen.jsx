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

  const handleSubmit = async (e) => {
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
    <SafeAreaView>
      <View style={styles.Container}>
        <View style={styles.subContainer}>
          <View  
              style={styles.LogoContainer}>
            <Image source={require("../../assets/EJBlack.png")} />
            <Text style={styles.LogoCap}>Event Junction</Text>
          </View>
          <View style={styles.SignUpdisc}>
            <Text>Sign up to get started</Text>
          </View>
        </View>
        <View style={styles.FormContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="enter username"
            onChangeText={(text) => handleChange("username", text)}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="enter email"
            onChangeText={(text) => handleChange("email", text)}
          />
          <View style={styles.inputStyle}>
            <TextInput
              placeholder="enter password"
              onChangeText={(text) => handleChange("password", text)}
            />
          </View>
          <View style={styles.inputStyle}>
            <TextInput
              placeholder="enter password"
              onChangeText={(text) => handleChange("confirm", text)}
            />
          </View>
          {passMatch === false ? <Text>password doesnt match</Text> : ""}
          <Pressable
            onPress={
              handleSubmit}
          >
            <Text style={styles.SplashButton}>
              {loading ? "Loading.." : "SignUp"}
            </Text>
          </Pressable>
          <Text style={styles.errorMsg}>{error? error:''}</Text>
        </View>
        <View style={styles.subContainer3}>
          <Text>
            Dont have an acount?
            <Text onPress={navigateToSignUp} style={styles.HighText}>
              signIn
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignUpScreen;
const styles = StyleSheet.create({
  Container: {
    height: "100%",
    paddingVertical: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  LogoCap: {
    fontSize: 35,
    fontWeight: "bold",
  },
  LogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: -40,
    paddingTop: 40,
  },
  inputStyle: {
    width: 300,
        paddingHorizontal: 11,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth:1,
  },
  SplashButton: {
    color: "#fff",
    backgroundColor: "#F10EDB",
    width: 300,
    paddingHorizontal: 11,
    paddingVertical: 14,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  FormContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: -100,
  },

  SignUpdisc: {
    textAlign: "center",
  },
  SignUpdisc: {},
  subContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  HighText: {
    color: "#1976D2",
    fontWeight: "bold",
    fontSize: 15,
  },
  errorMsg:{
      color:'red',
      maxWidth:'80%',
      textAlign:'center'
  }
});
