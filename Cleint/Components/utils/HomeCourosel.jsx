import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';

  
  const [currentIndex, setCurrentIndex] = useState(0);
  const renderItem = ({ item, index }) => {

const carouselRef = useRef(null);

const handleScrollToIndex = (index) => {
  carouselRef.current.scrollToIndex({ animated: true, index });
  setCurrentIndex(index);
};

const handleSnapToItem = ({ layoutMeasurement, distanceFromCenter }) => {
  const scrollOffset = layoutMeasurement.width * 0.5 - distanceFromCenter;
  carouselRef.current.scrollToOffset({ animated: true, offset: scrollOffset });
};

    return (
      <View style={styles.item}>
       <FlatList
  ref={carouselRef}
  data={data}
  horizontal={true}
  showsHorizontalScrollIndicator={false}
  snapToInterval={Dimensions.get('window').width} // Adjust as needed
  snapToAlignment="center"
  decelerationRate="fast"
  renderItem={renderItem}
  onScrollSnap={handleSnapToItem}
  keyExtractor={(item) => item.id.toString()} // Replace with unique ID key
/>

{currentIndex > 0 && (
  <Button title="<" onPress={() => handleScrollToIndex(currentIndex - 1)} />
)}
{currentIndex < data.length - 1 && (
  <Button title=">" onPress={() => handleScrollToIndex(currentIndex + 1)} />
)}

      </View>
    );
  };
  