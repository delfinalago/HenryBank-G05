import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BaseIcon from "../Profile/Icon";
import {logoo} from "../../assets/logoo.png"
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Linking,
  Image
} from "react-native";

import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
import axios from "axios";
import { API } from "../../env.js";


export default function contactos({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/api/contacts/all`)
      .then(({ data }) => {
        setContacts(data);
        console.log("el reload es: ", reload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  const handleDelete = (id_contact) => {
    axios
      .delete(`${API}/api/contacts/delete?id_contact=${id_contact}`)
      .then(() => {
        setReload(!reload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleWhatsappPress = async () => {
    await Linking.openURL(
      "https://wa.me/?text= Hola!! Sumate a Veski, la nueva billetera virtual que hace tu vida mas facil @linkdeveski"
    );
  };

  return (
    <ScrollView>
      <LinearGradient
        // Button Linear Gradient
        colors={["#00f27c", "#384b99"]}
        start={[1, 0]}
        end={[0, 1]}
        style={styles.background}
      >
        <View style={styles.container}>
        {/* <View style={styles.img}>
      <Image source={require('../../assets/logoo.png')} /> */}
        <Text style={{fontSize: 30, color: "#0002cd",  fontFamily: "sans-serif-condensed", alignSelf: "center" }}> 
          CONTACTOS
          </Text>
          {/* </View> */}
          <Button
            type="clear"
            title=" + NUEVO CONTACTO"
            titleStyle={styles.buttonTitle}
            style={styles.boton}
            onPress={() => navigation.navigate("addContact")}
          />
          {contacts.length
            ? contacts.map((u, i) => {
                const { id_contact } = u;
                return (
                  <View key={i} style={styles.contact}>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() =>
                        navigation.navigate("editContact", {
                          id_contact,
                          
                        })
                      }
                     
                    >

                      <Text style={{ fontSize: 20, marginLeft: 10,  fontFamily: "sans-serif-condensed" }}>{u.alias}</Text>
                      
                    </TouchableOpacity>
                    <Button
                      title=""
                      type= "clear"
                      onPress={() => navigation.navigate("editContact")}
                      containerStyle={styles.listItem}
                      icon={
                        <BaseIcon
                          containerStyle={{ backgroundColor: "#0002cd", width: 50, height:50,  marginBottom: 50, marginLeft: 50, position: "absolute" }}
                          icon={{
                            type: "font-awesome",
                            name: "edit",
                          }}
                        />
                      }
                    >
                    
                      
                    </Button>
                    {/* <Text style={styles.listItem}>EDITAR</Text> */}

                    <TouchableOpacity
                      title="delete"
                      onPress={() => handleDelete(id_contact)}
                      
                    >
                      <Text style={styles.delete}>ELIMINAR</Text>
                      
                    </TouchableOpacity>
                  </View>
                );
              })
            : null}


              <TouchableOpacity
            mode="contained"
            secureTextEntry={true}
            title=""
             onPress={handleWhatsappPress}
            style={{ borderWidth: 0, marginTop: 5}}
          >
            <Text style={{ color: "#000000", fontSize: 17, textAlign: "center",   fontFamily: "sans-serif-condensed", marginTop: 20 }}> El usuario que buscas aún no es cliente de Veski? Podés enviarle una invitación AQUI</Text>
          </TouchableOpacity>
        {/* <Button
            type="outline"
            
            style={styles.boton}
            onPress={handleWhatsappPress}
          /> */}
  
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 10,
    fontFamily: "sans-serif-condensed",
    paddingVertical: 50,
    marginVertical: -20,
    // borderWidth: 1,
    // borderColor: "#C0C0C0",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    
  },
  background: {
    height: 520,
    justifyContent: "center",
    fontFamily: "sans-serif-condensed",
  },
  title: {
    fontSize: 32,
    fontFamily: "sans-serif-condensed",
    marginBottom: 50,

  },
  // contacts: {
  //   marginTop: 5,
  //   fontSize: 40,
  //   alignSelf: "center",
  //   fontFamily: "sans-serif-condensed",
  //   margin: 2
  //   // marginHorizontal: 30
  // },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    padding : 10,
    marginTop: -4,
    paddingHorizontal: 0,
    marginRight: -2,
    fontFamily: "sans-serif-condensed",
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 8,
    
 
  },
  // img: {
  //   marginTop: -20,
 
  // },
   listItem: {
    color: "#0002cd",
    padding: 5,
    // alignSelf: "center",
    marginRight: -30,
    fontFamily: "sans-serif-condensed",
    position: "absolute",
    alignItems: "center",
    marginLeft: 188,
    marginRight: 15
   
  },
  delete: {
    color: "#0002cd",
    padding: 5,
    alignSelf: "center",
    marginRight: 30,
    fontFamily: "sans-serif-condensed",
    marginRight: 10
  },
  boton: {
    flex: 1,
    color: "#0002cd",
    alignSelf: "center",
    backgroundColor: "#fff",
    fontFamily: "sans-serif-condensed",
    
  },
  buttonTitle: {
    fontSize: 18,
    // paddingBottom: 20,
    marginTop: 20,
    margin: 10,
    marginLeft: 110,
    marginRight: -25,
    fontFamily: "sans-serif-condensed",
    color: "#000000",
    borderBottomWidth:2,
    borderLeftWidth:2,
    borderRadius: 4,
    // borderColor: "#000000",
    fontWeight: "bold",
  },

  
});
