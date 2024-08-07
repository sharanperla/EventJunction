import React, { useContext } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AuthContext } from "../../Context/AuthContext";
import color from "../../assets/color";

export default function SplashScreen({ navigation }) {
  handlePress = () => {
    navigation.navigate("SignIn");
  };
  return (
      // <ImageBackground
      //   source={require("../../assets/Background.png")}
      //   style={styles.backgroundImage}
      // >
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/EjLogo.png")}
          style={styles.image}
        />
        <Text style={styles.EJ}>Event Junction</Text>
        <Text style={styles.Brief}>Where Flavor Meets Celebration</Text>
      </View>
      <Pressable style={styles.BtnContainer}>
        <Text style={styles.SplashButton} onPress={handlePress}>
          Login
        </Text>
      </Pressable>
    </View>
    //  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    resizeMode: "cover", // or 'stretch' or 'contain'
    justifyContent: "center", // or 'flex-start', 'flex-end', 'center'
    width: "100%",
    height: "100%",
  },
  SplashButton: {
    color: "#fff",
    // backgroundColor: "rgb(0,120,240)",
    backgroundColor: color.primaryColor,
    // backgroundColor: "",
    width: 300,
    paddingHorizontal: 11,
    paddingVertical: 14,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    marginBottom: -20,
    tintColor: color.primaryColor,
  },
  logoContainer: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  EJ: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
  },
  Brief: {
    fontSize: 17,
    fontWeight: "normal",
    color: "black",
  },
  BtnContainer: {
    position: "absolute",
    bottom: 20,
  },
});
