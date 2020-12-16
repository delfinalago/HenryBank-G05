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
import { Card, ListItem, Button, Icon,Avatar } from 'react-native-elements'


const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Rocco',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'loco'
  },
  {
    name: 'Circe',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Lago'
  },
];



export default function contactos({ navigation }) {

        
    
      return ( 
        <ScrollView style={styles.fondo}>
         <View style={{ flex: 1}}>
        <SafeAreaView />
            <TextInput
            placeholder= "Search"
            placeholderTextColor= "#dddddd"
            style={styles.input}
            />
         <View style={{flex:1, backgroundColor: "#fff"}}>
          <Card>
           <Card.Title style={styles.contacts}>MIS CONTACTOS</Card.Title>
           <Card.Divider/>
           <Button type="outline"  title="Agregar Contacto" style={styles.boton}  onPress={() => navigation.navigate("addContact")}/>
           <Card.Divider/>
            {
          list.map((u, i) => {
          return ( 
          <View key={i}>
          <TouchableOpacity onPress={() => navigation.navigate("editContact")}>
          <ListItem
          key={i}
          roundAvatar
          title={u.name}
          leftAvatar={{ source: { uri: 'https://media.istockphoto.com/vectors/vector-of-cute-dog-head-cartoon-character-for-avatar-icon-or-symbol-vector-id1189777293' } }}
          />
         </TouchableOpacity>
          
        </View>
      );
    })
  }
</Card>
          </View>
        </View>
        </ScrollView>
       
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
      marginTop: 5,
      fontSize: 20,
      color: "#00aae4",
      alignSelf: "center"
    },
    boton: {
      marginBottom: 5,
      flex : "row",
      color:"#03bb85",
      alignSelf: "flex-end",
      backgroundColor: "#fff",
    }
  });