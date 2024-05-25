import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Slider1 from './Slider1';

export function SearchBody({searchTerm})  {
    const [fetchError,setFetchError]=useState(false);
    const [searchEvents,setSearchEvents]=useState({});
    const getSearchEvents=async ()=>{
        try {
            setFetchError(false)
          const res=await fetch(`http://192.168.43.4:3000/api/event/getEvents?searchTerm=${searchTerm}`)
         
          const data=await res.json();
          if(data.success===false)
          {
          
            setFetchError(true)
            return;
          }
          setSearchEvents(data)
          // console.log(allEvents)
        } catch (error) {
            setFetchError(true)
        }
        
      }
      
      useEffect(() => {
          getSearchEvents();
          return () => {
              
        }
    }, [searchTerm])
    

    return (
      <View>
     
        {searchEvents.length!==0 ? <Slider1 data={searchEvents} name={"Search Results"}/> : <View style={Styles.noResults}><Text >oops! no results found </Text></View> }
      </View>
    )
  }


export default SearchBody

const Styles=StyleSheet.create({
    noResults:{
        justifyContent:'center',
        alignItems:'center',
    }
})
