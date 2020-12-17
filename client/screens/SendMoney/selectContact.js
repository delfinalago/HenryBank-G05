import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Axios from "axios";
import { API } from "../../env.js";
const { width, height } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SelectContact({ navigation }) {
  const [contacts, setContacts] = useState([{}]);

  useEffect(() => {
    AsyncStorage.getItem("@localUser").then((data) => {
      if (data) {
        let storage = JSON.parse(data);
        console.log("storage---------", storage.id);
        Axios.get(`${API}/api/contacts/all `, storage.id)
          .then(({ data }) => {
            if (data.error) {
              alert(data.error);
            } else {
              console.log(data);
              setContacts(data.values[0]);
            }
          })
          .catch((error) => console.log(error));
      }
    });
  }, []);

  const [selected, setSelected] = useState({
    first_name: "",
    last_name: "",
    email: "",
    accounts: {},
    phone: "",
    username: "",
  });

  const handleSelect = (contact) => {
    setSelected(contact);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.textSub}>
          Seleccioná un contacto para enviarle dinero
        </Text>
      </View>
      <View style={styles.container}>
        {contacts.map((contact, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: contact.avatar_url }} />
            <ListItem.Content>
              <ListItem.Title>{contact.alias}</ListItem.Title>
              <ListItem.Subtitle>
                <TouchableOpacity
                  mode="contained"
                  secureTextEntry={true}
                  title=""
                  onPress={() => navigation.navigate("SendMoney")}
                  style={styles.button}
                >
                  <Text>Enviar dinero</Text>
                </TouchableOpacity>
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  textTitle: {
    fontSize: 40,
  },
  textSub: {
    fontSize: 20,
  },
  input: {
    alignItems: "center",
    width: "auto",
    height: 50,
    marginHorizontal: 10,
    borderWidth: 2,
    marginTop: 120,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 10,
    paddingVertical: 2,
  },
  button: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#00716F",
    paddingVertical: 10,
    borderRadius: 23,
  },
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
    backgroundColor: "#FFF",
    height: "100%",
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});
