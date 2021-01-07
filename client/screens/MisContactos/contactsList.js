import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Text,
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

  return (
    <ScrollView>
    
        <View style={styles.container}>
          <Card>
          <Button
            type="clear"
            title="Agregar Contacto"
            titleStyle={styles.buttonTitle}
            style={styles.boton}
            onPress={() => navigation.navigate("addContact")}
          />
          <Card.Divider  />
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
                      <ListItem styles={styles.List}
                        key={i}
                      />
                      <Text style={{ fontSize: 25, padding:10}}>{u.alias}</Text>
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
        </Card>
          <Button
            type="outline"
            onPress={() => navigation.goBack()}
            title="Volver"
            style={styles.botonvolver}
          />
      </View>
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
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    paddingEnd: 10,
  },
  botonvolver: {
    flex: 1,
    color: "#03bb85",
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  List: {
    width: 30,
  }
});
