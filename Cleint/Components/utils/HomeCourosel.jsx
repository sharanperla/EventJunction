import React from 'react';
import { StyleSheet, FlatList, Image, ImageBackground, Text, View, Dimensions } from 'react-native';

export function HomeCourosel({ data }) {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      
      <FlatList
      contentContainerStyle={styles.flatListContent}
        horizontal // Make the FlatList scroll horizontally
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.coroselContainer}>
            <ImageBackground
              source={{ uri: item.EventImage }}
              style={styles.CouroselImage}
            >
              <View style={styles.overlay} />
              <View style={styles.CouroselDetails}>
                <Text style={styles.CouroselName}>{item.eventName}</Text>
                <Text style={styles.CouroselPlace}>{item.eventDesc}</Text>
              </View>
            </ImageBackground>
          </View>
        )}
        snapToAlignment="center" // Snap to center of the next item
        snapToInterval={windowWidth-20}
        decelerationRate={0.5} // Adjust deceleration rate if needed
      />
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
    padding: 10,
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
    backgroundColor: 'rgba(0,0,0,0.4)', // Semi-transparent black color
  },
});

export default HomeCourosel;
