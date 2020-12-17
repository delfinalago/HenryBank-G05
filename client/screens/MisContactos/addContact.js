import React, { Component, useEffect, useState } from "react";
import { useFormik } from "formik";
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
import Axios from 'axios';
import {API} from '../../env.js';

export default function addContact({ navigation }) {

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      alias: ""
    },
    onSubmit: async () => {
      console.log("register params: ", values);

      Axios.post(`${API}/api/contacts/associateContact`, {
        ...values,
        alias
      })
        .then(({ data }) => {
          console.log("VALUES=", values)
          if (data.error) {
            alert(data.error);
          } else {
            console.log(data);
          }
        })
        .catch((error) => console.log(error));
    
    },
  });

  return (
    <ScrollView style={styles.fondo}>
      <Card>
        <Card.Title style={styles.title}>Agregar Contacto : </Card.Title>
        <Card.Divider />
        <TextInput
          onChangeText={handleChange("alias")}
          onSubmit={handleSubmit}
          value={values.alias}
          style={styles.input}
          placeholder="Nombre"
        />
        <Card.Divider />
        <TextInput
          onChangeText={handleChange("username")}
          onSubmit={handleSubmit}
          value={values.username}
          style={styles.input}
          placeholder="Email"
        />
      </Card>
      <Button
        type="outline"
        onPress={handleSubmit}
        title="Guardar"
        style={styles.boton}
      />
      <Button
        type="outline"
        onPress={() => navigation.goBack()}
        title="Volver"
        style={styles.boton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    backgroundColor: "#fff",
    height: 100,
  },
  title: {
    marginTop: 15,
    fontSize: 30,
    color: "#00aae4",
    alignSelf: "center",
  },
  input: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    borderWidth: 3,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: "#00aae4",
    borderRadius: 23,
  },
  boton: {
    paddingTop: 15,
    marginBottom: 5,
    flex: 1,
    color: "#03bb85",
    marginLeft: 60,
    marginRight: 60,
    backgroundColor: "#fff",
  },
});
