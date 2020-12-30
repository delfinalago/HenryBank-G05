import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";

import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
import axios from "axios";
import { API } from "../../env.js";

export default function contactos({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [num, setNum] = useState(0);

  useEffect(() => {
    axios
      .get(`${API}/api/contacts/all`)
      .then(({ data }) => {
        setContacts(data);
        console.log("el num es: ", num);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [num]);

  const handleDelete = (id_contact) => {
    axios
      .delete(`${API}/api/contacts/delete?id_contact=${id_contact}`)
      .then(({ data }) => setNum(num + 1));
  };

  return (
    <ScrollView style={styles.fondo}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Card>
          <Card.Title style={styles.contacts}>MIS CONTACTOS</Card.Title>
          <Card.Divider />
          <Button
            type="outline"
            title="Agregar Contacto"
            style={styles.boton}
            onPress={() => navigation.navigate("addContact")}
          />
          <Card.Divider />
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
                      <ListItem
                        key={i}
                        leftAvatar={{
                          source: {
                            uri:
                              "https://media.istockphoto.com/vectors/vector-of-cute-dog-head-cartoon-character-for-avatar-icon-or-symbol-vector-id1189777293",
                          },
                        }}
                      />
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fondo: {
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    height: 50,
    fontSize: 36,
    padding: 10,
    color: "#000000",
    borderBottomWidth: 0.5,
    borderBottomColor: "#7d90a0",
  },
  containers: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: "#fff",
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
    alignSelf: "center",
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00aae4",
  },
  delete: {
    color: "red",
    borderColor: "red",
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    marginRight: 30,
  },
  boton: {
    flex: 1,
    color: "#03bb85",
    alignSelf: "flex-end",
    backgroundColor: "#fff",
  },
  botonvolver: {
    flex: 1,
    color: "#03bb85",
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingTop: 10,
  }
});
