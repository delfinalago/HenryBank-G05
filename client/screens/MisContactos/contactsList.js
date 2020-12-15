
import React, { Component, useEffect } from 'react'
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,  
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native'
import * as Contacts from 'expo-contacts';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    nombre: 'First Item',
    correo: "pepe.lopez@gmail.com"
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    nombre: 'Second Item',
    correo: "Rocco.loco@gmail.com"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    nombre: 'Third Item',
    correo: "circe@gmail.com"
  },
];




export default function contactos({ navigation }) {
 
    
      return ( 
      <View style={{ flex: 1}}>
        <SafeAreaView style={styles.fondo}/>
            <TextInput
            placeholder= "Search"
            placeholderTextColor= "#dddddd"
            style={styles.input}
            />
         <View style={{flex:1, backgroundColor: "#fff"}}>
        
          <Text style={styles.contacts} >Contacts</Text>

       


          </View>
        </View>
       
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fondo: {
        backgroundColor: "#fff"
    },
    input: {
        backgroundColor: "#fff",
        height: 50,
        fontSize: 36,
        padding: 10,
        color: "#000000",
        borderBottomWidth: 0.5,
        borderBottomColor: "#7d90a0"

        
    },
    containers: {
      flex: 1,
      marginTop: 10,
      
    },
    item: {
      backgroundColor: '#fff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    contacts: {
      marginTop: 15,
      fontSize: 30,
      color: "#000000",
      alignSelf: "center"
    }
  });