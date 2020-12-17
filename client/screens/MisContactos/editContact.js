import React, { Component, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { API } from "../../env";
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
import {API} from "../../env.js"

export default function editContact({ route, navigation }) {
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      alias: "",
    },
    onSubmit: ({ alias }) => {
      const { id_contact } = route.params;
      console.log("contact id: ", route.params);
      axios.put(`${API}/api/contacts/modifContact`, { alias, id_contact });
    },
  });

  return (
    <ScrollView style={styles.fondo}>
      <View>
        <Text style={styles.title}>Editar Contacto</Text>
        <Text style={styles.text}>Nombre</Text>
        <TextInput
          style={styles.input}
          name="alias"
          onChangeText={handleChange("alias")}
          placeholder="Cambiar Nombre"
        />
      </View>
      <Button
        type="outline"
        onPress={handleSubmit}
        title="Guardar"
        style={styles.boton}
      />
       <Button
        type="outline"
        onPress={handleSubmit}
        title="Borrar"
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
  title: {
    marginTop: 15,
    fontSize: 30,
    color: "#00aae4",
    alignSelf: "center",
  },
  text: {
    marginBottom: 5,
    color: "#00aae4",
    fontSize: 20,
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
});
