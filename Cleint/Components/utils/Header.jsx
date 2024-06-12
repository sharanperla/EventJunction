import {
  Image,
  RootTagContext,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Component, useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../Context/AuthContext";
import SearchBody from "./SearchBody";
import color from "../../assets/color";

export default function Header() {
  const [searchTerm, setSerchTerm] = useState();
  const [data, setdata] = useState();
  const handleChange = (key, value) => {
    setdata(value);
  };
  const handleSearch = () => {
    setSerchTerm(data);
  };
  const { userData } = useContext(AuthContext);

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.searchbarContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 9,
            }}
          >
            <Image
              style={styles.logoimage}
              source={require("../../assets/EJBlack.png")}
            />
            <Text style={styles.absText}>Event Junction</Text>
          </View>
          <View style={styles.group1}>
            {/* <Text style={styles.absText}>
              Hi {userData && userData.user.username}!
            </Text> */}
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="search..."
                onChangeText={(text) => handleChange("searchTerm", text)}
                style={styles.TextInput}
              />

              <Ionicons
                style={styles.searchIconContainer}
                onPress={handleSearch}
                size={30}
                name="search"
              />
            </View>
          </View>
        </View>
      </View>
      {searchTerm && (
        <View>
          <SearchBody searchTerm={searchTerm} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // borderBottomLeftRadius: 40,
    // borderBottomRightRadius: 40,
    paddingBottom: 20,
    display: "flex",
    backgroundColor: color.primarycolor,
    gap: 25,
  },
  logoimage: {
    width: 50,
    height: 50,
  },
  searchContainer: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 3,
    flexDirection: "row",
    gap: 10,
    paddingVertical: 5,
    paddingRight: 5,
    paddingLeft: 10,
    alignItems: "center",
    fontSize: 17,
  },
  placeHolder: {
    alignItems: "center",
  },
  group1: {
    position: "relative",
  },
  absText: {
    // position: "absolute",
    // top: 0,
    // right: 0,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  TextInput: {
    width: "85%",
  },
  searchbarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchIconContainer: {
    backgroundColor: "#f2f2f2",
    padding: 5,
    borderRadius: 5,
  },
});
