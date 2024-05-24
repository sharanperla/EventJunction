import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View,ImageBackground } from 'react-native'

export function Slider1({data, name }){

    return (
      <View style={styles.container}>
        <Text style={styles.CategoryTitle}>{name}</Text>
         <FlatList
      contentContainerStyle={styles.flatListContent}
      horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.coroselContainer}>
            <ImageBackground
              source={{ uri: item.EventImage }}
              style={styles.Slider1Image}
            >
              <View style={styles.overlay} />
              <View style={styles.SliderDetails}>
                <Text style={styles.SliderName}>{item.eventName}</Text>
                <Text style={styles.SliderPlace}>{item.eventGenere}</Text>
              </View>
            </ImageBackground>
          </View>
        )}
      
      /> 
        
      </View>
    )
  
}

export default Slider1

const styles=StyleSheet.create({
  container:{
    // backgroundColor:'red',
    height:200,
   
  },
  flatListContent:{
    gap:10,
    padding:4,
    marginLeft:20,
  },
  coroselContainer:{
    // backgroundColor:'blue',
  },
  Slider1Image:{
    borderRadius:10,
    overflow:'hidden',
    width:110,
    height:150,
    justifyContent:'flex-end',
    
  },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent black color
    },
    SliderDetails:{
    padding:5,
    },
    SliderName:{
      color:'white',
      fontSize:16,
      fontWeight:'bold'
    },
    SliderPlace:{
      color:'white',
      fontSize:12,
    },
    CategoryTitle:{
      fontSize:17,
      fontWeight:'bold',
      marginVertical:10,
      marginLeft:20,
    }
  
})
