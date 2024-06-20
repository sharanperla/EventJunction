import React ,{useState,useEffect, useContext} from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../utils/Header'
import HomeCourosel from '../utils/HomeCourosel';
import Slider1 from '../utils/Slider1';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';



function HomeScreen({navigation}) {

  const {userData,setUserData}=useContext(AuthContext);
  const [newUserData,setNewUserData]=useState({});

  // const getUserData=async ()=>{
  //   try {
  //     // setGetEventsError(false)
  //     const res=await fetch(`http://192.168.43.4:3000/api/user/getUserData/${userData.user._id}`)
     
  //     const data=await res.json();
  //     if(data.success===false)
  //     {
      
  //       // setGetEventsError(true)
  //       console.log(data);
  //       return;
  //     }
  //     setUserData({user:data[0]})

  //     // console.log(allEvents)
  //   } catch (error) {
  //     // setGetEventsError(true)
  //     console.log(error)
  //   }
    
  // }
  
  
  useEffect(() => {
    console.log(userData.user.interests.length)
    if (!userData.user.interests || userData.user.interests.length === 0) {
      navigation.navigate('Interests');
      return 
    }
  }, []);
  
  const [getEventsError,setGetEventsError]=useState(false);
  const [allEvents,setAllEvents]=useState(false);
  const [danceEvents,setDanceEvents]=useState({});
  const [musicEvents,setMusicEvents]=useState({});
  const [interestedEvents,setInterestedEvents]=useState([]);
  const [loading,setLoading]=useState(false)
  
  //allEvents
  

  const getEvents=async ()=>{
    try {
      setLoading(true)
      setGetEventsError(false)
      const res=await fetch(`http://192.168.43.4:3000/api/event/getEvents`)
     
      const data=await res.json();
      if(data.success===false)
      {
        setLoading(false)
        setGetEventsError(true)

        return;
      }
      setAllEvents(data)
      setLoading(false)
      // console.log(allEvents)
    } catch (error) {
      setLoading(false)
      setGetEventsError(true)
    }
    
  }

  useEffect(() => {

    getEvents();
    getDanceEvents();
    getInterestEevents();
    getMusicEvents()
 
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getEvents();
    getDanceEvents();
    getInterestEevents()
    getMusicEvents()
    if (!userData.user.interests || userData.user.interests.length === 0) {
      navigation.navigate('Interests');
      return 
    }

    }, [])
  );
  //genere=dance
  const getDanceEvents=async ()=>{
    try {
      setLoading(true)
      setGetEventsError(false)
      const res=await fetch(`http://192.168.43.4:3000/api/event/getEvents?genre=Dance`)
     
      const data=await res.json();
      if(data.success===false)
      {
        setLoading(false)
        setGetEventsError(true)
        return;
      }
      setDanceEvents(data)
      setLoading(false)
      // console.log(allEvents)
    } catch (error) {
      setLoading(false)
      setGetEventsError(true)
    }
    
  }
  const getMusicEvents=async ()=>{
    try {
      setLoading(true)
      setGetEventsError(false)
      const res=await fetch(`http://192.168.43.4:3000/api/event/getEvents?genre=Music`)
     
      const data=await res.json();
      if(data.success===false)
      {
        setLoading(false)
        setGetEventsError(true)
        return;
      }
      setLoading(false)
      setMusicEvents(data)
      
      // console.log(allEvents)
    } catch (error) {
      setLoading(false)
      setGetEventsError(true)
    }
    
  }
  const getInterestEevents=async ()=>{
    try {
      setLoading(true)
      setGetEventsError(false)
      const res=await fetch(`http://192.168.43.4:3000/api/event/getEvents?genre=${userData.user.interests}`)
     
      const data=await res.json();
      if(data.success===false)
      {
        setLoading(false)
        setGetEventsError(true)
        console.log(data)
        return;
      }
      setInterestedEvents(data)
      setLoading(false)
      console.log("interested events",interestedEvents)
      
      // console.log(allEvents)
    } catch (error) {
      setLoading(false)
      setGetEventsError(true)
      console.log(error)
    }
    
  }


  // console.log(allEvents)
  
  return (
    <SafeAreaView >
     {loading?<View style={styles.spinner}><ActivityIndicator size="large" color="#0000ff" /></View>:
     <ScrollView>
       <Header/>
       
       <View style={styles.container} >
       <HomeCourosel data={allEvents} />
       
       {interestedEvents.length>0&&<Slider1 data={interestedEvents} name={"Recommended"}/>}
       <Slider1 data={allEvents} name={"Special"}/>
       <Slider1 data={danceEvents} name={"Dance"}/>
       <Slider1 data={musicEvents} name={"Music"}/>

       </View>
      
       </ScrollView>
     }
    </SafeAreaView>
  )
}

export default HomeScreen

const styles=StyleSheet.create({
  container:{
    paddingVertical:20,
  },
  spinner:{
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }
  
});

