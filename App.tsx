/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/Home';
import TasksScreen from './src/screens/Tasks';
import ProfileScreen from './src/screens/Profile';
import * as storage from './src/utils/storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InitializeScreen from './src/screens/Initialize';
import {StatusBar} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#4B7BE5',
      tabBarInactiveTintColor: '#8E96A1',
    }}>
    <Tab.Screen
      name="Home"
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="home-outline" color={color} size={size} />
        ),
        headerShown: false,
      }}
      component={HomeScreen}
    />
    <Tab.Screen
      name="Tasks"
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="list-outline" color={color} size={size} />
        ),
        headerShown: false,
      }}
      component={TasksScreen}
    />
    <Tab.Screen
      name="Profile"
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="person-outline" color={color} size={size} />
        ),
      }}
      component={ProfileScreen}
    />
  </Tab.Navigator>
);

function App(): JSX.Element {
  const [first, setFirst] = useState(true);

  const mappingRoute = async () => {
    const hasUser = await storage.getData('user');
    setFirst(!hasUser);
  };
  useEffect(() => {
    mappingRoute();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={first ? 'Initialize' : 'HomeStack'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Initialize" component={InitializeScreen} />
          <Stack.Screen name="HomeStack" component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
