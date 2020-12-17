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
                  <View key={i}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("editContact", {
                          id_contact,
                        })
                      }
                    >
                      <ListItem
                        key={i}
                        title={u.alias}
                        leftAvatar={{
                          source: {
                            uri:
                              "https://media.istockphoto.com/vectors/vector-of-cute-dog-head-cartoon-character-for-avatar-icon-or-symbol-vector-id1189777293",
                          },
                        }}
                      />
                    </TouchableOpacity>
                    <Button
                      title="delete"
                      onPress={() => handleDelete(id_contact)}
                    />
                  </View>
                );
              })
            : null}
        </Card>
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
    color: "#00aae4",
    alignSelf: "center",
  },
  boton: {
    marginBottom: 5,
    flex: 1,
    color: "#03bb85",
    alignSelf: "flex-end",
    backgroundColor: "#fff",
  },
});
