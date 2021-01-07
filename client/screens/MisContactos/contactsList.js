import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
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
    await Linking.openURL("https://wa.me/?text= Hola!! Sumate a Veski, la nueva billetera virtual que hace tu vida mas facil @linkdeveski");

   }
 

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
          <Button
            type="clear"
            title="Agregar Contacto"
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
                      <Text style={{ fontSize: 25 }}>{u.alias}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      title="delete"
                      onPress={() => handleDelete(id_contact)}
                    >
                      <Text style={styles.delete}>Eliminar</Text>
                    </TouchableOpacity>
                    
                  </View>
                );
              })
            : null}

        <Text style={{ alignSelf: "center",marginTop: 20 }}>
          El usuario que buscas aun no es cliente de Veski? Podes enviar una invitacion
        </Text>
        <Button
            type="outline"
            title="Invitar"
            style={styles.boton}
            onPress={handleWhatsappPress}
          />
  
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 10,
  },
  background: {
    height: 680,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
  },
  contacts: {
    marginTop: 5,
    fontSize: 20,
    alignSelf: "center",
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
    marginLeft: 15,
  },
  delete: {
    color: "#000000",
    padding: 5,
    alignSelf: "center",
    marginRight: 30,
  },
  boton: {
    flex: 1,
    color: "#03bb85",
    alignSelf: "center",
    backgroundColor: "#fff",
  buttonTitle: {
    fontSize: 20,
    paddingBottom: 20,
  },
}
});