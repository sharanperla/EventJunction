import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

function SignUpScreen({ navigation }) {
  handlePress=()=>{
    navigation.navigate("Home")
}
navigateToSignUp=()=>{
    navigation.navigate("SignIn");
}
  return (
    <SafeAreaView>
      <View style={styles.Container}>
        <View style={styles.subContainer}>
          <View style={styles.LogoContainer}>
            <Image source={require("../../assets/EJBlack.png")} />
            <Text style={styles.LogoCap}>Event Junction</Text>
          </View>
          <View style={styles.SignUpdisc}>
            <Text>Sign up to get started</Text>
          </View>
        
        </View>
        <View style={styles.FormContainer}>
          <TextInput style={styles.inputStyle} placeholder="enter email" />
          <TextInput style={styles.inputStyle} placeholder="enter password" />
          <View style={styles.inputStyle}>
            <TextInput placeholder="enter password" />
          </View>
          <View style={styles.inputStyle}>
            <TextInput placeholder="enter password" />
          </View>
          <Text style={styles.SplashButton} onPress={handlePress}>
            SignUp
          </Text>
        </View>
        <View style={styles.subContainer3}>
          <Text>
            Dont have an acount?
            <Text onPress={navigateToSignUp} style={styles.HighText}>
              signin
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
    paddingTop:40,
  },
  inputStyle: {
    width: 300,
    paddingHorizontal: 11,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
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
    marginTop:-100,
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
  HighText:{
    color:'#1976D2',
    fontWeight:'bold',
    fontSize:15,
          }

});
