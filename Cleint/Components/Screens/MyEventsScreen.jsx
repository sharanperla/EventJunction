import React,{useContext,useState,useEffect} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../Context/AuthContext'


function MyEventsScreen() {

  const [showListingError,setShowListingError]=useState(false);
  const [userListing,setUserListing]=useState(false);
  const {userData}=useContext(AuthContext)
  console.log(userListing);
  const handleShowListing= async ()=>{
    try {
      setShowListingError(false)
      const res=await fetch(`http://192.168.43.4:3000/api/user/events/${userData.user._id}`)
     
      const data=await res.json();
      if(data.success===false)
      {
        console.log('in success');
        setShowListingError(true)
        return;
      }
      setUserListing(data)
    } catch (error) {
      setShowListingError(true)
    }
    
      }

      useEffect(() => {
     
        handleShowListing();
  
      }, []);
      
  return (
    <SafeAreaView style={styles.MainContainer}>
       <View >
       {userListing && (
          userListing.map((user) => ( // Destructure each user object
          <View key={user._id} style={styles.EventContainer}>
            <Image
              style={styles.EventImage}
              source={{ uri: user.EventImage || "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg" }} // Use user's avatar if available, otherwise use default
            />
            <View>
              <Text style={styles.EventName}>{user.eventName}</Text> 
              <Text>{user.place=="Location not selected"?"--":user.place}</Text> 
              <Text>{ user.eDate?user.eDate.slice(0, 10):'date'}|| {user.eDate ? new Date(user.eDate).toLocaleTimeString(): 'Time'}</Text>
            </View>
    </View>
  ))
)}

       </View>



    </SafeAreaView>
  )
}

export default MyEventsScreen

const styles=StyleSheet.create({
  MainContainer:{
     paddingHorizontal:20,
     paddingVertical:20,
  },
  EventContainer:{
     display:'flex',
     flexDirection:'row',
     justifyContent:'flex-start',
     gap:40,
     alignItems:'center',
     backgroundColor:'white',
     padding:10,
     borderRadius:10,


  },
  EventImage:{
     width:100,
     height:100,
     borderRadius:10,
     objectFit:'cover'
  },
  EventName:{
    fontSize:21,
    fontWeight:'bold',
  }
})