import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ConsultaScreen from './screens/ConsultaScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#a64dff',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: { backgroundColor: '#1a1a1a' },
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTitleStyle: { color: '#a64dff' },
          headerTintColor: '#a64dff',
        }}
      >
        <Tab.Screen
          name="Início"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Consulta"
          component={ConsultaScreen}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}