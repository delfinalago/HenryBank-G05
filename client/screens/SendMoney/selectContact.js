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

        <View style={styles.container}>
          <Text style={styles.textSub}>
            SELECCIONA UN CONTACTO 
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
                <Text style={styles.textButton}>ENVIAR</Text>
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
    // borderWidth: 1,
    borderRadius: 10,
    // borderColor: "#C0C0C0",
     backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 150
  },

  title: {
    fontSize: 26,
    fontFamily: "sans-serif-condensed",
    // marginTop: 30
  },

  contact: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    height: 60,
    borderRadius: 8,
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 15,
    paddingVertical: 10,
    fontFamily: "sans-serif-condensed",
  },

  textContact: {
    marginLeft: 20,
    fontSize: 20,
    fontFamily: "sans-serif-condensed",
  },
  textSub: {
    fontSize: 26,
    textAlign: "center",
    // marginLeft: 20,
    marginBottom: 40,
    fontFamily: "sans-serif-condensed",
    color: "#0002cd"
  },
  textButton: {
    fontSize: 15,
    color: "#0002cd",
    fontFamily: "sans-serif-condensed",
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