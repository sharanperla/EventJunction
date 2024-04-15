import { Ionicons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen ({navigation}) {

  const toEditBio =()=>{
    navigation.navigate("EditProfileScreen");
  }

  const toAddEvent=()=>{
    navigation.navigate("AddEventScreen");

  }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.profileDataContainer}>
          <View style={styles.ProfileImageContainer}>
            <Image
              style={styles.ProfileImage}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOoU11lhsr7WFgMFxqYTLCo9cYSQtnE5NzYhLw1aFx_A&s",
              }}
            />
           
          </View>
          <Text style={styles.NameText}>Subramanyeshwara prasad</Text>
          <Text style={styles.mailText}>Subramanyeshwara@gmail.com</Text>
          <TouchableOpacity onPress={toEditBio} style={styles.BtnContainer}>
            <Text style={styles.SplashButton} >Edit Bio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toAddEvent}  style={styles.BtnContainer}>
            <Text style={styles.SplashButton}>Add Event</Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </SafeAreaView>
    );
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  ProfileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: "relative",
  },
  ProfileImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 100,
  },
  profileDataContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    gap: 10,
  },
  NameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mailText: {
    fontSize: 14,
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
  BtnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
