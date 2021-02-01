import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from "@react-navigation/drawer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { Image
} from "react-native";

// Screens

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register/Register";
import Profile from "./screens/Profile";
import PreRegister from "./screens/Register/preRegister";
import PreRegisterToken from "./screens/Register/preRegisterToken";
import contactsList from "./screens/MisContactos/contactsList";
import addContact from "./screens/MisContactos/addContact";
import editContact from "./screens/MisContactos/editContact";
import SendMoney from "./screens/SendMoney/sendMoney";
import SelectContact from "./screens/SendMoney/selectContact";
import UserData from "./screens/Profile/UserData";
import Statistics from "./screens/Statistics/Statistics";
import transacciones from "./screens/Transacciones/transacciones";
import RechargeMoney from "./screens/RechargeMoney/rechargeMoney";
import Card from "./screens/RechargeMoney/card";
import Code from "./screens/RechargeMoney/code";
import SelectMethod from "./screens/RechargeMoney/selectMethod";
import {logoo} from './assets/logoo.png';
import {logo2} from './assets/logo2.png';

const Stack = createStackNavigator(); //contiene la navegacion

function RootStack() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      AsyncStorage.getItem("@localUser")
        .then((data) => {
          if (data) return JSON.parse(data);
        })
        .then((data) => {
          if (data) setToken(data.token);
        });
    } catch (error) {
      console.log(error);
    }
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
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <LoginStack {...props} setToken={setToken} />}
      </Stack.Screen>
      <Stack.Screen name="Profile" options={{ headerShown: false }}>
        {(props) => <ProfileStack {...props} setToken={setToken} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function LoginStack({ setToken }) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <Login {...props} setToken={setToken} />}
      </Stack.Screen>
      <Stack.Screen name="PreRegister" component={PreRegister} />
      <Stack.Screen name="PreRegisterToken" component={PreRegisterToken} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Registrarse" }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack({ setToken }) {
  return (
    
    <Stack.Navigator>
    
      <Stack.Screen name="Mi Perfil">
        {(props) => <Profile {...props} setToken={setToken} />}
      </Stack.Screen>
      <Stack.Screen
        name="contactsList"
        component={contactsList}
        options={{ title: "Mis Contactos" }}
      />
      <Stack.Screen
        name="addContact"
        component={addContact}
        options={{ 
          headerTitle: (props) => ( // App Logo
            
           <Image
             style={{ width: 80, height: 80, margin: 70 }}
             source={require('./assets/logo2.png')} 
             resizeMode='contain'
           
           />
         ),
        
         headerTitleStyle: { flex: 1},
         
         }}
         
       />
      <Stack.Screen
        name="editContact"
        component={editContact}
        options={{ 
          headerTitle: (props) => ( // App Logo
            
           <Image
             style={{ width: 80, height: 80, marginLeft: 70}}
             source={require('./assets/logo2.png')} 
             resizeMode='contain'
           
           />
         ),
        
         headerTitleStyle: { flex: 1},
         
         }}
         
       />
      <Stack.Screen
        name="SendMoney"
        component={SendMoney}
        options={{ 
          headerTitle: (props) => ( // App Logo
            
           <Image
             style={{ width: 80, height: 80, marginLeft: 70}}
             source={require('./assets/logo2.png')} 
             resizeMode='contain'
           
           />
         ),
        
         headerTitleStyle: { flex: 1},
         
         }}
         
       />
      <Stack.Screen
        name="SelectContact"
        component={SelectContact}
        options={{ 
          headerTitle: (props) => ( // App Logo
            
           <Image
             style={{ width: 80, height: 80, marginLeft: 70}}
             source={require('./assets/logo2.png')} 
             resizeMode='contain'
           
           />
         ),
        
         headerTitleStyle: { flex: 1},
         
         }}
         
       />
      <Stack.Screen
        name="Statistics"
        component={Statistics}
        options={{ title: "Estadísticas" }}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="transacciones"
        component={transacciones}
        //options={{ title: "Transacciones" }}
        options={{ 
          headerTitle: (props) => ( // App Logo
            
           <Image
             style={{ width: 80, height: 80, marginLeft: 70}}
             source={require('./assets/logo2.png')} 
             resizeMode='contain'
           
           />
         ),
        
         headerTitleStyle: { flex: 1},
         
         }}
         
       />
       
        
        {/* // options={{ headerShown: false }} */}
    
      <Stack.Screen
        name="RechargeMoney"
        component={RechargeMoney}
        options={{ title: "Recargar Dinero" }}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectMethod"
        component={SelectMethod}
        options={{ 
          headerTitle: (props) => ( // App Logo
            
           <Image
             style={{ width: 80, height: 80, marginLeft: 70}}
             source={require('./assets/logo2.png')} 
             resizeMode='contain'
           
           />
         ),
        
         headerTitleStyle: { flex: 1},
         
         }}
         
       />
      <Stack.Screen
        name="Code"
        component={Code}
        options={{ 
          headerTitle: (props) => ( // App Logo
            
           <Image
             style={{ width: 80, height: 80, marginLeft: 70}}
             source={require('./assets/logo2.png')} 
             resizeMode='contain'
           
           />
         ),
        
         headerTitleStyle: { flex: 1},
         
         }}
         
       />
      <Stack.Screen
        name="Card"
        component={Card}
        options={{ 
          headerTitle: (props) => ( // App Logo
            
           <Image
             style={{ width: 80, height: 80, marginLeft: 70}}
             source={require('./assets/logo2.png')} 
             resizeMode='contain'
           
           />
         ),
        
         headerTitleStyle: { flex: 1},
         
         }}
         
       />
      <Stack.Screen
        name="UserData"
        component={UserData}
        options={{ title: "Datos Personales" }}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <NavigationContainer>
      <RootStack />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}