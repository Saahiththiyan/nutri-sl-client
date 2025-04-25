// src/screens/WorkoutPlanDetailsScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';

const WorkoutPlanDetailsScreen = ({ route, navigation }) => {
  const { workoutPlan } = route.params;
  const workouts = workoutPlan.workouts

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('WorkoutDetailsScreen', { workout: item })}>
      <View style={styles.item}>
        <Image source={{ uri: 'https://img.freepik.com/free-vector/workout-concept-illustration_114360-1120.jpg' }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://img.freepik.com/free-photo/young-happy-sportswoman-getting-ready-workout-tying-shoelace-fitness-center_637285-470.jpg' }} style={styles.headerImage} />
      <Text style={styles.header}>{workoutPlan.name}</Text>
      <Text style={styles.description}>
        {workoutPlan.description}
      </Text>
      <Text style={styles.sectionHeader}>Workouts</Text>
      <FlatList
        data={workouts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  title: {
    fontSize: 18,
  },
});

export default WorkoutPlanDetailsScreen;
