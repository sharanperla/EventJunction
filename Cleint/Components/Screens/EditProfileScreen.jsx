import { Ionicons } from '@expo/vector-icons'
import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, Image, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

//instal npm install expo-image-picker
import * as ImagePicker from 'expo-image-picker';


export default function EditProfileScreen({navigation}){
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  

    return (
      <SafeAreaView>
        <View style={styles.EditNav}>
        <Ionicons name="arrow-back-outline" onPress={()=>navigation.goBack()} size={30} /> 
        <Text style={styles.EditNavText}>Edit Profile</Text>
        </View>
        <View style={styles.EditImageContainer}>
        <View style={styles.ProfileImageContainer}>
            <Image
              style={styles.ProfileImage}
              source={{
                uri: selectedImage?selectedImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOoU11lhsr7WFgMFxqYTLCo9cYSQtnE5NzYhLw1aFx_A&s",
              }}
            />
            <Ionicons
              style={styles.editButton}
              name="create"
              color={"green"}
              size={30}
              onPress={pickImage}
            />
          </View>
        </View>
        <View style={styles.formCotainer}>
        <TextInput
            style={styles.inputStyle}
            placeholder="username"
            onChangeText={(text) => handleChange("username", text)}
          />
        <TextInput
            style={styles.inputStyle}
            placeholder="email@gmail.com"
            onChangeText={(text) => handleChange("username", text)}
          />
        <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            onChangeText={(text) => handleChange("username", text)}
          />
           <Pressable>
            <Text style={styles.SplashButton}>
               update
            </Text>
          </Pressable>
        </View>
       
      </SafeAreaView>
    )
  
}

const styles = StyleSheet.create({
    EditNav:{
       display:'flex',
       flexDirection:'row',
       padding:10,
       gap:10,

    },
    EditNavText:{
        fontSize:19,
        

    },
    EditImageContainer:{
           alignItems:'center'
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
    
      editButton: {
        position: "absolute",
        top: 0,
        right: 0,
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
      formCotainer:{
        alignItems:'center',
        gap:10,
        padding:20,
      }
})
