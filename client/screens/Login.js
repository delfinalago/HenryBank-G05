import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../assets/logo.png";
import { Card, Button } from "react-native-elements";
import { API } from "../env.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { forms as styles } from "./styles";

import { LinearGradient } from "expo-linear-gradient";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Form,
  ScrollView,
  Image,
} from "react-native";

export default function Login({ navigation, setToken }) {
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .max(50, "El correo no puede contener mas de 50 caracteres")
        .required("Required"),
      password: Yup.string()
        .min(5, "la contraseña debe contener al menos 5 caracteres")
        .required(),
    }),
    onSubmit: ({ login, password }) => {
      console.log(
        "ENTRANDO A AAXIOS L38 LOGIN login=",
        login,
        " password=",
        password,
        "API",
        API
      );
      axios
        .post(
          `${API}/api/users/login`,
          { username: login, password: password },
          { headers: { "X-Requested-With": "XMLHttpRequest" } }
        )
        .then(({ data }) => {
          (async () => {
            try {
              console.log("ENTRANDO A AAXIOS L45 LOGIN");
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <ScrollView>
      <LinearGradient
        // Button Linear Gradient
        colors={["#00f27c", "#384b99"]}
        start={[1, 0]}
        end={[0, 1]}
        style={styles.background}
      >
        <View style={styles.container}>
          <Image source={logo} style={styles.img} />
          <Text style={{ alignSelf: "center", fontSize: 20 }}>
            Bienvenidx a tu billetera virtual
          </Text>
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
            <Text>{errors.password}</Text>
          ) : null}

          <TouchableOpacity
            mode="contained"
            title=""
            onPress={handleSubmit}
            style={styles.touchable}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Ingresar</Text>
          </TouchableOpacity>

          <Text style={{ alignSelf: "center", marginTop: 40 }}>
            Si aun no te registraste
          </Text>

          <TouchableOpacity
            mode="contained"
            secureTextEntry={true}
            title=""
            onPress={() => navigation.navigate("PreRegister")}
            style={{ borderWidth: 0, marginTop: 10, alignSelf: "center" }}
          >
            <Text style={{ color: "#00aae4", fontSize: 25 }}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
