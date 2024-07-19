import { useNavigation } from '@react-navigation/native'
import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View,ImageBackground, Pressable } from 'react-native'

export function Slider2({data, name }){
  const navigation=useNavigation();
  const handleNavigation =(item)=>{
    navigation.navigate("DisplayScreen",{data:item,registeredPage:true})
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
          <View>
          <Pressable onPress={()=>{handleNavigation(item)}}>
            <View style={{ flexWrap: 'wrap' }}>
            <ImageBackground
              source={{ uri: item.EventImage }}
              style={styles.Slider1Image}
              resizeMode="cover"
            >
            </ImageBackground>
            </View>
          </Pressable>
              <View style={styles.SliderDetails}>
         
                <Text style={styles.SliderName}>{item.eventName}</Text>
                <Text style={styles.SliderPlace}>{item.eventGenere}{item.place?item.place!=="Location not selected"?" | "+item.place.split(" ")[2]:"":""}</Text>
              </View>
          </View>
        )}
      
      /> 
        
      </View>
    )
  
}

export default Slider2

const styles=StyleSheet.create({
  container:{
    // backgroundColor:'red',
    // height:300,
   
},
flatListContent:{
    gap:10,
    padding:4,
    marginHorizontal:20,
    // width:'100%'
},
coroselContainer:{
    // backgroundColor:'blue',
},
Slider1Image:{
    borderRadius:10,
    overflow:'hidden',
    width:155,
    height:250,
  
    
},
overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent black color
},
SliderDetails:{
  padding:5,
  alignItems:'center',
},
SliderName:{
  color:'black',
  fontSize:16,
  fontWeight:'bold',
  maxWidth:154,
  textAlign:'center'
},
SliderPlace:{
  color:'black',
  fontSize:9,
},
CategoryTitle:{
    fontSize:17,
    fontWeight:'bold',
    marginVertical:10,
    marginLeft:20,
}
  
})

