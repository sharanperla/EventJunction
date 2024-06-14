import { Text, View } from 'react-native'
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
        <ScrollView>
       <Slider2 data={myEvents} name={"My events"}/>
       <Slider2 data={myEvents} name={"My events"}/>
       <Slider2 data={myEvents} name={"My events"}/>
       </ScrollView>
      </SafeAreaView>
    )
  
}