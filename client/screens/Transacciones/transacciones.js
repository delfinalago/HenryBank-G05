import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView, StyleSheet, View, Text, Title, SafeAreaView, TextInput, FlatList, Image } from "react-native";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
import axios from "axios";
import { API } from "../../env.js";
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { forms as styles } from "../styles";
import {logoo} from "../../assets/logoo.png"

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



export default function transacciones({ navigation }) {

  const [transaction, setTransaction] = useState([]);



  useEffect(() => {
    AsyncStorage.getItem("@localUser")
      .then((data) => {
        const id = JSON.parse(data).id;
        axios.get(`${API}/api/accounts/mov`, { id: id })
          .then(({ data }) => {
            convert(data)
            setTransaction(data.reverse());
            console.log("transactions----------", transaction)

          })

          .catch((error) => {
            console.log(error);

          });
      })
  }, []);

  function convert(values) {
    var datearray = values.map((trans) => { trans.date = trans.date.slice(0, 10) })
    return datearray
  }

  return (



    <ScrollView >

      <LinearGradient
        // Button Linear Gradient
        colors={["#00f27c", "#384b99"]}
        start={[1, 0]}
        end={[0, 1]}
        style={styles.background}
      >
        {/* <View>

           <Image source={require('../../assets/logoo.png')} />
        </View> */}
        <View style={style.contact}>
        <Text style={style.titulo}>ULTIMOS MOVIMIENTOS</Text>
          {transaction.length
            ? transaction.map((u, i) => {
              return (
                <View key={i} style={style.contactCard} >

                  <View >
                    <Text style={style.tipo} >{u.type}</Text>
                    <Text style={style.fecha} > FECHA: {u.date}</Text>
                    
                    <Text style={style.description}>DETALLE: {u.description}</Text>
                    <Text style={style.monto} >${u.amount}</Text>
                  </View>

                </View>
              );
            })
            : null}

        </View>

      
      </LinearGradient>
    </ScrollView>


  );
}

const style = StyleSheet.create({
  titulo: {
    color: "#fff",
    paddingTop: 0,
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    // fontWeight: "bold",
    color: "#0002cd",
    fontFamily: "sans-serif-condensed",

  },
  contact: {
    justifyContent: "space-between",
    marginVertical: 4,
    // borderWidth: 1,
    borderRadius: 10,
    // borderColor: "#C0C0C0",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginHorizontal: 30,
    paddingVertical: 10,
    fontFamily: "sans-serif-condensed",
    marginTop: -180

  },
  contactCard: {
    justifyContent: "space-between",
    marginVertical: 4,
    borderWidth: 0,
    borderRadius: 10,
    borderColor: "#fff",
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 10,
    paddingVertical: 10,
    fontFamily: "sans-serif-condensed",
  },
  fecha: {
    // fontWeight: "bold",
    marginStart: 8,
    fontSize: 15,
    color: "#000000",
    alignItems: "center",
    paddingRight: 20,
    fontFamily: "sans-serif-condensed",
   
  },
  tipo: {
    fontWeight: "bold",
    color: "#000000",
    alignSelf: "center",
    fontSize: 20,
    paddingBottom: 5,
    // textDecorationLine: "underline",
    fontFamily: "sans-serif-condensed",
    fontStyle: "italic"
  },
  linearGradient: {
    height: "100%",
    width: "100%",
  },
  description: {
    fontSize: 15,
    color: "#332F23",
    marginStart: 10,
    color: "#C0C0C0",
    fontFamily: "sans-serif-condensed",
    // marginTop: -25,
    // display: "flex",
    // justifyContent: "space-between"

  },
  monto: {
    alignSelf: "flex-end",
    fontSize: 20,
    paddingRight: 15,
    color: "#000000",
    fontFamily: "sans-serif-condensed",


  },
 
})