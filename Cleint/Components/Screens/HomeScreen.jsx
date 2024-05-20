import React ,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../utils/Header'
import HomeCourosel from '../utils/HomeCourosel';




function HomeScreen() {


 


  const [getEventsError,setGetEventsError]=useState(false);
  const [allEvents,setAllEvents]=useState(false);

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
      setAllEvents(data)
      // console.log(allEvents)
    } catch (error) {
      setGetEventsError(true)
    }
    
  }

  useEffect(() => {
    getEvents();
  }, [])
  
  return (
    <SafeAreaView >
       <Header/>
       <View style={styles.container}>
       <HomeCourosel data={allEvents}/>

       </View>
      


    </SafeAreaView>
  )
}

export default HomeScreen

const styles=StyleSheet.create({
  container:{
    padding:20,
  }
});

