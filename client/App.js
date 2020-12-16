import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

// Screens

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register/Register";
import Profile from "./screens/Profile";
import PreRegister from "./screens/Register/preRegister"
import contactsList from "./screens/MisContactos/contactsList"
import addContact from "./screens/MisContactos/addContact";
import editContact from "./screens/MisContactos/editContact";

import PreRegisterToken from "./screens/Register/preRegisterToken";

const Stack = createStackNavigator(); //contiene la navegacion

function RootStack() {
	return (
		<Stack.Navigator initialRouteName='Login'>
			<Stack.Screen name='Login' component={LoginStack} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

function LoginStack() {
	return (
		<Stack.Navigator
			initialRouteName='Home'
			screenOptions={{
				headerShown: false,
			}}
		>
			
			{/* <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} /> */}
			{/* <Stack.Screen name='Login' component={Login} options={{ title: 'Iniciar sesión' }} options={{ headerShown: false }} />
       		<Stack.Screen name='PreRegister' component={PreRegister} />
        	<Stack.Screen name="PreRegisterToken" component={PreRegisterToken} />
			<Stack.Screen name='Register' component={Register} options={{ title: 'Registrarse' }} options={{ headerShown: false }} />
     		<Stack.Screen name='Profile' component={Profile} options={{ title: 'Perfil' }} options={{ headerShown: false }} /> */}
			<Stack.Screen name='contactsList' component={contactsList} options={{ title: 'Mis Contactos' }} options={{ headerShown: false }} />
			<Stack.Screen name='addContact' component={addContact} options={{ title: 'Mis Contactos' }} options={{ headerShown: false }} />
			<Stack.Screen name='editContact' component={editContact} options={{ title: 'Mis Contactos' }} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

export default function App() {
	return (
	
			<NavigationContainer>
				<RootStack />
			</NavigationContainer>
	
	);
}



// const LoginStack = createStackNavigator();
// function LoginStackScreen() {
//   return (
//     <LoginStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <LoginStack.Screen name="Login" component={Login} />
//       <LoginStack.Screen name="PreRegister" component={PreRegister} />
//       <LoginStack.Screen name="Register" component={Register} />
//     </LoginStack.Navigator>
//   );
// }

// const RegisterStack = createStackNavigator();
// function RegisterStackScreen() {
//   return (
//     <RegisterStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <RegisterStack.Screen name="Register" component={Register} />
//     </RegisterStack.Navigator>
//   );
// }

// const ProfileStack = createStackNavigator();
// function ProfileStackScreen() {
//   return (
//     <ProfileStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <ProfileStack.Screen name="Profile" component={Profile} />
//     </ProfileStack.Navigator>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>

//       <Tab.Navigator
//         tabOptions={{
//           style: styles.tab,
//         }}
//       >
//         {/* <Tab.Screen name="Home" component={HomeStackScreen} /> */}
//         <Tab.Screen name="Login" component={LoginStackScreen} />
//         <Tab.Screen name="Register" component={RegisterStackScreen} />
//         <Tab.Screen name="Profile" component={ProfileStackScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }


// const styles = StyleSheet.create({
// tab: {
//   marginBottom: 15
// }
// })