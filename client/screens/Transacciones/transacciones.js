import React, { useEffect, useState } from "react";
import {TouchableOpacity, ScrollView, StyleSheet, View, Text, Title, SafeAreaView, TextInput, FlatList} from "react-native";
  import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
  import axios from "axios";
  import { API } from "../../env.js";
  import { LinearGradient } from 'expo-linear-gradient';
  import { Dimensions } from "react-native";
  import AsyncStorage from "@react-native-async-storage/async-storage";

  import { forms as styles } from "../styles";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



export default function transacciones({navigation}){

  const [transaction, setTransaction] = useState([]);
  
 

  useEffect(() => {
    AsyncStorage.getItem("@localUser")
    .then((data) => {
      const id = JSON.parse(data).id;
      console.log("ONSUBMIT--------", id);

      axios.get(`${API}/api/accounts/mov` , {id : id})
      .then(({ data }) => {
        setTransaction(data);
        console.log("data:", data );
        convert(data)
      })  

      .catch((error) => {
        console.log(error);
      
      });
    })
  }, []);

  // function convert(data){
  //   var datearray = data.forEach(data.ts.split("/"))
  //   var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
  //   console.log(data.ts)
  //   console.log(newdate)
  //    return newdate;
  // }

    return (

  
      
    <ScrollView style= {{ backgroundColor: "#fff"}}> 
       
       <LinearGradient
        // Button Linear Gradient
        colors={["#00f27c", "#384b99"]}
        start={[1, 0]}
        end={[0, 1]}
        style={styles.background}
      >
        <View>
          
            <Text style={style.titulo}>TRANSACCIONES</Text>
            </View>
              <View style={style.contact}>
                {transaction.length
                  ? transaction.map((u, i) => {
                    return (
                      <View key={i} >
                          
                          <View Style={style.contact}>
                            <Card.Divider/>
                            <Text style={style.fecha} >{u.date}</Text>
                           
                            
                            <Text style={style.tipo} >{u.type}</Text>
                            <Text style={style.monto} >${u.amount}</Text>
                            <Text style={style.description}>Detalle: {u.description}</Text>
                          </View>
                      
                      </View>
                    );
                  })
                : null}
       
              </View>
     
          <TouchableOpacity
              type="outline"
              onPress={() => navigation.goBack()}
              title="Volver"
              style={style.botonvolver}
          >
          <Text style={style.volver}>Volver</Text>
          </TouchableOpacity>
         
          </LinearGradient>
  </ScrollView>     
  
   
    );
}

const style = StyleSheet.create({
  titulo: {
    color: "#fff",
    paddingTop: 10,
    fontSize: 40,
    alignSelf: "center",
    margin:20,
    fontWeight: "bold",
    
  },
  contact: {
    justifyContent: "space-between",
    marginVertical: 4,
    borderWidth: 2,
    borderRadius:30,
    borderColor: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    margin: 60,

  },
  fecha: {
    marginStart: 15,
    fontSize: 15,
    color: "#000000",
    alignItems: "center",
    paddingRight: 20,
  },
  tipo: {
    fontWeight: "bold",
    color: "#000000",
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
    marginStart: 15,
    color: "#000000",
    
  },
  monto:{
    alignSelf: "flex-end",
    fontSize: 20,
    paddingRight: 15,
    color: "#000000",

   
  },
  botonvolver: {
    marginHorizontal: 130,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#00aae4",
  },
  volver: {
    color:"#fff"
  }
})