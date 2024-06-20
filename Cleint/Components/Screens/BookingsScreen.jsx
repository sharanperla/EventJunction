import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider2 from '../utils/Slider2'
import { ScrollView } from 'react-native-gesture-handler';


export default function BookingsScreen() {
  const [getEventsError,setGetEventsError]=useState(false);
  const [myEvents,setMyEvents]=useState(false);
  

  const getEvents=async ()=>{
    try {
      setGetEventsError(false)
      const res=await fetch(`http://192.168.43.4:3000/api/event/getEvents`)
     
      const data=await res.json();
      if(data.success===false)
      {
      
        setGetEventsError(true)
        return;
      }
      setMyEvents(data)
      // console.log(allEvents)
    } catch (error) {
      setGetEventsError(true)
    }
    
  }

  useEffect(() => {
    getEvents();
    
  }, [])


    return (
      <SafeAreaView>
        <ScrollView style={styles.MainContainer}>
        <View style={styles.LatestContainer}>
          <Text style={styles.CategoryTitle}>Upcoming</Text>
             <ImageBackground
             source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOoU11lhsr7WFgMFxqYTLCo9cYSQtnE5NzYhLw1aFx_A&s" }}
             style={styles.LatestBackground} >
             <View style={styles.overLay}></View>
             <View style={styles.innerView}>
             <Text style={styles.title}>EventName</Text>
             <Text style={styles.brief}>Genere || Date || Time</Text>
             <Text numberOfLines={2} style={styles.Desc}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptatem, labore omnis magnam ducimus quod ut ipsum odio ad deleniti totam iusto adipisci odit quasi aut commodi fugiat quae numquam.</Text>

             </View>
             </ImageBackground>
        </View>
       <Slider2 data={myEvents} name={"This Week"}/>
       <Slider2 data={myEvents} name={"Others"}/>
       <Slider2 data={myEvents} name={"My events"}/>
       </ScrollView>
      </SafeAreaView>
    )
  
}

const styles=StyleSheet.create({
  MainContainer:{
  },
  LatestContainer:{
    width:'100%',
    height:'40%',
    padding:20,
    
  },
  LatestBackground:{
    width:'100%',
    height:'95%',
    justifyContent:'flex-end',
    borderRadius:10,
    overflow:'hidden'
  },
  CategoryTitle:{
    fontSize:17,
    fontWeight:'bold',
    marginVertical:5
},
overLay:{
  position:'absolute',
  width:'100%',
  height:'100%',
  backgroundColor:'black',
  opacity:0.5,
  borderRadius:10,
  overflow:'hidden'
},
title:{
  color:'white',
    fontSize:20,
    fontWeight:'bold'
},
brief:{
    color:'white',

    fontSize:12,
    fontWeight:'bold',
    opacity:0.6
},
innerView:{
  padding:10
},
Desc:{
 color:'white',
 fontSize:14
}


})
// SliderName:{
//   color:'white',
//   fontSize:16,
//   fontWeight:'bold'
// },
// SliderPlace:{
//   color:'white',
//   fontSize:12,
// },
// CategoryTitle:{
//   fontSize:17,
//   fontWeight:'bold',
//   marginVertical:10,
//   marginLeft:20,
// }