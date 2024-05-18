import { Ionicons } from "@expo/vector-icons";
import React, { Component, useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../Context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { currentUser, setCurrentUser ,userData} = useContext(AuthContext);
  const [loggedOut, setLoggedOut] = useState(false);
  console.log("userDta",userData.user._id);

  const toEditBio = () => {
    navigation.navigate("EditProfileScreen");
  };

  const toAddEvent = () => {
    navigation.navigate("AddEventScreen");
  };
  const toMyEvents = () => {
    navigation.navigate("MyEventsScreen");
  };

  const logOut = () => {
    AsyncStorage.removeItem("authToken");
    AsyncStorage.removeItem("authData");
    setCurrentUser(false);
    console.log("logged Out");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logOutButtonContainer}>
        <Ionicons
          name="log-out-outline"
          color={"green"}
          size={30}
          onPress={logOut}
        />
        <Text style={{ fontSize: 10 }}>Log Out</Text>
      </View>
      <View style={styles.EditProfileView}>
        <View style={styles.EditProfileContainer}>
          <Image
            style={styles.ProfileImage}
            source={{
              uri:userData?userData.user.avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOoU11lhsr7WFgMFxqYTLCo9cYSQtnE5NzYhLw1aFx_A&s",
            }}
          />

          <View style={styles.nameMailCOntainer}>
            <Text style={styles.NameText}>{userData&&userData.user.username}</Text>
            <Text style={styles.mailText}>{userData&&userData.user.email}</Text>
          </View>

          <Ionicons
            name="chevron-forward"
            color={"green"}
            size={30}
            onPress={toEditBio}
          />
        </View>
      </View>

      {/* options */}
      <View style={styles.optionContainer}>
        <View style={styles.optionIconWithName}>
          <Ionicons name="cash-outline" size={30} />
          <Text>My events</Text>
        </View>
        <Ionicons name="chevron-forward" size={30} onPress={toMyEvents} />
      </View>
      <View style={styles.optionContainer}>
        <View style={styles.optionIconWithName}>
          <Ionicons name="calendar" size={30} />
          <Text>Add event</Text>
        </View>
        <Ionicons name="chevron-forward" size={30} onPress={toAddEvent} />
      </View>
      <View style={styles.optionContainer}>
        <View style={styles.optionIconWithName}>
          <Ionicons name="information-circle-outline" size={30} />
          <Text>About us</Text>
        </View>
        <Ionicons name="chevron-forward" size={30} onPress={toAddEvent} />
      </View>

      {/* <View style={styles.profileDataContainer}>
        <View style={styles.ProfileImageContainer}></View>
        <Text style={styles.NameText}>Subramanyeshwara prasad</Text>
        <Text style={styles.mailText}>Subramanyeshwara@gmail.com</Text>
        <TouchableOpacity onPress={toEditBio} style={styles.BtnContainer}>
          <Text style={styles.SplashButton}>Edit Bio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toAddEvent} style={styles.BtnContainer}>
          <Text style={styles.SplashButton}>Add Event</Text>
        </TouchableOpacity>
      </View> */}
      <View></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logOutButtonContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 25,
  },
  EditProfileView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  EditProfileContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0001",
    padding: 20,
    marginVertical: 10,
    gap: 15,
  },
  ProfileImage: {
    width: 70,
    height: 70,
    objectFit: "cover",
    borderRadius: 100,
  },
  nameMailCOntainer: {
    flexGrow: 1,
    flexDirection: "column",
  },
  NameText: {
    fontSize: 14,
    fontWeight: "bold",
    width: 150,
  },
  mailText: {
    fontSize: 10,
  },
  optionContainer: {
    marginTop: 10,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#0001",
  },
  optionIconWithName: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  profileDataContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    gap: 10,
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
