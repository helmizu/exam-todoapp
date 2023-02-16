/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/Home';
import TasksScreen from './src/screens/Tasks';
import ProfileScreen from './src/screens/Profile';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
                <Ionicons name="calendar-outline" color={color} size={size} />
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
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
