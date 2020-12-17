import React from "react";
import Fondo1 from "../assets/Fondo1.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Register from "./Register/Register";
import { Card, Button } from "react-native-elements";
import { API } from "../env.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const background = require("../assets/Fondo1.png");
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Form,
  ScrollView,
  ImageBackground,
} from "react-native";

export default function Login({ navigation, setToken }) {
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .max(50, "Login must be shorter than 50 characters")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password should be longer than 6 characters")
        .required(),
    }),
    onSubmit: ({ login, password }) => {
      axios
        .post(`${API}/api/users/login`, { username: login, password })
        .then(({ data }) => {
          (async () => {
            try {
              await AsyncStorage.setItem("@localUser", JSON.stringify(data));
              setToken(data.token);
              console.log("entrandiiiiiiing");
            } catch (error) {
              // Error saving data
              console.log(error);
            } finally {
              navigation.navigate("Profile");
            }
          })();
        });
    },
  });

  return (
    <ScrollView>
      <View style={{ height: "100%" }}>
        <Text style={styles.correo}> Email :</Text>
        <TextInput
          placeholder="Correo"
          placeholderTextColor="#000000"
          onChangeText={handleChange("login")}
          value={values.login}
          id="login"
          name="login"
          type="text"
          style={styles.input}
        />
        {touched.login && errors.login ? <Text>{errors.login}</Text> : null}
        <Text style={styles.text}> Contraseña :</Text>
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#000000"
          onChangeText={handleChange("password")}
          value={values.password}
          id="password"
          name="password"
          type="password"
          secureTextEntry={true}
          style={styles.input}
        />
        {touched.password && errors.password ? (
          <div>{errors.password}</div>
        ) : null}

        <TouchableOpacity
          mode="contained"
          secureTextEntry={true}
          title=""
          onPress={handleSubmit}
          style={styles.touchable}
        >
          <Text>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          mode="contained"
          secureTextEntry={true}
          title=""
          onPress={() => navigation.navigate("PreRegister")}
          style={styles.touchable}
        >
          <Text>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "gray",
  },
  text: {
    flexDirection: "column",
    fontSize: 30,
    marginRight: 10,
    textAlign: "center",
    marginTop: 10,
    opacity: 0.8,
    color: "#000000",
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
  correo: {
    flexDirection: "column",
    fontSize: 35,
    marginRight: 10,
    textAlign: "center",
    marginTop: 35,
    opacity: 0.8,
    color: "#000000",
  },
  input: {
    flexDirection: "column",
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    color: "#000000",
    alignItems: "center",
    borderWidth: 3,
    marginTop: 50,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2,
  },
  password: {
    flexDirection: "column",
    fontSize: 35,
    marginLeft: 50,
    marginRight: 10,
    textAlign: "center",
    marginTop: 35,
    opacity: 0.8,
    color: "#000000",
  },
});
