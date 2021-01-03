import React, { useEffect, useState } from "react";
import {TouchableOpacity, ScrollView, StyleSheet, View, Text, SafeAreaView, TextInput, FlatList} from "react-native";
  import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
  import axios from "axios";
  import { API } from "../../env.js";
  import { LinearGradient } from 'expo-linear-gradient';
  import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

 
  

const list = [
  {
    avatar_url:"https://media.istockphoto.com/vectors/vector-of-cute-dog-head-cartoon-character-for-avatar-icon-or-symbol-vector-id1189777293",
    id: 1,
    date: "22 Jun",
    state: 1,
    type: 'Transaccion',
    description: 'Henry',
    amount: -6500,
    origin: "7",
    destiny: "3",
  },
  {
    avatar_url:"https://media.istockphoto.com/vectors/vector-of-cute-dog-head-cartoon-character-for-avatar-icon-or-symbol-vector-id1189777293",
    id: 1,
    date: "25 Mayo",
    state: 1,
    type: 'YPF',
    description: 'Carga de combustible',
    amount: 500,
    origin: "7",
    destiny: "3",
  },
  {
    avatar_url:"https://media.istockphoto.com/vectors/vector-of-cute-dog-head-cartoon-character-for-avatar-icon-or-symbol-vector-id1189777293",
    id: 1,
    date: "02 Abril",
    state: 1,
    type: 'Deposito',
    description: 'Pago de alquiler',
    amount: 15500,
    origin: "3",
    destiny: "1",
  },
  {
    avatar_url:"https://media.istockphoto.com/vectors/vector-of-cute-dog-head-cartoon-character-for-avatar-icon-or-symbol-vector-id1189777293",
    id: 1,
    date: "5 Mayo",
    state: 1,
    type: 'Recarga',
    description: 'Agrego 500 a mi cuenta',
    amount: 500,
    origin: "1",
    destiny: "9",
  },
  {
    avatar_url:"https://media.istockphoto.com/vectors/vector-of-cute-dog-head-cartoon-character-for-avatar-icon-or-symbol-vector-id1189777293",
    id: 1,
    date: "3 Agosto",
    state: 1,
    type: 'Envio dinero',
    description: 'Envio $800',
    amount: -800,
    origin: "2",
    destiny: "4",
  },
]

export default function transacciones({navigation}){

  const [transaction, setTransaction] = useState([]);
  const [num, setNum] = useState(0);

  useEffect(() => {
    axios
      .get(`${API}/api/transactions/mov`)
      .then(({ data }) => {
        setTransaction(data);
        console.log("el num es: ", num);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [num]);



    return (

  
      
    <ScrollView style= {{ backgroundColor: "#fff"}}> 
       
      {/* <LinearGradient
      // Background Linear Gradient
      colors={["#9FD5D1", "#03BD85"]}
      start={[0, 1]}
      end={[1, 0]}
      style={styles.linearGradient}
    >  */}
          <Card containerStyle={{marginHorizontal: 20, marginVertical: 20, }}>
            <Card.Title style={styles.titulo}>TRANSACCIONES</Card.Title>
              <Card.Divider />
                {list.length
                  ? list.map((u, i) => {
                    const { id_contact } = u;
                    return (
                      <View key={i} style={styles.contact}>
                          <ListItem key={i} bottomDivider>
                            <Avatar source={{uri: u.avatar_url}} />
                          <ListItem.Content>
                            <ListItem.Subtitle style={styles.fecha} >{u.date}</ListItem.Subtitle>
                            <Card.Divider/>
                            
                            <ListItem.Title style={styles.tipo} >{u.type}</ListItem.Title>
                            <ListItem.Subtitle style={styles.monto} >${u.amount}</ListItem.Subtitle>
                            <Text style={styles.description}>Detalle: {u.description}</Text>
                          </ListItem.Content>
                        </ListItem>
                      </View>
                    );
                  })
                : null}
        </Card>
      
     
          <Button
              type="outline"
              onPress={() => navigation.goBack()}
              title="Volver"
              style={styles.botonvolver}
          />
         
          {/* </LinearGradient> */}
  </ScrollView>     
  
   
    );
}

const styles = StyleSheet.create({
  titulo: {
    color: "#9c9c9c",
    paddingTop: 15,
    fontSize: 25,
  },
  contact: {
    justifyContent: "space-between",
    marginVertical: 4,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#00aae4",
  },
  fecha: {
    fontSize: 15,
    color: "#000000",
    alignItems: "flex-start",
    alignContent: "flex-start"
  },
  tipo: {
    alignSelf: "center",
    fontSize: 20,
    paddingBottom: 5,
    textDecorationLine: "underline",
  },
  linearGradient: {
    height: "100%",
    width: "100%",
  }, 
  description: {
    fontSize: 16,
    color: "#332F23",
    
  },
  monto:{
    alignSelf: "flex-end",
    fontSize: 20,
   
  },
  botonvolver: {
    color: "#03bb85",
    alignSelf: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 10,
    width: 80,
  }
})