import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const WorkoutDetailsScreen = ({ route }) => {
  const { workout } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: 'https://img.freepik.com/free-photo/people-working-out-indoors-together-with-dumbbells_23-2149175410.jpg' }} style={styles.headerImage} />
      <Text style={styles.header}>{workout.name}</Text>
      <Text style={styles.description}>{workout.description}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Details</Text>
        <Text style={styles.infoLabel}>Duration: <Text style={styles.infoValue}>{workout.duration} mins</Text></Text>
        <Text style={styles.infoLabel}>Intensity: <Text style={styles.infoValue}>{workout.intensity}</Text></Text>
        <Text style={styles.infoLabel}>Type: <Text style={styles.infoValue}>{workout.type}</Text></Text>
        <Text style={styles.infoLabel}>Calories Burned: <Text style={styles.infoValue}>{workout.calories_burned} kcal</Text></Text>
      </View>

      <View style={styles.section}>
      <Text style={styles.sectionHeader}>Equipment Needed</Text>
        <Text style={styles.description}>{workout.equipments}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Muscle Groups Targeted</Text>
        <Text style={styles.description}>{workout.muscle_targets}</Text>
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
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  section: {
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  step: {
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default WorkoutDetailsScreen;
