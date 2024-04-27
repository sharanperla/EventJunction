import React, { Component, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
// import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function AddEvent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState(null);


  const [locPermission,setLocPermission]=useState();

  //map configurations
  const handleMapPress = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };
  const handleConfirmLocation = () => {
    // Do something with the selected location
    console.log(selectedLocation);
  };
  const toggleMap = () => {
    setIsMapVisible(!isMapVisible);
  };


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day);
    toggleModal();
  };


  //location config
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
      
        return;
      }

      // You can now access the user's location
      const location = await Location.getCurrentPositionAsync({});
      setLocPermission(location)
      console.log('User location:', location.coords);
    })();
  }, []);


  console.log(selectedDate);
  return (
    <SafeAreaView>
      <View style={styles.Container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.DescHead}>What can be Hosted</Text>
          <Text style={styles.Hostdesc}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa eum,
            doloribus voluptatem maxime obcaecati placeat, repellat illum
            laudantium distinctio rem, quidem architecto. Tempora vero ea
            aperiam quis a animi. Earum.
          </Text>
        </View>

        <View style={styles.formContiner}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Event name"
            // onChangeText={(text) => handleChange('email', text)}
          />
          {/* <Calendar
  onDayPress={day => {
    console.log('selected day', day);
  }}
/> */}
          <TouchableOpacity style={styles.CalinputStyle} onPress={toggleModal}>
            <TextInput
              placeholder="Select date"
              value={selectedDate?selectedDate.dateString :"Select date"}
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
                  onDayPress={handleDayPress}
                  markedDates={
                    selectedDate ? { [selectedDate]: { selected: true } } : {}
                  }
                />
              </View>
            </Modal>
          </TouchableOpacity>
          <View style={styles.placeContainer}>

          <TextInput
            style={styles.PlaceinputStyle}
            placeholder="Place"
            // onChangeText={(text) => handleChange('email', text)}
          />
          <TouchableOpacity style={styles.mapButton} onPress={toggleMap}>
          <Ionicons name="location-outline" size={30} />
          <Modal isVisible={isMapVisible} onBackdropPress={toggleMap}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Calendar
                  onDayPress={handleDayPress}
                  markedDates={
                    selectedDate ? { [selectedDate]: { selected: true } } : {}
                  }
                />
              </View>
            </Modal>
          </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
          <Button
        title="Confirm Location"
        onPress={handleConfirmLocation}
        disabled={!selectedLocation}
      />
      <MapView
     style={{width:300,height:300}}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>
      
    </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    alignItems: "center",
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
  formContiner:{
    alignItems:'center',
    gap:10,
    padding:20,
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
  placeContainer:{
    width: 300,
    gap:4,
   
    flexDirection:'row'
  },
  PlaceinputStyle:{
   borderWidth:1,
   paddingHorizontal: 11,
    paddingVertical: 10,
    flex:2,
    borderRadius: 10,
  },
  mapButton:{
    flex:1,
    borderWidth:1,
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'center'
  }
});
