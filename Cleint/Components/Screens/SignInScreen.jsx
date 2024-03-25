import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice';

function SignInScreen({navigation}) {
  const [formData, setFormData] = useState({});
  const {loading,error}=useSelector((state)=>state.user)
  const dispatch=useDispatch();


     const handleChange=(key,value)=>{
      setFormData({
        ...formData,
        [key]: value,
      });
     }
    handlePress= async(e)=>{
      try {
        dispatch(signInStart())
        e.preventDefault();
        const res=await fetch('http://192.168.43.4:3000/api/auth/signin',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
    },
          body: JSON.stringify(formData),
    
        });

        const data=await res.json();
        if(data.success===false)
        {
          dispatch(signInFailure(data.message));
          return;
        }
       dispatch(signInSuccess(data));
        navigation.navigate("Home");
        
      } catch (error) {
        dispatch(signInFailure(error.message))
      }
       
    }

navigateToSignUp=()=>{
    navigation.navigate("SignUp")
}
  return (
    <SafeAreaView>
        <View style={styles.container}>
    <View>

    </View>
      <View style={styles.BtnContainer}>
                  <TextInput  style={styles.inputStyle} placeholder='enter email' onChangeText={(text) => handleChange("email", text)} />
                  <TextInput  style={styles.inputStyle} placeholder='enter password' onChangeText={(text) => handleChange("password", text)} />
                  <Text style={styles.SplashButton} onPress={handlePress}>Login</Text>
                <Text style={styles.errorMsg}>{error? error:''}</Text>
                </View>
    <View>
        <Text>Dont have an acount?<Text onPress={navigateToSignUp} style={styles.HighText}>signup</Text></Text>
    </View>
      </View>
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
    container:{
        height:'100%',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:20,
    },
    BtnContainer:{
       display:'flex',
       gap:10,

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
      inputStyle:{
        width: 300,
        paddingHorizontal: 11,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth:1,
      },
      HighText:{
color:'#1976D2',
fontWeight:'bold',
fontSize:15,
      }
});
