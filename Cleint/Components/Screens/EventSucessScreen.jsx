
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



function EventSuccessScreen({navigation}) {
 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('ProfileScreen');
    }, 4000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);
  return (
    <SafeAreaView style={styles.MainContainer}>
      
       <Image style={styles.SuccessImage} source={require("../../assets/Success.png")}  />
       <Text style={styles.successText}>Whoo-hoo! 🎉</Text>

    </SafeAreaView>
  )
}

export default EventSuccessScreen;

const styles = StyleSheet.create({
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
  }
})
