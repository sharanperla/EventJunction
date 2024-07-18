import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, FlatList, Image, ImageBackground, Text, View, Dimensions, Pressable } from 'react-native';

export function HomeCourosel({ data }) {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const handleNavigate = (item) => {
    console.log('pressed')
    navigation.navigate('DisplayScreen', { data: item });
  };

  return (
    <View style={styles.container}>
        {data?.length > 0 && (
      
      <FlatList
      contentContainerStyle={styles.flatListContent}
        horizontal // Make the FlatList scroll horizontally
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={styles.coroselContainer} key={item.eventId || Math.random()} onPress={() => handleNavigate(item)}>
            <ImageBackground  
              source={{ uri: item.EventImage }}
              style={styles.CouroselImage}
             
            >
              {/* <View style={styles.CouroselDetails} >
                 <View style={styles.overlay} />
                <Text style={styles.CouroselName}>{item.eventName}</Text>
                <Text style={styles.CouroselPlace}>{item.eventGenere}</Text>
              </View> */}
            </ImageBackground>
          </Pressable>
        )}
        snapToAlignment="center" // Snap to center of the next item
        snapToInterval={windowWidth-20}
        decelerationRate={0.5} // Adjust deceleration rate if needed
      />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  width:'100%',

   // Set a specific height for the container
  },
  flatListContent: {
    gap:20,
    flexGrow: 1,
    marginLeft:20,
  },
  coroselContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10, // Add margin between items
   width:315,
 

  },
  CouroselImage: {
    height: 166,
    width:'100%',
    justifyContent: 'flex-end',
  },
  CouroselDetails: {
    padding: 2,
  },
  CouroselName: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  CouroselPlace: {
    color: 'white',
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', 
    borderRadius:10,// Semi-transparent black color
  },
});

export default HomeCourosel;
