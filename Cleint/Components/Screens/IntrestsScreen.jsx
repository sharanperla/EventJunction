import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../Context/AuthContext";
import color from "../../assets/color";

const interestsData = [
  { id: 1, name: 'Music', image: require("../../assets/Intrests/music.png")},
  { id: 2, name: 'Festivals', image: require("../../assets/Intrests/festival.png") },
  { id: 3, name: 'Dance', image: require("../../assets/Intrests/dance.png") },
  { id: 4, name: 'Drama', image: require("../../assets/Intrests/drama.png") },
  { id: 5, name: 'Sports', image: require("../../assets/Intrests/sports.png") },
  { id: 6, name: 'beach', image: require("../../assets/Intrests/beach.png") }
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
      // console.log(selectedInterests)
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
          // console.log(data)
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
                size={30}
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
        <View>

          <TouchableOpacity disabled={selectedInterests.length === 0} onPress={handleSubmit}><Text  style={[
              styles.SplashButton,
              selectedInterests.length === 0 && styles.disabledButton
            ]} >Submit</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default IntrestsScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    // justifyContent:'space-between'
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
    justifyContent:'space-around',
    alignItems:'center',
    height:'90%',
  },
  cards: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    rowGap:15,
  },
  card: {
    backgroundColor: "white",
    width: '29%',
    height:140,
    borderRadius:10,
    display:'flex',
    justifyContent:'center',
    padding:10,
    alignItems:'center',
    gap:15,
    shadowColor: color.primaryColor,
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
    backgroundColor: color.primaryColor, 
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
    // backgroundColor: "#F10EDB",
    backgroundColor: color.primaryColor,
    color:'#fff',
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
    backgroundColor: color.primaryDisabled,
    opacity:0.5, // Gray background for disabled state
    // color: '#fff', // Light gray text for disabled state
  }
});
