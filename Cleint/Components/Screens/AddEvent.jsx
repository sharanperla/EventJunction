import React, { Component, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
// import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

export default function AddEvent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day);
    toggleModal();
  };
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
            
              <Text>
                {" "}
                <Ionicons name="calendar" size={30} />
              </Text>
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
          <View style={styles.mapButton}>
          <Ionicons name="location-outline" size={30} />
          </View>
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
