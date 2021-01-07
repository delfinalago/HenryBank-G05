import React, { Component, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";

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
  Input,
} from "react-native";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
import Axios from "axios";
import { API } from "../../env.js";

export default function editContact({ route, navigation }) {
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      alias: "",
    },
    onSubmit: ({ alias }) => {
      const { id_contact } = route.params;
      console.log("contact id: ", route.params);
      axios
        .put(`${API}/api/contacts/modifContact`, { alias, id_contact })
        .then(() => {
          navigation.goBack();
        });
    },
  });

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
          <TextInput
            style={styles.input}
            name="alias"
            onChangeText={handleChange("alias")}
            placeholder="Cambiar nombre"
          />
          <Button
            type="clear"
            onPress={handleSubmit}
            title="Guardar"
            style={styles.boton}
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
    alignItems: "center",
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
  },
  buttonTitle: {
    fontSize: 20,
    paddingBottom: 20,
  },
  input: {
    marginVertical: 20,
    fontSize: 20,
  },
});
