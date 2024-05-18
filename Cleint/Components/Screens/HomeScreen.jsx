import React ,{useState,useEffect} from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../utils/Header'


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
      console.log(allEvents)
    } catch (error) {
      setGetEventsError(true)
    }
    
  }

  useEffect(() => {
    getEvents
  }, [])
  
  return (
    <SafeAreaView>
       <Header/>
      


    </SafeAreaView>
  )
}

export default HomeScreen
