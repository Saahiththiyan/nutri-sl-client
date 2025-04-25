// src/screens/WorkoutPlanScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import supabase from '../supabaseClient';

const WorkoutPlanScreen = ({navigation}) => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      setLoading(true)
      const user = await supabase.auth.getUser();
      if (user) {
        // Fetch the user's profile to get the client ID
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('client_id')
          .eq('id', user.data.user.id)
          .single();

        if (profileError) {
          console.error(profileError);
          setLoading(false);
          return;
        }
        const clientId = profile.client_id;
        // Fetch workout plans using the client ID
        const { data: workoutPlans, error: workoutPlansError } = await supabase
        .from('workout-plans')
        .select('*, workouts(*)')
        .eq('client_id', clientId);
        if (workoutPlansError) {
          console.error(workoutPlansError);
        } else {
          setWorkoutPlans(workoutPlans);
        }
        setLoading(false)
      };
    } 

    fetchWorkoutPlans();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('WorkoutPlanDetailsScreen', { workoutPlan: item })}>
      <View style={styles.item}>
        <Image source={{ uri: 'https://img.freepik.com/free-vector/workout-concept-illustration_114360-1120.jpg' }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Workout Plans</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
      <FlatList
        data={workoutPlans}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
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

export default WorkoutPlanScreen;
