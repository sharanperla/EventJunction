import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function SignInScreen({navigation}) {
    handlePress=()=>{
        navigation.navigate("Home")
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
                  <TextInput  style={styles.inputStyle} placeholder='enter email'/>
                  <TextInput  style={styles.inputStyle} placeholder='enter password'/>
                  <Text style={styles.SplashButton} onPress={handlePress}>Login</Text>
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
