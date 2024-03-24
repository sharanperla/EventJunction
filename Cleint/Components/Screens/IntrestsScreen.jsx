import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function IntrestsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subView1}>
        <Text style={styles.intrestsSubHead}>Choose your interests</Text>
      </View>
      <View style={styles.subView2}>
        <View style={styles.cards}>
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
          </View>
        </View>
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
  }
});
