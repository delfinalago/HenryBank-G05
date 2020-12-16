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
    const clientID = 1; //Harcodeado, cambiar a llamado a asyncstorage
    Axios.get(`${API}/api/contacts/allcontacts`, clientID)
      .then(({ data }) => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data);
          setContacts(data.values[0]);
        }
      })
      .catch((error) => console.log(error));
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
    <ScrollView>
      <View>
        {contacts.map((contact, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: contact.avatar_url }} />
            <ListItem.Content>
              <ListItem.Title>
                {contact.first_name + " " + contact.last_name}
              </ListItem.Title>
              <ListItem.Subtitle>{contact.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
