import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { API } from "../../env.js";

import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Linking,
  TouchableOpacity
} from "react-native";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";

export default function addContact({ navigation }) {
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      alias: "",
      username: "",
    },
    onSubmit: () => {
      console.log("register params: ", values);

      axios
        .post(`${API}/api/contacts/associate`, values)
        .then(({ data }) => {
          console.log("VALUES = ", values);
          if (data.error) {
            alert(data.error);
          } else {
            console.log(data);
            navigation.navigate("Me");
          }
        })
        .catch((error) => console.log(error));
    },
  });

  const handleWhatsappPress = async () => {
    await Linking.openURL(
      "https://wa.me/?text= Hola!! Sumate a Veski, la nueva billetera virtual que hace tu vida mas facil @linkdeveski"
    );
  };

  return (
    <ScrollView style={styles.fondo}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#00f27c", "#384b99"]}
        start={[1, 0]}
        end={[0, 1]}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.title}> AGREGAR CONTACTO </Text>
          <TextInput
            onChangeText={handleChange("alias")}
            onSubmit={handleSubmit}
            value={values.alias}
            style={styles.input}
            placeholder="Nombre"
          />
          <TextInput
            onChangeText={handleChange("username")}
            onSubmit={handleSubmit}
            value={values.username}
            style={styles.input}
            placeholder="Email"
          />
          {/* <Button
            type="clear"
            onPress={handleSubmit}
            title="GUARDAR"
            containerStyle={{ backgroundColor: "#0002cd", alignItems: "center", marginHorizontal: 40 }}
          /> */}
            <TouchableOpacity
            mode="contained"
            title=""
            onPress={handleSubmit}
            style={styles.touchable}
          >
            <Text style={{  backgroundColor: "#0002cd", color: "#FFFFFF", textAlign: "center" , fontFamily: "sans-serif-condensed", padding: 10, borderRadius: 10, marginHorizontal: -50, marginTop: 25 }}>GUARDAR</Text>
          </TouchableOpacity>
          
          
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 25,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 40
  },
  background: {
    height: 520,
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
    fontFamily: "sans-serif-condensed",
    color: "#0002cd",
    marginBottom: 25
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
  touchable: {
    marginBottom: 50,
    marginHorizontal: 50,
    borderRadius: 10,
    fontSize: 20,
    color: "#FFFFFF",
  },
  buttonTitle: {
    fontSize: 20,
    color: "#FFFFFF",
    fontFamily: "sans-serif-condensed",
  },
  input: {
    marginVertical: 20,
    fontSize: 20,
    paddingHorizontal: 10,
   
  },
});
