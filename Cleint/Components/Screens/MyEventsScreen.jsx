import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../Context/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import color from "../../assets/color";
import { useFocusEffect } from "@react-navigation/native";

function MyEventsScreen({navigation}) {
  const [showListingError, setShowListingError] = useState(false);
  const [userListing, setUserListing] = useState(false);
  const { userData } = useContext(AuthContext);

  
  console.log('data',userData);
  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(
        `http://192.168.43.4:3000/api/user/events/${userData.user._id}`
      );

      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleShowListing()

    }, [])
  );

  useEffect(() => {
    handleShowListing();
  }, []);

  const handlePress=(item)=>{
   
      navigation.navigate("DisplayScreen",{data:item})
         
  }

  return (
    <SafeAreaView  style={styles.mainContainer}>
      <ScrollView style={styles.subContainer}>
        <View style={styles.sub2Conttainer}>
        {/* <View >
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

       </View> */}

        {userListing &&
          userListing.map(
            (
              user // Destructure each user object
            ) => (
              <Pressable style={styles.coroselContainer} key={user._id} onPress={()=>handlePress(user)}>
                <ImageBackground
                  source={{
                    uri:
                      user.EventImage ||
                      "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
                  }} // Use user's avatar if available, otherwise use default
                  style={styles.Slider1Image}
                >
                  <View style={styles.SliderDetails}>
                  <View style={styles.overlay} />
                    <Text style={styles.SliderName}>{user.eventName}</Text>
                    <Text style={styles.SliderPlace}>{user.eventGenere} || {user.place}</Text>
                    {/* <Text style={styles.SliderPlace} numberOfLines={2}>{user.eventDesc}</Text> */}
                  </View>
                
                </ImageBackground>
              </Pressable>
            )
          )}
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyEventsScreen;

const styles = StyleSheet.create({
  // MainContainer:{
  //    paddingHorizontal:20,
  //    paddingVertical:20,
  // },
  // EventContainer:{
  //    display:'flex',
  //    flexDirection:'row',
  //    justifyContent:'flex-start',
  //    gap:40,
  //    alignItems:'center',
  //    backgroundColor:'white',
  //    padding:10,
  //    borderRadius:10,

  // },
  // EventImage:{
  //    width:100,
  //    height:100,
  //    borderRadius:10,
  //    objectFit:'cover'
  // },
  // EventName:{
  //   fontSize:21,
  //   fontWeight:'bold',
  // },
  // container:{
  //   // backgroundColor:'red',
  //   height:200,

  // },
  mainContainer: {
    width:'100%',
    height:'100%'
  },
  subContainer: {
    marginHorizontal:20,
    marginVertical:10,
  },
  sub2Conttainer:{
    gap:10,
    height:'100%'
  },
  coroselContainer: {
    // backgroundColor:'blue',
  
  },
  Slider1Image: {
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
    height: 330,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)", // Semi-transparent black color
  },
  SliderDetails: {
    padding: 5,
  },
  SliderName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom:4,
  },
  SliderPlace: {
    color: "white",
    fontSize: 12,
    width:'90%',
    marginBottom:2
  },
  CategoryTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 20,
  },

});
