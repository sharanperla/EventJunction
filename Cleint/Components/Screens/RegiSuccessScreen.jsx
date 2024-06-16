import React, { Component, useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RegistrationReceipt from '../utils/RegisterationReciept'
import { AuthContext } from '../../Context/AuthContext'

const  RegiSuccessScreen= ({route,navigation})=> {
    const {userData}=useContext(AuthContext)
    const [display,setDisplay]=useState(false);
    const data=route?.params.eventData;
    const data2=route;
    console.log(data2)
    useEffect(() => {
        const timer = setTimeout(() => {
          setDisplay(true)
        }, 2000);
    
        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
      }, []);
    return (
   <>
        {!display&&<SafeAreaView style={styles.MainContainer}>
            <Image style={styles.SuccessImage} source={require("../../assets/Success.png")}  />
             <Text style={styles.successText}>Whoo-hoo! 🎉</Text>
            </SafeAreaView>}
        {display&&<View style={styles.container}>
        <View style={styles.reciept}>
      <Text style={styles.title}>Registration Receipt</Text>
      <View style={styles.item}>
        <Text style={styles.label}>Event Name:</Text>
        <Text style={styles.value}>{data.eventName}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{userData.user.username}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>{data.eventAmount} ₹</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Place:</Text>
        <Text style={styles.value}>{data.place}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{new Date(data.eDate).toLocaleDateString()}</Text>
      </View> 
      </View>
      <Text style={styles.SplashButton} onPress={()=>navigation.navigate("HomeScreen")}>Home</Text>
      </View>}
      </>
  
    )
  
}

export default RegiSuccessScreen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D9D9D9',
    },
    reciept:{
     justifyContent:"center",
     width:'100%',
     backgroundColor:'white',
     padding:10,
     borderRadius:10
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign:'center'
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    label: {
      fontSize: 18,
      fontWeight: '600',
    },
    value: {
      fontSize: 18,
    },
    MainContainer:{
        justifyContent:'center',
        alignItems:'center'
     },
     SuccessImage:{
         width:'70%',
         height:'70%',
         borderRadius:10,
     },
     successText:{
       fontSize:30,
       fontWeight:'bold',
     },
     SplashButton: {
        marginVertical:10,
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
  
