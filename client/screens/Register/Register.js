// ALTA USER
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Button,
} from "react-native";

import Axios from "axios";
import { API } from "../../env.js";
const background = require("../../assets/Fondo1.png");

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function register({ navigation }) {
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      cellphone: "",
      dni: "",
      street: "",
      city: "",
      nacimiento: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(4, "El nombre ingresado debe tener mas de 4 caracteres")
        .max(50, "El nombre ingresado debe tener tener menos de 50 caracteres")
        .required("Campo requerido"),
      last_name: Yup.string()
        .min(4, "El nombre ingresado debe tener mas de 4 caracteres")
        .max(50, "El nombre ingresado debe tener tener menos de 50 caracteres")
        .required("Campo requerido"),
      cellphone: Yup.string()
        .required("Ingrese su numero de telefono")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Numero de telefono no valido"
        ),
    }),
    onSubmit: async () => {
      const { email: username, password } = await AsyncStorage.getItem(
        "@localUserStore"
      ).then((info) => {
        if (info) {
          return JSON.parse(info);
        } else {
          alert(
            "hubo un probleba con tu email, pero podras recibir un nuevo codigo"
          );
        }
      });

      Axios.post(`${API}/api/registration/create_users`, {
        ...values,
        username,
        password,
      })
        .then(({ data }) => {
          if (data.error) {
            alert(data.error);
          } else {
            console.log(data);
            navigation.navigate("Profile");
          }
        })
        .catch((error) => console.log(error));
    },
  });

  return (
    <ScrollView style={styles.scrollView}>
      <View style={{ backgroundColor: "#FFF", height: "100%" }}>
        <ImageBackground source={background} style={styles.image}>
          <Text style={styles.title}>Alta de cliente</Text>

          <Text style={styles.subtitle}>
            Complete los campos para registrarse.
          </Text>

          <TextInput
            placeholder="Nombre"
            placeholderTextColor="#fff"
            onChangeText={handleChange("first_name")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={values.first_name}
            id="first_name"
            name="first_name"
            style={styles.input}
          />

          {touched.first_name && errors.first_name ? (
            <Text>{errors.first_name}</Text>
          ) : null}

          <TextInput
            placeholder="Apellido"
            placeholderTextColor="#fff"
            onChangeText={handleChange("last_name")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            id="last_name"
            name="last_name"
            value={values.last_name}
            style={styles.input}
          />
          {touched.last_name && errors.last_name ? (
            <Text>{errors.last_name}</Text>
          ) : null}

          <TextInput
            placeholder="Telefono"
            placeholderTextColor="#fff"
            onChangeText={handleChange("cellphone")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={values.cellphone}
            keyboardType="numeric"
            id="cellphone"
            name="cellphone"
            style={styles.input}
          />
          {touched.cellphone && errors.cellphone ? (
            <Text>{errors.cellphone}</Text>
          ) : null}

          <TextInput
            placeholder="DNI"
            placeholderTextColor="#fff"
            onChangeText={handleChange("dni")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={values.dni}
            keyboardType="numbers-and-punctuation"
            id="dno"
            name="dni"
            style={styles.input}
          />

          <TextInput
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#fff"
            onChangeText={handleChange("nacimiento")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={values.nacimiento}
            id="nacimiento"
            name="nacimiento"
            style={styles.input}
          />

          <TextInput
            placeholder="Direccion"
            placeholderTextColor="#fff"
            onChangeText={handleChange("street")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={values.street}
            id="street"
            name="street"
            style={styles.input}
          />

          <TextInput
            placeholder="Ciudad"
            placeholderTextColor="#fff"
            onChangeText={handleChange("city")}
            onChange={handleChange}
            id="city"
            name="city"
            onSubmit={handleSubmit}
            value={values.city}
            style={styles.input}
          />

          <TouchableOpacity
            mode="contained"
            secureTextEntry={true}
            title="Register"
            onPress={handleSubmit}
            style={styles.boton}
          >
            <Text>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Go back"
            onPress={() => navigation.goBack()}
            style={styles.boton}
          >
            <Text>Volver</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 50,
  },
  input: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 3,
    marginTop: 50,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2,
  },
  boton: {
    backgroundColor: "#FFF",
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: "#00716F",
    paddingVertical: 10,
    borderRadius: 23,
  },
  title: {
    paddingTop: 30,
    fontSize: 50,
    alignSelf: "center",
    color: "#FFF",
    fontFamily: "",
  },
  subtitle: {
    fontFamily: "",
    fontSize: 20,
    marginHorizontal: 55,
    textAlign: "center",
    marginTop: 10,
    opacity: 0.8,
    color: "#FFF",
  },
});
