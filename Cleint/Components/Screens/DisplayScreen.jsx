import { Ionicons } from "@expo/vector-icons";
import React, { Component, useContext, useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../Context/AuthContext";
import { Colors } from "react-native/Libraries/NewAppScreen";
import color from "../../assets/color";

const DisplayScreen = ({route,navigation}) => {
  const {userData}=useContext(AuthContext)
  // const [newEventData,setNewEventData]=useState(null);
  
  
  const eventData = route.params?.data;
  
  if (!route) {
    // Handle cases where data is missing (e.g., display an error message)
    return <Text>Error: Event data not found!</Text>;
  }
  
  const [liked,setLiked]=useState(eventData.likedBy.includes(userData.user._id));
  const [likedCount,setLikedCount]=useState(eventData.Likes);
  const [participants,setParticipants]=useState({});
  const [registered,setRegistered]=useState(false)
  // console.log("eventdata",eventData)

  const owner=eventData.userRef===userData.user._id
 

  const userId=userData.user._id;


  const handleLikes = async ()=>{
    try {
     
      const res=await fetch(`http://192.168.43.4:3000/api/event/Like/${eventData._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({userId}),
      });
      const data= await res.json();
      
      if(data.success===false)
      {
        console.log('error at liking',data)
        return
  
      }

      setLikedCount(data.Likes)
      
      setLiked(data.likedBy.includes(userData.user._id))
  
    } catch (error) {
      console.log(error);
      
    }
  
  }
  const avatar=userData.user.avatar;

  const handleRegister=async()=>{
    console.log("pressed");
    try {
      const res=await fetch(`http://192.168.43.4:3000/api/event/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({...eventData,userId,avatar}),
      });
      const data= await res.json();
      
      if(data.success===false)
      {
        console.log('error in  registering',data)
        return
  
      }
  
      navigation.navigate("RegisterationScreen",{eventData})
    } catch (error) {
      console.log(error);
    }
  }
  const handleConfirm = () => {
    Alert.alert(
      "Confirmation",
      `Are you sure you want to register for  this event?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Action canceled"),
          style: "cancel"
        },
        { text: "OK", onPress: () => handleRegister() }
      ]
    );
  };

  const handleEdit=(item)=>{
    navigation.navigate("EditScreen",{data:item})
  }

  const getParticipants=async()=>{
    try {
      const res=await fetch(`http://192.168.43.4:3000/api/event/participants?id=${eventData._id}&userid=${userData.user._id}`)
     
      const data=await res.json();
      if(data.success===false)
      {
        
        setGetEventsError(true)
        console.log('error',data)
        return;
      }
      setParticipants(data.data)
      setRegistered(participants[0].register)
    } catch (error) {
      console.log(error)
    }
  }
 

  useEffect(() => {
    getParticipants()

    return () => {
      
    }
  }, [])
  


  return (
    <SafeAreaView >
      <ScrollView>
        <Image
          style={styles.DisplayImg}
          source={{
              uri: eventData.EventImage?eventData.EventImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOoU11lhsr7WFgMFxqYTLCo9cYSQtnE5NzYhLw1aFx_A&s",
            }}
        />
            <Ionicons name="arrow-back-outline" style={styles.backButton} onPress={()=>navigation.goBack()} size={30} /> 
            <View style={styles.heart}>
           {eventData.Likes>0 && liked? <Ionicons name="heart"   onPress={()=>handleLikes()} size={30} />:<Ionicons name="heart-outline"   onPress={()=>handleLikes()} size={30} />} 
             <Text >{likedCount}</Text>
            </View>


        <View style={styles.innerContainer}>
          <View style={styles.priceSlip}>
            <View style={styles.group1}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>{eventData.eventAmount?eventData.eventAmount:'0'} ₹</Text>
            </View>
            <View style={styles.group1}>
                    <Text style={styles.priceLabel}>Participants</Text>
                    <View style={styles.participantsImgContainer}>
                      {(participants&&participants.length>0)&&participants.map((data)=>{
                      
                      return <Image
                      key={data._id}
                        style={styles.participentsImg}
                        source={{
                            uri: data.avatar?data.avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOoU11lhsr7WFgMFxqYTLCo9cYSQtnE5NzYhLw1aFx_A&s",
                        }}
                        />})}  
                        
                    </View>
            </View>
          </View>
          <View style={{gap:5}}>
           <Text style={styles.header1}>{eventData.eventName?eventData.eventName:' '}</Text>
           <View>

           <View style={styles.tagContainer}>
           <Text style={styles.tag}>{eventData.place?eventData.place.split(',')[1]:' '}</Text>
           <Text style={styles.tag}>{eventData.eDate?eventData.eDate.substring(0,10):' '}</Text>
           <Text style={styles.tag}>{eventData.eventGenere?eventData.eventGenere:' '}</Text>
            </View>
           </View>
           <Text style={styles.para1}>{eventData.eventDesc}</Text>
           
           <View style={{justifyContent:'center',alignItems:'center'}}>

        {owner?<Text style={[styles.SplashButton,!owner ? styles.disabled : styles.enabled]} onPress={()=>handleEdit(eventData)} disabled={!owner} >Edit</Text>:
        <Text style={[styles.SplashButton,participants[0]&&participants[0].register ? styles.disabled : styles.enabled]} onPress={handleConfirm} disabled={participants[0]&&participants[0].register || owner} >{ owner?"You are the Owner":participants[0]&&participants[0].register?"registered":"Join Event"}</Text>}
          {/* <Text style={styles.SplashButton} onPress={handleConfirm} >Join Event</Text>  owner?"You are the Owner":participants[0]&&participants[0].register?"registered":"Join Event"  */}
           </View>
          
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisplayScreen;

const styles = StyleSheet.create({
  DisplayImg: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  innerContainer: {
    paddingHorizontal: 20,
  },
  priceSlip: {
    // width:'100%',
    // height:70,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 18,
    padding:12,
    // flexDirection: "row",
    // justifyContent: "space-between",
    flexDirection:'row',
    justifyContent:'space-between',

    // backgroundColor:'red',

  },
  priceLabel: {
    fontSize: 11,
    color:'#000000',
    opacity:0.5
  },
  price: {
    fontSize: 18,
    fontWeight: "900",
    color: "green",
  },
  participentsImg: {
    width: 30,
    height: 30,
    borderRadius: 100,
    objectFit: "cover",
  },
  participantsImgContainer: {
    gap: -10,
    flexDirection: "row",
  },
  group1:{alignItems:'center',justifyContent:'center'},
  header1:{
    paddingTop:15,
    fontSize:18,
    fontWeight:'bold',
  },
  para1:{
    paddingTop:9,
    fontSize:14,
    opacity:0.8
  
  },
  tagContainer:
  {
    flexDirection:'row',
    gap:2,
    maxWidth:'50%',
    
  },
  tag:{
    backgroundColor:'#D9D9D9',
    padding:4,
    borderRadius:4,
    fontSize:10

  },
  eventGenere:{
    fontSize:10,
    gap:2,
  },
  SplashButton: {
    marginVertical:10,
    color: "#fff",
    // backgroundColor: "#F10EDB",
    backgroundColor:color.primaryColor,
    width: 300,
    paddingHorizontal: 11,
    paddingVertical: 14,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  backButton:{
    position:'absolute',
    top:3,
    left:10,
    backgroundColor:"#D9D9D9",
    borderRadius:10,
  },
  heart:{
    position:'absolute',
    top:3,
    right:10,
    backgroundColor:"#D9D9D9",
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
  },
  heartText:{
    fontSize:1,
    color:'red'
  },

  disabled: {
    backgroundColor:color.primaryColor,
    opacity:0.5,
    color: 'white',
  },
  enabled: {
    backgroundColor:color.primaryColor,
    opacity:0.8,
    color: 'white',
  },
});
