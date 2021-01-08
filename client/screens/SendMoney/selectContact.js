import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Axios from "axios";
import { API } from "../../env.js";
const { width, height } = Dimensions.get("window");
import { LinearGradient } from 'expo-linear-gradient';

export default function SelectContact({ navigation }) {
  const [contacts, setContacts] = useState([{}]);

  useEffect(() => {
    Axios.get(`${API}/api/contacts/all `)
      .then(({ data }) => {
        if (data.error) {
          alert(data.error);
        } else {
          setContacts(data);
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

    <ScrollView style={styles.scrollView}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#00f27c", "#384b99"]}
        start={[1, 0]}
        end={[0, 1]}
        style={styles.background}
      >

        <View styles={styles.container}>
          <Text style={styles.textSub}>
            Seleccioná un contacto para enviarle dinero
              </Text>
          {contacts.map((contact, i) => (
            <View key={i} style={styles.contact}>
              <Text style={styles.textContact}>{contact.alias}</Text>

              <TouchableOpacity
                mode="contained"
                secureTextEntry={true}
                title=""
                onPress={() =>
                  navigation.navigate("SendMoney", {
                    id_contact: contact.id_contact,
                  })
                }
                style={styles.touchable}
              >
                <Text style={styles.textButton}>Enviar dinero</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </LinearGradient>
    </ScrollView >

  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: height,
  },
  container: {

    justifyContent: "space-between",
    marginVertical: 4,
    borderWidth: 0,
    borderRadius: 30,
    borderColor: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginHorizontal: 10,
    paddingVertical: 10
  },

  title: {
    fontSize: 32,
  },

  contact: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    height: 60,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginHorizontal: 30,
    paddingVertical: 10
  },

  textContact: {
    marginLeft: 20,
    fontSize: 20,
  },
  textSub: {
    fontSize: 32,
    alignSelf: "center",
    marginLeft: 30,
    marginBottom: 40
  },
  textButton: {
    fontSize: 15,
  },

  touchable: {
    color: "#000000",
    alignItems: "center",
    marginRight: 20
  },
  background: {
    height: height + 50,
    justifyContent: "center",

  },
});
