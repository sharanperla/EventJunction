import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider2 from '../utils/Slider2'
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../Context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';


export default function BookingsScreen() {
  const {userData}=useContext(AuthContext)
  const [getEventsError,setGetEventsError]=useState(false);
  // const [myEvents,setMyEvents]=useState([]);
  // const [myUpcoming,setMyUpcoming]=useState([]);
  // const [weekEvent,setWeekEvent]=useState([])
  const [myEvents,setMyEvents]=useState(null);
  const [myUpcoming,setMyUpcoming]=useState(null);
  const [weekEvent,setWeekEvent]=useState(null)
  const [pageLoading,setPageLoading]=useState(false)
  useFocusEffect(
    React.useCallback(() => {
      getEvents();
    getUpcoming();
    getWeekEvent()
    }, [])
  );

  const getEvents=async ()=>{
    try {
      setPageLoading(true)
      setGetEventsError(false)
      console.log((userData.user._id));
      const res=await fetch(`http://192.168.43.4:3000/api/event/getUserEvents?id=${userData.user._id}&limit=${10}`)
     
      const data=await res.json();
      if(data.success===false)
      {
        setPageLoading(false)
        setGetEventsError(data)
        return;
      }
      setPageLoading(false)
      setMyEvents(data?.data)
      console.log('all',data);
      // console.log(myEvents)
    } catch (error) {
      setPageLoading(false)
      setGetEventsError(error)
    }
    
  }
  const getUpcoming=async ()=>{
    try {
      setPageLoading(true)
      setGetEventsError(false)
      const res=await fetch(`http://192.168.43.4:3000/api/event/getUserEvents?id=${userData.user._id}&limit=${1}`)
     
      const data=await res.json();
      if(data.status!=="success")
      {
        setPageLoading(false)
        setGetEventsError(data)
        console.log('inside upcoing',data);
        return;
      }
      setPageLoading(false)
      setMyUpcoming(data?.data[0])
      // console.log('upcoming',data.data[0]);

      console.log(data);
    } catch (error) {
      setPageLoading(false)
      setGetEventsError(error)
      console.log(error);
    }
    
  }
  const getWeekEvent=async ()=>{
    try {
      setPageLoading(true)
      setGetEventsError(false)
      const res=await fetch(`http://192.168.43.4:3000/api/event/getUserEvents?id=${userData.user._id}&thisweek=${true}`)
     
      const data=await res.json();
      if(data.status!=="success")
      {
        setPageLoading(false)
        setGetEventsError(data)
        console.log('week',data);
        return;
      }
      setPageLoading(false)
      setWeekEvent(data?.data)
      console.log('week events',data);
    } catch (error) {
      setPageLoading(false)
      setGetEventsError(error)
      console.log(error);
    }
    
  }


  useEffect(() => {
    getEvents();
    getUpcoming()
    getWeekEvent()
  }, [])

    return (
      <SafeAreaView>
        <ScrollView style={styles.MainContainer}>
          {pageLoading&& <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>}
        {!pageLoading&&myUpcoming!==null&&<View style={styles.LatestContainer}>
          <Text style={styles.CategoryTitle}>Upcoming</Text>
             <View><ImageBackground
              ImageBackground resizeMode='cover'
             source={{ uri: myUpcoming.EventImage?  myUpcoming.EventImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOoU11lhsr7WFgMFxqYTLCo9cYSQtnE5NzYhLw1aFx_A&s" }}
             style={styles.LatestBackground} >

             <View style={styles.innerView}>
              <View style={styles.overLay}/>
             <Text style={styles.title}>{myUpcoming.eventName}</Text>
             <Text style={styles.brief}>{myUpcoming.eventGenere} | {myUpcoming.eDate?myUpcoming.eDate.substring(0,10):' '} | Time</Text>
             <Text numberOfLines={2} style={styles.Desc}>{myUpcoming.eventDesc}</Text>
             </View>
             </ImageBackground>
             
             </View>
        </View>}
      {  console.log("error here",getEventsError)}
        {getEventsError&&<View style={styles.notFoundContainer}>
          <Image style={styles.illlustration} source={require("../../assets/illustrations/bookingnotfound.png")} size={5} />
          <Text style={styles.error}>{`No booked events!`}</Text>
          </View>}
       {weekEvent&&weekEvent.length>0&&<Slider2 data={weekEvent} name={"This Week"}/>}
       {myEvents&&myEvents?.length>0&&<Slider2 data={myEvents} name={"Others"}/>}
  
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
},
error:{
  color:'black',
  fontSize:18,
  textAlign:'center',
  marginVertical:5

},
spinner: {
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
},
illlustration:{
  width:300,
  height:300,
  objectFit:'contain',
  borderRadius:10,
},
notFoundContainer:{
  width:'100%',
  height:'100%',
  justifyContent:'center',
  alignItems:'center',
  marginVertical:90,
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