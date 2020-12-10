import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

// Screens
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "../client/screens/Register";
import Profile from "./screens/Profile";
import PreRegister from "./screens/preRegister";

const styles = StyleSheet.create({});

const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="PreRegister" component={PreRegister} />
      <LoginStack.Screen name="Register" component={Register} />
    </LoginStack.Navigator>
  );
}

const RegisterStack = createStackNavigator();
function RegisterStackScreen() {
  return (
    <RegisterStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RegisterStack.Screen name="Register" component={Register} />
    </RegisterStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabOptions={{
          style: styles.tab,
        }}
      >
        {/* <Tab.Screen name="Home" component={HomeStackScreen} /> */}
        <Tab.Screen name="Login" component={LoginStackScreen} />
        {/* <Tab.Screen name="Register" component={RegisterStackScreen} /> */}
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
