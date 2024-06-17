import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../Context/AuthContext";

const interestsData = [
  { id: 1, name: 'Music', image: require("../../assets/Intrests/music.png") },
  { id: 2, name: 'Art', image: require("../../assets/Intrests/music.png") },
  { id: 3, name: 'Sports', image: require("../../assets/Intrests/music.png") },
  { id: 4, name: 'Travel', image: require("../../assets/Intrests/music.png") },
  { id: 5, name: 'Reading', image: require("../../assets/Intrests/music.png") },
  { id: 6, name: 'Cooking', image: require("../../assets/Intrests/music.png") }
];
function IntrestsScreen({navigation}) {

    const {userData,setUserData}=useContext(AuthContext)
    const [selectedInterests, setSelectedInterests] = useState([]);
  
    const toggleInterest = (interestId) => {
      if (selectedInterests.includes(interestId)) {
        setSelectedInterests(selectedInterests.filter(id => id !== interestId));
      } else {
        setSelectedInterests([...selectedInterests, interestId]);
      }
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Assuming these are already defined correctly in your component
      const userId = userData.user._id;
      console.log(selectedInterests)
      const formData = { userId, selectedInterests };
    
      try {
        const res = await fetch('http://192.168.43.4:3000/api/auth/interests', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        const data = await res.json();
        if (!res.ok) {
          console.log(data)
          throw new Error('Failed to update user');
        }
    
        console.log("Success:", data);
        setUserData(data);
        navigation.navigate("HomeScreen");
        // Handle success scenario, if needed
      } catch (error) {
        console.error('Error:', error);
        // Handle error scenario, log or display error message
      }
    };
    
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subView1}>
        <Text style={styles.intrestsSubHead}>Choose your interests</Text>
      </View>
      <View style={styles.subView2}>
        <View style={styles.cards}>
          {interestsData.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              style={[
                styles.card,
                selectedInterests.includes(interest.name) && styles.selectedCard
              ]}
              onPress={() => toggleInterest(interest.name)}
            >
               <Image
                source={require("../../assets/Intrests/tick.png")}
                style={[
                  styles.tickMark,
                  selectedInterests.includes(interest.name) && {display:'flex'}
                ]}
              />
              <Image
                source={interest.image}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>{interest.name}</Text>
            </TouchableOpacity>
          ))}
          {/* <View style={styles.card}>
            <Image
              source={require("../../assets/Intrests/music.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Music</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require("../../assets/Intrests/music.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Music</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require("../../assets/Intrests/music.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardText} >Musicikgkttiuthuoyu</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require("../../assets/Intrests/music.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Music</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require("../../assets/Intrests/music.png")}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Music</Text>
          </View> */}
        </View>
      <TouchableOpacity disabled={selectedInterests.length === 0} onPress={handleSubmit}><Text  style={[
          styles.SplashButton,
          selectedInterests.length === 0 && styles.disabledButton
        ]} >Submit</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default IntrestsScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  subView1: {
    paddingTop: 20,
    display: "flex",
  },
  intrestsSubHead: {
    fontSize: 17,
  },
  subView2: {
    paddingTop:20,
    justifyContent:'center',
    alignItems:'center'
  },
  cards: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    rowGap:15,
  },
  card: {
    backgroundColor: "#ececec",
    width: '29%',
    height:140,
    borderRadius:10,
    display:'flex',
    justifyContent:'center',
    padding:10,
    alignItems:'center',
    gap:15,
    shadowColor: "purple",
shadowOffset: {
  width: 0,
  height: 3,
},
shadowOpacity: 0.17,
shadowRadius: 3.05,
elevation: 100

  },
  cardText:{
    textAlign:'center'
  },
  selectedCard: {
    backgroundColor: "#d3d3d3", 
    borderWidth:2,
    borderColor:'black',
    
  },
  tickMark:{
    position:'absolute',
    top:-10,
    right:-5,
    display:'none'
  },
  SplashButton: {
    color: "#fff",
    backgroundColor: "#F10EDB",
    width: 300,
    paddingHorizontal: 11,
    paddingVertical: 14,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop:50,
  },
  disabledButton: {
    backgroundColor: '#923E8A', // Gray background for disabled state
    color: '#a9a9a9', // Light gray text for disabled state
  }

});
