// src/screens/MealPlanDetailsScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';

const MealPlanDetailsScreen = ({ route, navigation }) => {
  const { mealPlan } = route.params;
  const meals = mealPlan.meals

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MealDetailsScreen', { meal: item })}>
      <View style={styles.item}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: mealPlan.image_url }} style={styles.headerImage} />
      <Text style={styles.header}>{mealPlan.name}</Text>
      <Text style={styles.description}>
        {mealPlan.description}
      </Text>
      <Text style={styles.sectionHeader}>Meals</Text>
      <FlatList
        data={meals}
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

export default MealPlanDetailsScreen;
