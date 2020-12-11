import React from "react";
import Fondo1 from "../assets/Fondo1.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import Register from "./Register";
import { Card, Button } from "react-native-elements";
const background = require("../assets/Fondo1.png");
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Form, ScrollView, ImageBackground} from "react-native";

export default function Login({ navigation }) {
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .max(10, "Login must be shorter than 10 characters")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password should be longer than 6 characters")
        .required(),
    }),
    onSubmit: ({ login, password }) => {
      alert(`Login: ${login}, password: ${password}`);
    },
  });

  return (
    <ScrollView >
    <View style={{  height: "100%" }}>
      <ImageBackground source={background} >
      <Text
        style={{
          flexDirection: "column",
          fontSize: 35,
          marginRight: 10,
          textAlign: "center",
          marginTop: 35,
          opacity: 0.8,
          color: "#000000",
        }}
      >
        {" "}
        Email :
      </Text>
      <TextInput
        placeholder="Correo"
        placeholderTextColor="#000000"
        onChangeText={handleChange("login")}
        value={values.login}
        onChange={handleChange}
        onBlur={handleBlur}
        id="login"
        name="login"
        type="text"
        style={{
          flexDirection: "column",
          marginRight:20,
          marginLeft:20,
          height: 50,
          color: "#000000",
          alignItems: "center",
          borderWidth: 3,
          marginTop: 50,
          paddingHorizontal: 10,

          borderColor: "#00716F",
          borderRadius: 23,
          paddingVertical: 2,
        }}
      />
      {touched.login && errors.login ? <div>{errors.login}</div> : null}
      <Text
        style={{
          flexDirection: "column",
          fontSize: 35,
          marginLeft: 50,
          marginRight: 10,
          textAlign: "center",
          marginTop: 35,
          opacity: 0.8,
          color: "#000000",
        }}
      >
        {" "}
        Contraseña :
      </Text>
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#000000"
        onChangeText={handleChange("password")}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        id="password"
        name="password"
        type="password"
        style={{
          flexDirection: "column",
          height: 50,
          color: "#000000",
          alignItems: "center",
          marginRight:20,
          marginLeft:20,
          borderWidth: 3,
          marginTop: 50,
          paddingHorizontal: 10,
          borderColor: "#00716F",
          borderRadius: 23,
          paddingVertical: 2,
        }}
      />
      {touched.password && errors.password ? (
        <div>{errors.password}</div>
      ) : null}

      <TouchableOpacity
        mode="contained"
        secureTextEntry={true}
        title=""
        onPress={() => navigation.navigate("Login")}
        style={style.touchable}
      >
        <Text>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        mode="contained"
        secureTextEntry={true}
        title=""
        onPress={() => navigation.navigate("PreRegister")}
        style={style.touchable}
      >
        <Text>Registrarse</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  scrollView: {
    backgroundColor: "gray",
  },
  text: {
    fontSize: 50,
  },
  touchable: {
    color: "#000000",
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "#00716F",
    paddingVertical: 10,
    borderRadius: 23,
  },
});
