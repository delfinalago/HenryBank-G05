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
function RegisterStackScreen({ setToken }) {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoginStack.Screen name="PreRegister" component={PreRegister} />
      <LoginStack.Screen name="PreRegisterToken" component={PreRegisterToken} />
      <LoginStack.Screen name="Register" component={Register} />
    </LoginStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen({ setToken }) {
  console.log(setToken);
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile">
        {(props) => <Profile {...props} setToken={setToken} />}
      </ProfileStack.Screen>
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
        {!token && (
          <Tab.Screen
            name="Login"
            children={({ navigation }) => (
              <Login setToken={setToken} navigation={navigation} />
            )}
          />
        )}
        {!token && (
          <Tab.Screen name="Register" component={RegisterStackScreen} />
        )}
        {!!token && (
          <Tab.Screen
            name="Profile"
            children={({ navigation }) => (
              <ProfileStackScreen navigation={navigation} setToken={setToken} />
            )}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
