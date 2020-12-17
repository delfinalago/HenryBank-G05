import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { API } from "../../env.js";
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

  return (
    <ScrollView style={styles.fondo}>
      <View>
        <Text style={styles.title}>Agregar Contacto : </Text>
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
      </View>
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
