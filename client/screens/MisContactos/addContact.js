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
          <Text style={styles.title}>Agregar Contacto </Text>
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
          <Button
            type="solid"
            onPress={handleSubmit}
            title="Guardar"
            containerStyle={styles.boton}
          />
          <Text style={{ alignSelf: "center", marginTop: 20 }}>
            No es cliente de Veski? Podes enviar una invitacion
          </Text>
          <Button
            type="clear"
            title="Invitar"
            titleStyle={styles.buttonTitle}
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
    paddingHorizontal: 15,
    paddingVertical: 40,
  },
  background: {
    height: 680,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    alignSelf: "center",
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
    marginBottom: 50,
    marginHorizontal: 50,
    borderRadius: 10,
    fontSize: 20,
  },
  buttonTitle: {
    fontSize: 20,
  },
  input: {
    marginVertical: 20,
    fontSize: 20,
  },
});
