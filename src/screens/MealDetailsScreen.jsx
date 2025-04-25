import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const MealDetailsScreen = ({ route }) => {
  const { meal } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: meal.image_url }} style={styles.headerImage} />
      <Text style={styles.header}>{meal.name}</Text>
      <Text style={styles.description}>{meal.notes}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Details</Text>
        <Text style={styles.infoLabel}>Type: <Text style={styles.infoValue}>{meal.type}</Text></Text>
        <Text style={styles.infoLabel}>Weight: <Text style={styles.infoValue}>{meal.weight} g</Text></Text>
        <Text style={styles.infoLabel}>Dietary Preference: <Text style={styles.infoValue}>{meal.dietary_preference}</Text></Text>
        <Text style={styles.infoLabel}>Calories: <Text style={styles.infoValue}>{meal.calories} kcal</Text></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Ingredients</Text>
        <Text style={styles.description}>{meal.ingredients}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Serving Size</Text>
        <Text style={styles.description}>{meal.serving_size}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Preparation Method</Text>
        <Text style={styles.description}>{meal.preparation_method}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Nutritional Information</Text>
        <Text style={styles.infoLabel}>Protein: <Text style={styles.infoValue}>{meal.protein} g</Text></Text>
        <Text style={styles.infoLabel}>Carbohydrates: <Text style={styles.infoValue}>{meal.carbs} g</Text></Text>
        <Text style={styles.infoLabel}>Fat: <Text style={styles.infoValue}>{meal.fat} g</Text></Text>
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
});

export default MealDetailsScreen;
