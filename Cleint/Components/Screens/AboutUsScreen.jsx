import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutUsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>About Us</Text>
        </View>
        <View style={styles.content}>
          <Image
            source={require("../../assets/EJBlack.png")}
            style={styles.image}
          />
          <Text style={styles.heading1}>Welcome to Event Junction!</Text>
          <Text style={styles.text}>
          Event Junction is your ultimate companion for discovering and exploring events happening around you. Whether you're looking for concerts, festivals, conferences, or local gatherings, we've got you covered. Our app is designed to connect you with the best events and experiences in your area and beyond.
          </Text>
          <Text style={styles.heading1}>Key Features</Text>
          <Text style={styles.text}>
          Discover Events: Easily browse through a wide range of events happening in your city and beyond. From music festivals and sports events to art exhibitions and tech conferences, there's something for everyone.
          </Text>
          <Text style={styles.text}>
          Nearby Events: Find events happening near your location with just a tap. Our app uses advanced location-based services to show you events that are closest to you, making it easy to find something exciting to do, even at the last minute
          </Text>
          <Text style={styles.text}>
          Personalized Recommendations: Get event suggestions tailored to your interests
          </Text>
          <Text style={styles.text}>
          Event Details: Access comprehensive details about each event, including date, time, venue, and ticket information. Stay informed and never miss out on important updates
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    color: '#666',
    marginBottom: 20,
  },
  heading1:{

    fontSize:20,
    marginBottom: 20,


  }

});

export default AboutUsScreen;
