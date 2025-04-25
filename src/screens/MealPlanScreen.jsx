// src/screens/MealPlanScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import supabase from '../supabaseClient';


const MealPlanScreen = ({ navigation, route }) => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlans = async () => {
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
        // Fetch meal plans using the client ID
        const { data: mealPlans, error: mealPlansError } = await supabase
        .from('meal-plans')
        .select('*, meals(*)')
        .eq('client_id', clientId);
        if (mealPlansError) {
          console.error(mealPlansError);
        } else {
          setMealPlans(mealPlans);
        }
        setLoading(false)
        
      };
    } 

    fetchMealPlans();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MealPlanDetailsScreen', { mealPlan: item })}>
      <View style={styles.item}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Meal Plans</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={mealPlans}
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

export default MealPlanScreen;
