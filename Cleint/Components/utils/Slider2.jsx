import { useNavigation } from '@react-navigation/native'
import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View,ImageBackground, Pressable } from 'react-native'

export function Slider2({data, name }){
  const navigation=useNavigation();
  const handleNavigation =(item)=>{
    navigation.navigate("DisplayScreen",{data:item})
  }

    return (
      <View style={styles.container}>
        <Text style={styles.CategoryTitle}>{name}</Text>
         <FlatList
      contentContainerStyle={styles.flatListContent}
       horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={styles.coroselContainer} onPress={()=>{handleNavigation(item)}}>
            <View style={{ flexWrap: 'wrap' }}>
            <ImageBackground
              source={{ uri: item.EventImage }}
              style={styles.Slider1Image}
              resizeMode="contain"
            >
              <View style={styles.overlay} />
              <View style={styles.SliderDetails}>
                <Text style={styles.SliderName}>{item.eventName}</Text>
                <Text style={styles.SliderPlace}>{item.eventGenere}</Text>
              </View>
            </ImageBackground>
            </View>
          </Pressable>
        )}
      
      /> 
        
      </View>
    )
  
}

export default Slider2

const styles=StyleSheet.create({
  container:{
    // backgroundColor:'red',
    height:300,
   
},
flatListContent:{
    gap:10,
    padding:4,
    marginLeft:20,
    // width:'100%'
},
coroselContainer:{
    // backgroundColor:'blue',
},
Slider1Image:{
    borderRadius:10,
    overflow:'hidden',
    width:155,
    height:'100%',
    justifyContent:'flex-end',
    objectFit:'cover'
    
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

