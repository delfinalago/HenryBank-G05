import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Profile from './screens/Profile'
import AppNavigator from '../client/navigation/Navigator';


import Home from './screens/Home'

const styles = StyleSheet.create({
tab: {
  marginBottom: 15
}
})

const HomeStack = createStackNavigator()
function HomeStackScreen() {
  return (
    <AppNavigator/>
  );
}

const ProfileStack = createStackNavigator()
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        tabStyle: styles.tab
      }}>
        <Tab.Screen name="Registrarse" component={HomeStackScreen} />
        <Tab.Screen name="Mi perfil" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
