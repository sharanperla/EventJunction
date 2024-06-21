import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider2 from '../utils/Slider2'
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../Context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';


export default function BookingsScreen() {
  const {userData}=useContext(AuthContext)
  const [getEventsError,setGetEventsError]=useState(false);
  const [myEvents,setMyEvents]=useState({});
  const [myUpcoming,setMyUpcoming]=useState({});
  useFocusEffect(
    React.useCallback(() => {
      getEvents();
    getUpcoming();
 
    }, [])
  );

  const getEvents=async ()=>{
    try {
      setGetEventsError(false)
      const res=await fetch(`http://192.168.43.4:3000/api/event/getUserEvents?id=${userData.user._id}&limit=${10}&skip=1`)
     
      const data=await res.json();
      if(data.success===false)
      {
      
        setGetEventsError(true)
        return;
      }
      setMyEvents(data.data)
      console.log(myEvents)
    } catch (error) {
      setGetEventsError(true)
    }
    
  }
  const getUpcoming=async ()=>{
    try {
      setGetEventsError(false)
      const res=await fetch(`http://192.168.43.4:3000/api/event/getUserEvents?id=${userData.user._id}&limit=${1}`)
     
      const data=await res.json();
      if(data.success===false)
      {
      
        setGetEventsError(true)
        console.log(data);
        return;
      }
      setMyUpcoming(data.data[0])
    } catch (error) {
      setGetEventsError(true)
      console.log(error);
    }
    
  }


  useEffect(() => {
    getEvents();
    getUpcoming()
  }, [])


    return (
      <SafeAreaView>
        <ScrollView style={styles.MainContainer}>
        <View style={styles.LatestContainer}>
          <Text style={styles.CategoryTitle}>Upcoming</Text>
             {myUpcoming&&<ImageBackground resizeMode='cover'
             source={{ uri: myUpcoming.EventImage?  myUpcoming.EventImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOoU11lhsr7WFgMFxqYTLCo9cYSQtnE5NzYhLw1aFx_A&s" }}
             style={styles.LatestBackground} >
             <View style={styles.overLay}></View>
             <View style={styles.innerView}>
             <Text style={styles.title}>{myUpcoming.eventName}</Text>
             <Text style={styles.brief}>{myUpcoming.eventGenere} || {myUpcoming.eDate?myUpcoming.eDate.substring(0,10):' '} || Time</Text>
             <Text numberOfLines={2} style={styles.Desc}>{myUpcoming.eventDesc}</Text>

             </View>
             </ImageBackground>}
        </View>
       <Slider2 data={myEvents} name={"This Week"}/>
       <Slider2 data={myEvents} name={"Others"}/>
  
       </ScrollView>
      </SafeAreaView>
    )
  
}

const styles=StyleSheet.create({
  MainContainer:{
    height:'100%'
  },
  LatestContainer:{
    width:'100%',
    height:400,
    padding:20,
    marginBottom:10,

  },
  LatestBackground:{
    width:'100%',
    height:'100%',
    justifyContent:'flex-end',
    borderRadius:10,
    overflow:'hidden',
  
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
paddingHorizontal:10,
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