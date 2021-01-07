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
import { forms as styles } from "../styles";
import { LinearGradient } from "expo-linear-gradient";


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
            navigation.navigate("Login");
          }
        })
        .catch((error) => console.log(error));
    },
  });

  return (
    <ScrollView>
       <View style={styles.container}>
          <LinearGradient
          colors={["#00f27c", "#384b99"]}
          start={[1, 0]}
          end={[0, 1]}
          style={styles.background}
          >
      
        <Text style={style.title}>Registrarse</Text>

        <Text style={style.subtitle}>
          ¡Complete los campos para registrarse!
        </Text>

        <TextInput
          placeholder="Nombre"
          placeholderTextColor="#00aae4"
          onChangeText={handleChange("first_name")}
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={values.first_name}
          id="first_name"
          name="first_name"
          style={style.input}
        />

        {touched.first_name && errors.first_name ? (
          <Text>{errors.first_name}</Text>
        ) : null}

        <TextInput
          placeholder="Apellido"
          placeholderTextColor="#00aae4"
          onChangeText={handleChange("last_name")}
          onChange={handleChange}
          onSubmit={handleSubmit}
          id="last_name"
          name="last_name"
          value={values.last_name}
          style={style.input}
        />
        {touched.last_name && errors.last_name ? (
          <Text>{errors.last_name}</Text>
        ) : null}

        <TextInput
          placeholder="Telefono"
          placeholderTextColor="#00aae4"
          onChangeText={handleChange("cellphone")}
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={values.cellphone}
          keyboardType="numeric"
          id="cellphone"
          name="cellphone"
          style={style.input}
        />
        {touched.cellphone && errors.cellphone ? (
          <Text>{errors.cellphone}</Text>
        ) : null}

        <TextInput
          placeholder="DNI"
          placeholderTextColor="#00aae4"
          onChangeText={handleChange("dni")}
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={values.dni}
          keyboardType="numeric"
          id="dno"
          name="dni"
          style={style.input}
        />

        <TextInput
          placeholder="AAAA/MM/DD"
          placeholderTextColor="#00aae4"
          onChangeText={handleChange("nacimiento")}
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={values.nacimiento}
          id="nacimiento"
          name="nacimiento"
          style={style.input}
        />

        <TextInput
          placeholder="Dirección"
          placeholderTextColor="#00aae4"
          onChangeText={handleChange("street")}
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={values.street}
          id="street"
          name="street"
          style={style.input}
        />

        <TextInput
          placeholder="Ciudad"
          placeholderTextColor="#00aae4"
          onChangeText={handleChange("city")}
          onChange={handleChange}
          id="city"
          name="city"
          onSubmit={handleSubmit}
          value={values.city}
          style={style.input}
        />

        <TouchableOpacity
          mode="contained"
          secureTextEntry={true}
          title="Register"
          onPress={handleSubmit}
          style={style.boton}
        >
          <Text style={{color: "#fff" , fontSize: 20}}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Go back"
          onPress={() => navigation.goBack()}
          style={style.boton}
        >
          <Text style={{color: "#fff" , fontSize: 20}}>Volver</Text>
        </TouchableOpacity>
      
      </LinearGradient>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
   container: {
    marginTop: 60,
    flex: 1,
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 30,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 50,
  },
  input: {
    flexDirection: "row",
    marginTop: 60,
    flex: 1,
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 30,
    marginHorizontal: 60,
    fontWeight: "bold",
    paddingLeft: 25,
    fontSize: 20,
  },
  boton: {
    color: "#fff",
    marginHorizontal: 130,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#00aae4",
  },
  title: {
    paddingTop: 30,
    fontSize: 50,
    alignSelf: "center",
    color: "#FFF",
    fontWeight: "bold",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 55,
    textAlign: "center",
    marginTop: 10,
    opacity: 0.8,
    color: "#FFF",
  },
});
