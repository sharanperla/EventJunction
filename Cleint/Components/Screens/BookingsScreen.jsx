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
      // console.log(myEvents)
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
             {myUpcoming&&<View><ImageBackground resizeMode='cover'
             source={{ uri: myUpcoming.EventImage?  myUpcoming.EventImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOoU11lhsr7WFgMFxqYTLCo9cYSQtnE5NzYhLw1aFx_A&s" }}
             style={styles.LatestBackground} >

             <View style={styles.innerView}>
              <View style={styles.overLay}/>
             <Text style={styles.title}>{myUpcoming.eventName}</Text>
             <Text style={styles.brief}>{myUpcoming.eventGenere} | {myUpcoming.eDate?myUpcoming.eDate.substring(0,10):' '} | Time</Text>
             <Text numberOfLines={2} style={styles.Desc}>{myUpcoming.eventDesc}</Text>
             </View>
             </ImageBackground>
             
             </View>}
        </View>
       <Slider2 data={myEvents} name={"This Week"}/>
       <Slider2 data={myEvents} name={"Others"}/>
  
       </ScrollView>
      </SafeAreaView>
    )
  
}

const styles=StyleSheet.create({
  MainContainer:{

  },
  LatestContainer:{
    width:'100%',
    height:350,
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
    marginVertical:5,
    fontWeight:'bold',
},
overLay:{
  borderRadius:20,
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0,0,0,0.7)', 
  // Semi-transparent black color
},
title:{
  color:'white',
    fontSize:20,
    fontWeight:'bold'
},
brief:{
    color:'white',
    fontSize:9,
    opacity:0.9,
    gap:8
},
innerView:{
paddingHorizontal:7,
paddingVertical:5,
margin:5,
},
Desc:{
 color:'white',
 fontSize:9
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