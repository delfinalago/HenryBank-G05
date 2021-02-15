import React, { useRef, useEffect } from "react";
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
  Animated,
  Easing,
} from "react-native";

export default function Login({ navigation, setToken }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 200,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.bezier(0.25, 0.75, 0.75, 0.25),
      })
    ).start();
  }, [animatedValue]);

  const interpolatedRotateAnimation = animatedValue.interpolate({
    inputRange: [0, 200],
    outputRange: ["0deg", "360deg"],
  });

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
          <Animated.Image
            source={logo}
            style={[
              styles.img,
              { transform: [{ rotate: interpolatedRotateAnimation }] },
            ]}
          />
          <Text style={styles.logo}>VESKI</Text>
          <Text style={{ alignSelf: "center", fontSize: 20, fontFamily: "sans-serif-condensed" }}>
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
            <Text style={{ color: "white", fontSize: 15, fontFamily: "sans-serif-condensed" }}>INGRESAR</Text>
          </TouchableOpacity>
        
          
          <TouchableOpacity
            mode="contained"
            secureTextEntry={true}
            title=""
            onPress={() => navigation.navigate("PreRegister")}
            style={{ borderWidth: 0, marginTop: 10 }}
          >
            <Text style={{ color: "#808080", fontSize: 15, alignSelf: "center", marginTop: 15, fontFamily: "sans-serif-condensed" }}> ¿Aún no tenés una cuenta? Registrate aquí</Text>
          </TouchableOpacity>
          </View>
          
      </LinearGradient>
    </ScrollView>
  );
}
