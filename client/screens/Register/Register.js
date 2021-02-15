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
  Dimensions
} from "react-native";
import { forms as styles } from "../styles";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");


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
        .min(4, "El nombre ingresado debe tener más de 4 caracteres")
        .max(50, "El nombre ingresado debe tener tener menos de 50 caracteres")
        .required("Campo requerido"),
      last_name: Yup.string()
        .min(4, "El nombre ingresado debe tener más de 4 caracteres")
        .max(50, "El nombre ingresado debe tener tener menos de 50 caracteres")
        .required("Campo requerido"),
      cellphone: Yup.string()
        .required("Ingrese su número de teléfono")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Número de teléfono no válido"
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
            "Ups! Se produjo un problema al momento de ingresar el email pero podras recibir un nuevo código"
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
    
          <LinearGradient
          colors={["#00f27c", "#384b99"]}
          start={[1, 0]}
          end={[0, 1]}
          // style={styles.background}
          >
      
      <View style={style.container}>
        <Text style={style.title}>REGISTRA TUS DATOS</Text>

        <Text style={style.subtitle}>
          ¡Completa los campos!
        </Text>

        <TextInput
          placeholder="Nombre"
          placeholderTextColor="#C0C0C0"
          onChangeText={handleChange("first_name")}
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={values.first_name}
          id="first_name"
          name="first_name"
          style={style.input}
        />


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
          placeholder="Apellido"
          placeholderTextColor="#C0C0C0"
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
          placeholderTextColor="#C0C0C0"
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
          placeholderTextColor="#C0C0C0"
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
          placeholderTextColor="#C0C0C0"
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
          placeholderTextColor="#C0C0C0"
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
          placeholderTextColor="#C0C0C0"
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
          <Text style={{color: "#fff" , fontSize: 16, fontFamily: "sans-serif-condensed"}}>ENVIAR</Text>
        </TouchableOpacity>
    
        </View>
      </LinearGradient>
      
    
    </ScrollView>
    
  );
}

const style = StyleSheet.create({

  container: {
    marginTop: 30,

    flex: 1,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "rgb(255, 255, 255)",
    paddingVertical: 18,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontFamily: "sans-serif-condensed"
  },
  input: {
    flexDirection: "row",

    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "rgb(255, 255, 255)",
    paddingVertical: 5,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingLeft: 10,
    fontSize: 15,
    borderColor: "#C0C0C0",
    opacity: 0.8,
    fontFamily: "sans-serif-condensed",
    height: 45,
    

  },
  boton: {
    color: "#fff",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#0002cd",
  },
  title: {
    marginTop: -5,
    fontSize: 28,
    alignSelf: "center",
    color: "#0002cd",
    // fontWeight: "bold",
    fontFamily: "sans-serif-condensed"

  },
  subtitle: {
    // fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 35,
   textAlign: "center",
    marginHorizontal: 55,
    marginTop: 2,
    opacity: 0.8,
    color: "#C0C0C0",
    fontFamily: "sans-serif-condensed",
    fontStyle: "italic"

   
  },
  background: {
    height: height,
    justifyContent: "center",

  },
});
