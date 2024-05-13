import React, { Component, useEffect, useState } from "react";
import { Button, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View ,Platform, ScrollView, Pressable,} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
// import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import RNPickerSelect from "react-native-picker-select";

// import Geolocation from "@react-native-community/geolocation";

export default function AddEvent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [place, setPlace] = useState();
  const [ename, setEname] = useState(null);
  const [genere, setGenere] = useState(null);
  const [amount, setAmount] = useState(null);

  const [formData, setFormData] = useState({});

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [locPermission, setLocPermission] = useState();

  console.log("loc", selectedLocation);
  console.log("user", locPermission);
  //points to location

  useEffect(() => {
    if (selectedLocation) {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${selectedLocation.latitude}&lon=${selectedLocation.longitude}&format=json`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Parse and handle the response data
          console.log("Address:", data);
          setPlace(data.display_name);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      return () => {};
    }
  }, [selectedLocation]);

  //map configurations
  const handleMapPress = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const toggleMap = () => {
    setIsMapVisible(!isMapVisible);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleChange = (key, value) => {
    if (key === "eDate") {
      toggleModal();
    }
    if (key === "eventLocation") {
      toggleMap();
    }
    setFormData({
      ...formData,
      [key]: value,
    });
    console.log("formDAta", formData);
  };

  //location config
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");

        return;
      }

      // You can now access the user's location
      const location = await Location.getCurrentPositionAsync({});
      setLocPermission(location);
      console.log("User location:", location.coords);
    })();
  }, []);

  return (
    <ScrollView >
      <ScrollView horizontal={true} contentContainerStyle={styles.Container}>
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={styles.Container}>
        {/* <View style={styles.descriptionContainer}>
          <Text style={styles.DescHead}>What can be Hosted</Text>
          <Text style={styles.Hostdesc}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa eum,
            doloribus voluptatem maxime obcaecati placeat, repellat illum
            laudantium distinctio rem, quidem architecto. Tempora vero ea
            aperiam quis a animi. Earum.
          </Text>
        </View> */}

        <View style={styles.formContiner}>
     
          <TextInput
            style={styles.inputStyle}
            placeholder="Event name"
            onChangeText={(value) => handleChange("eventName", value)}
            value={formData.eventName ? formData.eventName : ""}
          />
          <TextInput
            style={styles.inputStyle}
            multiline
            numberOfLines={4} // Set the number of lines you want to display initially
            onChangeText={(value) => handleChange("eventDesc", value)}
            // onChangeText={setText}
            value={formData.eventDesc ? formData.eventDesc : ""}
            placeholder="Enter description text here..."
          />
        
          <TouchableOpacity style={styles.CalinputStyle} onPress={toggleModal}>
            <TextInput
              placeholder="Select date"
              value={formData.eDate ? formData.eDate.dateString : ""}
              // onChangeText={(text) => handleChange('email', text)}
            />

            <Ionicons name="calendar" size={30} />

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Calendar
                  onDayPress={(value) => handleChange("eDate", value)}
                  markedDates={
                    formData.eDate
                      ? { [formData.eDate]: { selected: true } }
                      : {}
                  }
                />
              </View>
            </Modal>
          </TouchableOpacity>
          <View style={styles.placeContainer}>
            <TextInput
              style={styles.PlaceinputStyle}
              placeholder={place ? place : "Place"}
            />
            <TouchableOpacity style={styles.mapButton} onPress={toggleMap}>
              <Ionicons name="location-outline" size={30} />
              <Modal isVisible={isMapVisible} onBackdropPress={toggleMap}>
                {/* <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Calendar
                    onDayPress={}
                    markedDates={
                      selectedDate ? { [selectedDate]: { selected: true } } : {}
                    }
                  />
                </View> */}
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapView
                    style={{ width: 300, height: 300 }}
                    onPress={handleMapPress}
                    initialRegion={{
                      latitude: locPermission
                        ? locPermission.coords.latitude
                        : 37.78825,
                      longitude: locPermission
                        ? locPermission.coords.longitude
                        : -122.4324,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    {selectedLocation && (
                      <Marker coordinate={selectedLocation} />
                    )}
                  </MapView>
                  <Button
                    title="Confirm Location"
                    onPress={() => {
                      handleChange("eventLocation", selectedLocation);
                      handleChange("place", place);
                    }}
                    disabled={!selectedLocation}
                  />
                </View>
              </Modal>
            </TouchableOpacity>
          </View>
          <View style={styles.RNPStyle}>
            <RNPickerSelect
              placeholder={{ label: "Select an option...", value: null }}
              onValueChange={(value) => handleChange("eventGenere", value)}
              items={[
                { label: "Comedy", value: "Comedy" },
                { label: "Dance", value: "Dance" },
                { label: "Dj", value: "DJ" },
              ]}
              value={formData.eventGenere ? formData.eventGenere : ""}
            />
          </View>

          <View>
           
            <TextInput
              style={styles.inputStyle}
              keyboardType="numeric"
              onValueChange={(value) => handleChange("eventAmount", value)}
              value={formData.eventAmount ? formData.eventAmount : ""}
              placeholder="Enter Price amount in INR"
              />
             
          </View>
         <Pressable onPress={handleSubmit}>

        <Text style={styles.SplashButton} >Create</Text>
         </Pressable>
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop:50,
  },
  descriptionContainer: {
    flexGrow: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },
  Hostdesc: {
    width: 290,
    textAlign: "center",
    fontSize: 16,
    color: "black",
    padding: 10,
  },
  DescHead: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputStyle: {
    width: 300,
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  formContiner: {

    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal:30
  

    
  },
  CalinputStyle: {
    width: 300,
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeContainer: {
    width: 300,
    gap: 4,
    flexDirection: "row",
  },
  PlaceinputStyle: {
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 10,
    flex: 2,
    borderRadius: 10,
  },
  mapButton: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  RNPStyle: {
    width: 300,
    paddingHorizontal: 11,
    paddingVertical: 0,
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
});
