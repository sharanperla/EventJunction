import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../utils/Header";
import HomeCourosel from "../utils/HomeCourosel";
import Slider1 from "../utils/Slider1";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../Context/AuthContext";
import * as Location from "expo-location";

function HomeScreen({ navigation }) {
  const [myLocation, setMyLocation] = useState();
  const [loading, setLoading] = useState(false);
  const { userData, setUserData } = useContext(AuthContext);
  const [newUserData, setNewUserData] = useState({});
  const [getEventsError, setGetEventsError] = useState(false);
  const [allEvents, setAllEvents] = useState(false);
  const [danceEvents, setDanceEvents] = useState({});
  const [musicEvents, setMusicEvents] = useState({});
  const [nearByEvents, setNearByEvents] = useState({});
  const [interestedEvents, setInterestedEvents] = useState([]);

  //fetching users current location
  const fetchLocation = useMemo(() => {
    return async () => {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setMyLocation(location);
      setLoading(false);
      // console.log("User location:", location.coords);
    };
  }, []);

  useEffect(() => {
    if (!myLocation) {
      fetchLocation();
    }
  }, [fetchLocation, myLocation]);

  
  useEffect(() => {
    // console.log(userData.user.interests.length)
    if (!userData.user.interests || userData.user.interests.length === 0) {
      navigation.navigate("Interests");
      return;
    }
  }, [userData.user.interests]);


    useEffect(() => {
      if (myLocation) {
        getNearByEvents();
      }
    }, [myLocation]);

  
  //allEvents
  const getEvents = async () => {
    try {
      setLoading(true);
      setGetEventsError(false);
      const res = await fetch(
        `http://192.168.43.4:3000/api/event/getEvents?userRef=${userData.user._id}`
      );

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setGetEventsError(true);

        return;
      }
      setAllEvents(data);
      setLoading(false);
      // console.log(allEvents)
    } catch (error) {
      setLoading(false);
      setGetEventsError(true);
    }
  };


  //genere=dance
  const getDanceEvents = async () => {
    try {
      setLoading(true);
      setGetEventsError(false);
      const res = await fetch(
        `http://192.168.43.4:3000/api/event/getEvents?genre=Dance&userRef=${userData.user._id}`
      );

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setGetEventsError(true);
        return;
      }
      setDanceEvents(data);
      setLoading(false);
      // console.log(allEvents)
    } catch (error) {
      setLoading(false);
      setGetEventsError(true);
    }
  };

  //NearbyEvents --events within 20 kms

  const getNearByEvents = async () => {
    try {
      setLoading(true);
      setGetEventsError(false);
      let latitude = await myLocation.coords.latitude;
      let longitude = await myLocation.coords.longitude;
      console.log(latitude, longitude);
      const res = await fetch(
        `http://192.168.43.4:3000/api/event/getEvents?userRef=${userData.user._id}&latitude=${latitude}&longitude=${longitude}`
      );

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setGetEventsError(true);
        return;
      }
      setNearByEvents(data);
      setLoading(false);
  
    } catch (error) {
      setLoading(false);
      setGetEventsError(true);
    }
  };

  //genre=music
  const getMusicEvents = async () => {
    try {
      setLoading(true);
      setGetEventsError(false);
      const res = await fetch(
        `http://192.168.43.4:3000/api/event/getEvents?genre=Music&userRef=${userData.user._id}`
      );

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setGetEventsError(true);
        return;
      }
      setLoading(false);
      setMusicEvents(data);

      // console.log(allEvents)
    } catch (error) {
      setLoading(false);
      setGetEventsError(true);
    }
  };

  //interested events
  const getInterestEevents = async () => {
    try {
      setLoading(true);
      setGetEventsError(false);
      const res = await fetch(
        `http://192.168.43.4:3000/api/event/getEvents?genre=${userData.user.interests}&userRef=${userData.user._id}`
      );

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setGetEventsError(true);
        // console.log(data)
        return;
      }
      setInterestedEvents(data);
      setLoading(false);
      // console.log("interested events",interestedEvents)

      // console.log(allEvents)
    } catch (error) {
      setLoading(false);
      setGetEventsError(true);
      console.log(error);
    }
  };

  // console.log(allEvents)

  useEffect(() => {
    getEvents();
    getDanceEvents();
    getInterestEevents();
    getMusicEvents();
  }, []);

  
  useFocusEffect(
    React.useCallback(() => {
      getEvents();
      getDanceEvents();
      getInterestEevents();
      getMusicEvents();
      if (myLocation) {
        getNearByEvents();
      }
      if (!userData.user.interests || userData.user.interests.length === 0) {
        navigation.navigate("Interests");
        return;
      }
    }, [])
  );

  return (
    <SafeAreaView>
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <Header />

          <View style={styles.container}>
            {!allEvents||allEvents.length===0&&<View style={styles.notFoundContainer}>
               <Image style={styles.illlustration} source={require("../../assets/illustrations/noresult.png")} size={5} />
                <Text style={styles.notFound}>No events found!</Text>
              </View>}
          {allEvents.length>0&&<HomeCourosel data={allEvents} />}
             {nearByEvents.length>0&&<Slider1 data={nearByEvents} name={"Nearby Events"} />}
            {interestedEvents.length > 0 && (
              <Slider1 data={interestedEvents} name={"Recommended"} />
            )}
            {danceEvents.length>0&&<Slider1 data={danceEvents} name={"Dance"} />}
           {musicEvents.length>0&&<Slider1 data={musicEvents} name={"Music"} />}
            {allEvents.length>0&&<Slider1 data={allEvents} name={"Other"} />}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  spinner: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  notFound:{
    textAlign:'center',
    fontSize:18,
  },
  illlustration:{
    width:300,
    height:300,
    objectFit:'contain',
    borderRadius:10,
  },
  notFoundContainer:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:90,
  }
});
