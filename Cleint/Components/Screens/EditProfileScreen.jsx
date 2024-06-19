import { Ionicons } from '@expo/vector-icons'
import React, { Component, useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, View, Image, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


//to setup firebase  go to firebase ,create storage and add rules as
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size<2 * 1024 *1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../../fireBase/firebase.config'
//instal npm install expo-image-picker
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../Context/AuthContext';
import color from '../../assets/color';


export default function EditProfileScreen({navigation}){
  const {profileUpdateStart,profileUpdateSuccess,profileUpdateFailure,userData,setUserData}=useContext(AuthContext)
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData,setFormData]=useState({})
  const [filePerc,setFileperc]=useState(null)
  const [fileUploadError,setFileUploadError]=useState(null);
  const [fileUploadActive,setFileUploadActive]=useState(false);

  // console.log(formData)

  

console.log(formData)
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
        setFormData({ ...formData, avatar: downloadurl });
        setFileUploadActive(false);
      });
    }
  );
} catch (error) {
  console.log(error)
}
};
  

  

  useEffect(()=>{
    if(selectedImage){
      uploadImage(selectedImage);
    }
  },[selectedImage]);

  

  // console.log(userData)

    // useEffect(() => {

      // const uploadImage=async ()=>{
      //  const blobImage=await new Promise((resolve,reject)=>{
      //         const xhr=new XMLHttpRequest();
      //         xhr.onload=function(){
      //           resolve(xhr.response);
      //         };
      //         xhr.onerror=function(){
      //           reject(new TypeError("Network request failed"))
      //         };
      //         xhr.responseType="blob";
      //         xhr.open("GET",selectedImage,true);
      //         xhr.send(null)
      //  })


     
  //    if(selectedImage!==null)
  //    {
  //     uploadImage();
  //    }
  
  //   return () => {
      
  //   }
  // }, [selectedImage])

    const pickImage = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setSelectedImage(result.assets[0]);
            }
      } catch (error) {
        console.error("Error picking image:", error);
      }
    };

  const handleChange = (fieldName, value) => {
    // Implement your logic to update the formData state based on the field name and value
    setFormData({ ...formData, [fieldName]: value });
  };

const handleSubmit = async (e)=>{
  try {
    e.preventDefault();
    profileUpdateStart();
    const res=await fetch(`http://192.168.43.4:3000/api/user/update/${userData.user._id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data= await res.json();
    
    if(data.success===false)
    {
      profileUpdateFailure(data.message)
      console.log('error at sucess',data)
      return

    }
    console.log("Form data submitted:");
    setUserData({
      ...userData, // Spread the existing userData object
      user: data // Update the "user" property with the new value
    });
    profileUpdateSuccess(data);

  } catch (error) {
    console.log(error);
    profileUpdateFailure(error.message)
    
  }

}


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
                uri: formData.avatar7?formData.avatar:userData.user.avatar?userData.user.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOoU11lhsr7WFgMFxqYTLCo9cYSQtnE5NzYhLw1aFx_A&s",
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
        <View style={styles.uploadData}>
          {fileUploadError?(<Text style={styles.uploadFailureText}>Error in uploading image(size should be less than 2mb)</Text>) :filePerc > 0 && filePerc <100 ? (<Text >{`uploading ${filePerc}%`}</Text>) : filePerc===100?(<Text style={styles.uploadSuccessText}>Succesfully uploaded</Text>) : ''}
        </View>
        <View style={styles.formCotainer}>
        <TextInput
            style={styles.inputStyle}
            placeholder={userData.user?userData.user.username:"username"}
            onChangeText={(text) => handleChange('username', text)}
          
          />
        <TextInput
            style={styles.inputStyle}
            placeholder={userData.user? userData.user.email :"email@gmail.com"}
            onChangeText={(text) => handleChange('email', text)}
           
          />
        <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            onChangeText={(text) => handleChange('password', text)}
          />
           <Pressable onPress={handleSubmit}>
            <Text style={styles.SplashButton} disabled={fileUploadActive}>
               Save Changes
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
        backgroundColor: color.primaryColor,
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
      },
      uploadData:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
      },
      uploadSuccessText:{
        color:"green",
      },
      uploadFailureText:{
        color:'red'
      }
})
