import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screens

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register/Register";
import Profile from "./screens/Profile";
import PreRegister from "./screens/Register/preRegister";
import PreRegisterToken from "./screens/Register/preRegisterToken";

const styles = StyleSheet.create({
  tab: {
    marginBottom: 15,
  },
});

const LoginStack = createStackNavigator();
function LoginStackScreen({ setToken }) {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoginStack.Screen name="Login">
        {(setToken) => <Login setToken={setToken} />}
      </LoginStack.Screen>
      <LoginStack.Screen name="PreRegister" component={PreRegister} />
      <LoginStack.Screen name="PreRegisterToken" component={PreRegisterToken} />
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
  const [token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("@localUser")
      .then((data) => {
        if (data) return JSON.parse(data);
      })
      .then((data) => {
        if (data) setToken(data.token);
      });
  }, []);

  useEffect(() => {
    console.log(token);
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      axios.defaults.headers.common["Authorization"] = ``;
    }
  }, [token]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabOptions={{
          style: styles.tab,
        }}
      >
        {/* <Tab.Screen name="Home" component={HomeStackScreen} /> */}
        <Tab.Screen
          name="Login"
          children={() => <LoginStackScreen setToken={setToken} />}
        />
        <Tab.Screen name="Register" component={RegisterStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
        {/* <Tab.Screen name="Token" component={PreRegisterToken} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
