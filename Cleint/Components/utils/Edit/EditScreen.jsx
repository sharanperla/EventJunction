import { AuthContext } from "../../../Context/AuthContext.js";
import { EventContext } from "../../../Context/EventContext.js";
import React, { useContext, useEffect, useState } from "react";
import { Button, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Platform, ScrollView, Pressable, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import RNPickerSelect from "react-native-picker-select";

import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../../fireBase/firebase.config.jsx';

export default function EditScreen({ route, navigation }) {
  const data = route.params.data;
  console.log(data._id);
  const { isEventLoading, setIsEventLoading, eventData, globalError, editEventStart, editEventSuccess, editEventFailure } = useContext(EventContext);
  const { userData } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileperc, setFileperc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({ ...data });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locPermission, setLocPermission] = useState();
  const [fileUploadActive, setFileUploadActive] = useState(false)
  const [success, setSuccess] = useState(false)

  let cordinates = {
    longitude: formData?.eventLocation?.coordinates ? formData.eventLocation.coordinates[0] : null,
    latitude: formData?.eventLocation?.coordinates ? formData.eventLocation.coordinates[1] : null,
  };

  useEffect(() => {
    if (selectedLocation) {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${selectedLocation.latitude}&lon=${selectedLocation.longitude}&format=json`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setPlace(data?.display_name);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedLocation]);

  const handleMapPress
  = (event) => {
    const newLocation = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    setSelectedLocation(newLocation);
    setFormData((prevFormData) => ({
      ...prevFormData,
      eventLocation: newLocation,
    }));
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocPermission(location);
    })();
  }, []);

  const validateForm = () => {
    const requiredFields = ["eventName", "eventDesc", "eDate", "eventGenere", "eventAmount"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return `The field ${field} is required.`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      eDate: formData.eDate ? formData.eDate.dateString : null,
      eventAmount: formData.eventAmount ? formData.eventAmount : null,
      eventDesc: formData.eventDesc ? formData.eventDesc : null,
      eventGenere: formData.eventGenere ? formData.eventGenere : null,
      eventName: formData.eventName ? formData.eventName : null,
      place: formData.place ? formData.place : "Location not selected",
      eventLocation: formData.eventLocation ? {
        type: "Point",
        coordinates: [formData.eventLocation.longitude, formData.eventLocation.latitude],
      } : null,
      EventImage: formData.EventImage ? formData.EventImage : "",
    };

    try {
      setSuccess(false);
      editEventStart();
      const res = await fetch(`http://192.168.43.4:3000/api/event/updateEvent/${data._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const responseData = await res.json();

        if (responseData.success === false) {
          editEventFailure(responseData.message);
          console.log('Error at success', responseData);
          return;
        }

        // Update the formData state with the updated event data from the server
        setFormData(responseData?.data); // Assuming responseData contains the updated event data
        console.log("Form data submitted:", responseData);
        setSuccess(true);
        editEventSuccess(responseData.data);
      } else {
        const text = await res.text();
        setSuccess(false);
        console.error('Unexpected response format:', text);
        editEventFailure('Unexpected response format');
      }
    } catch (error) {
      setSuccess(false);
      console.log(error);
      editEventFailure(error.message);
    }
  };

  const uploadImage = async (selectedImage) => {
    try {
      setFileUploadActive(true);
      if (!selectedImage) {
        console.log('No file selected');
        setFileUploadActive(false);
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + userData.user.username;
      const storageRef = ref(storage, fileName);

      const response = await fetch(selectedImage.uri);
      const blob = await response.blob();

      // Upload the blob to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileperc(Math.round(progress));
        },
        (error) => {
          setFileUploadError(true);
          console.error('Error uploading:', error);
          setFileUploadActive(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
            console.log('File uploaded successfully:', downloadurl);
            setFormData((prevFormData) => ({
              ...prevFormData,
              EventImage: downloadurl,
            }));
            setFileUploadActive(false);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      uploadImage(selectedImage);
    }
  }, [selectedImage]);


  return (
    <ScrollView>
      <ScrollView horizontal={true} contentContainerStyle={styles.Container}>
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.Container}>
          <Pressable onPress={pickImage} style={styles.ImageContainer}>
          <Image
            style={styles.EventImage}
            source={{
              uri:formData.EventImage?formData.EventImage : "https://us.123rf.com/450wm/alextanya123rf/alextanya123rf1605/alextanya123rf160500117/56416894-black-and-white-vector-plus-sign-plus-size-icon-plus-logo-plus-symbol-design-element-addition-button.jpg",
            }}
          />
          </Pressable>
          <View style={styles.ImageUpload}>
          {fileUploadError?(<Text style={styles.uploadFailureText}>Error in uploading image(size should be less than 2mb)</Text>) :fileperc > 0 && fileperc <100 ? (<Text >{`uploading ${fileperc}%`}</Text>) : fileperc===100?(<Text style={styles.uploadSuccessText}>Succesfully uploaded</Text>) : ''}
        </View>
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
              numberOfLines={4}
              onChangeText={(value) => handleChange("eventDesc", value)}
              value={formData.eventDesc ? formData.eventDesc : ""}
              placeholder="Enter description text here..."
            />

            <TouchableOpacity style={styles.CalinputStyle} onPress={toggleModal}>
              <TextInput placeholder="Select date" value={formData.eDate ? formData.eDate : ""} />
              <Ionicons name="calendar" size={30} />
              <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Calendar
                    onDayPress={(value) => handleChange("eDate", value)}
                    markedDates={formData.eDate ? { [formData.eDate]: { selected: true } } : {}}
                  />
                </View>
              </Modal>
            </TouchableOpacity>
            <View style={styles.placeContainer}>
              <TextInput style={styles.PlaceinputStyle} placeholder={formData.place ? formData.place : "Place"} />
              <TouchableOpacity style={styles.mapButton} onPress={toggleMap}>
                <Ionicons name="location-outline" size={30} />
                <Modal isVisible={isMapVisible} onBackdropPress={toggleModal}>
                  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <MapView
                      style={{ width: 300, height: 300 }}
                      onPress={handleMapPress}
                      initialRegion={{
                        latitude: cordinates ? cordinates.latitude : 37.78825,
                        longitude: cordinates ? cordinates.longitude : -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                    >
                      {selectedLocation&&<Marker coordinate={selectedLocation}/>}
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
                  { label: "Music", value: "Music" },
                  { label: "Art", value: "Art" },
                  { label: "Dance", value: "Dance" },
                  { label: "Drama", value: "Drama" },
                  { label: "Sports", value: "Sports" },
                  { label: "Other", value: "Other" },
                ]}
                value={formData.eventGenere ? formData.eventGenere : ""}
              />
            </View>

            <View>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Price amount in INR"
                keyboardType="numeric"
                onChangeText={(value) => handleChange("eventAmount", value)}
                value={formData.eventAmount?formData.eventAmount.toString():""}
              />
            </View>
            <Pressable onPress={handleSubmit} disabled={isEventLoading}>
              <Text style={styles.SplashButton}>{isEventLoading? "loading...":"Update"}</Text>
            </Pressable>
            <Text style={styles.error}>{globalError?globalError:""}</Text>
            <Text style={styles.success}>{success?"successfully updated":""}</Text>
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
  error:{
    color:'red',
    fontSize:16,
    
  },
  success:{
    color:'green',
    fontSize:16,
    
  },
  ImageContainer:{
    
    width:300,
    height:150,
    margin:10,
    borderRadius:40,
    backgroundColor:'white',
    overflow:'hidden',
  

  },
  EventImage:{
    width:'100%',
    height:'100%',
    objectFit:'contain'
  },
  uploadFailureText:{
    color:'red',
  },
  uploadSuccessText:{
    color:'green',
  },
  ImageUpload:{
   padding:10,
  },

});
