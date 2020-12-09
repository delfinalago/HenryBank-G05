import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  StyleSheet,  
} from 'react-native'
import Profile from './screens/Profile'

import Home from './screens/Home'

const styles = StyleSheet.create({

})

const HomeStack = createStackNavigator()
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  )
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
      <Tab.Navigator tabOptions={{
        style: styles.tab
      }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
