// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MealPlanScreen from '../screens/MealPlanScreen';
import MealPlanDetailsScreen from '../screens/MealPlanDetailsScreen';
import WorkoutPlanScreen from '../screens/WorkoutPlanScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import WorkoutPlanDetailsScreen from '../screens/WorkoutPlanDetailsScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptionsWithProfilePicture = (profileImage, userId) => ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Profile', {userId})}>
      <Image
        source={{ uri: profileImage }}
        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 15 }}
      />
    </TouchableOpacity>
  ),
});

const HomeStack = ({ route }) => {
  const profileImage = route.params?.profileImage || 'https://via.placeholder.com/40';
  const userId = route.params?.userId;
  return (
    <Stack.Navigator screenOptions={screenOptionsWithProfilePicture(profileImage, userId)}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
};

const MealPlanStack = ({ route }) => {
  const profileImage = route.params?.profileImage || 'https://via.placeholder.com/40';
  const userId = route.params?.userId;
  return (
    <Stack.Navigator screenOptions={screenOptionsWithProfilePicture(profileImage, userId)}>
      <Stack.Screen name="MealPlanScreen" component={MealPlanScreen} options={{ title: 'Meal Plans' }} />
      <Stack.Screen name="MealPlanDetailsScreen" component={MealPlanDetailsScreen} options={({ route }) => ({ title: route.params.mealPlan.name })} />
      <Stack.Screen name="MealDetailsScreen" component={MealDetailsScreen} options={({ route }) => ({ title: route.params.meal.name })} />
    </Stack.Navigator>
  );
};

const WorkoutPlanStack = ({ route }) => {
  const profileImage = route.params?.profileImage || 'https://via.placeholder.com/40';
  const userId = route.params?.userId;
  return (
    <Stack.Navigator screenOptions={screenOptionsWithProfilePicture(profileImage, userId)}>
      <Stack.Screen name="WorkoutPlanScreen" component={WorkoutPlanScreen} options={{ title: 'Workout Plan' }} />
      <Stack.Screen name="WorkoutPlanDetailsScreen" component={WorkoutPlanDetailsScreen} options={({ route }) => ({ title: route.params.workoutPlan.name })} />
      <Stack.Screen name="WorkoutDetailsScreen" component={WorkoutDetailsScreen} options={({ route }) => ({ title: route.params.workout.name })} />
    </Stack.Navigator>
  );
};

const ProgressStack = ({ route }) => {
  const profileImage = route.params?.profileImage || 'https://via.placeholder.com/40';
  const userId = route.params?.userId;
  return (
    <Stack.Navigator screenOptions={screenOptionsWithProfilePicture(profileImage, userId)}>
      <Stack.Screen name="ProgressScreen" component={ProgressScreen} options={{ title: 'Progress' }} />
    </Stack.Navigator>
  );
};

const ChatStack = ({ route }) => {
  const profileImage = route.params?.profileImage || 'https://via.placeholder.com/40';
  const userId = route.params?.userId;
  return (
    <Stack.Navigator screenOptions={screenOptionsWithProfilePicture(profileImage, userId)}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Chat' }} />
    </Stack.Navigator>
  );
};

const ProfileStack = ({ route }) => {
  const profileImage = route.params?.profileImage || 'https://via.placeholder.com/40';
  const userId = route.params?.userId;
  return (
    <Stack.Navigator screenOptions={screenOptionsWithProfilePicture(profileImage, userId)}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = ({ route }) => {
  const profileImage = route.params?.profileImage || 'https://via.placeholder.com/40';
  const userId = route.params?.userId;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Meal Plan') {
            iconName = 'fast-food-outline';
          } else if (route.name === 'Workout Plan') {
            iconName = 'barbell-outline';
          } else if (route.name === 'Progress') {
            iconName = 'analytics-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubbles-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} initialParams={{ profileImage, userId }} />
      <Tab.Screen name="Meal Plan" component={MealPlanStack} initialParams={{ profileImage, userId }} />
      <Tab.Screen name="Workout Plan" component={WorkoutPlanStack} initialParams={{ profileImage, userId }} />
      <Tab.Screen name="Progress" component={ProgressStack} initialParams={{ profileImage, userId }} />
      <Tab.Screen name="Chat" component={ChatStack} initialParams={{ profileImage, userId }} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="Profile" component={ProfileStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default AppNavigator;
