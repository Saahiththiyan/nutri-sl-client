// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to Your Fitness Journey</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Meal Plan</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Meal Plan')}>
          <Image
            source={{ uri: 'https://t4.ftcdn.net/jpg/01/82/40/43/360_F_182404327_IFFLPLSstIccSD1Qy2kccZSWNIswrJ9z.jpg' }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Workout Plan</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Workout Plan')}>
          <Image
            source={{ uri: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQe993j0HqtDzdja295fR9k1T14kQKXMq1gF-Yi-xN700AZhoze3sPN6GXBQi0bTaOJ9OFaDTaEhPHE7FIdatEx9rMi_1wW1ZSUM75_ieOTL9XdvH_RU2QR2TU9d5Q2UDuXrMEVs_v1F58QPsXs3EYVwXpUKKEeqYWDqwqXWbA3mw5X7DKZO9_O6DJZA/s1024/Active-Fit-Program.webp' }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Progress</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Progress')}>
          <Image
            source={{ uri: 'https://radiantreflectionsms.com/wp-content/uploads/2020/05/weight-loss-header.jpg' }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Motivational Quote</Text>
        <Text style={styles.quote}>
          "The only bad workout is the one that didn't happen."
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;
