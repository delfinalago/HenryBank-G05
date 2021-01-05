import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../assets/logo.png";
import { Card, Button } from "react-native-elements";
import { API } from "../env.js";
import AsyncStorage from "@react-native-async-storage/async-storage";



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
        .max(50, "Login must be shorter than 50 characters")
        .required("Required"),
      password: Yup.string()
        .min(5, "Password should be longer than 6 characters")
        .required(),
    }),
    onSubmit: ({ login, password }) => {
       console.log("ENTRANDO A AAXIOS L38 LOGIN login=", login, " password=", password, "API", API) 
      axios
        .post(`${API}/api/users/login`, 
          { username: login, password: password },
          { headers: {'X-Requested-With': 'XMLHttpRequest'} } )
        .then(({ data }) => {
            console.log("ENTRANDO A AAXIOS L42 LOGIN")
          (async () => {
            try {
              console.log("ENTRANDO A AAXIOS L45 LOGIN")
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
          console.log("error.request.status:", error.request.status);
          console.log("error.config.url:", error.config.url);
          console.log("El error es :", JSON.stringify(error));
        });
    },
  });

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Image source={logo} style={styles.img} />
        <Text style={{ alignSelf: "center" }}>
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
          <Text>Ingresar</Text>
        </TouchableOpacity>

        <Text style={{ alignSelf: "center", marginTop: 40 }}>
          Si aun no te registraste
        </Text>

        <TouchableOpacity
          mode="contained"
          secureTextEntry={true}
          title=""
          onPress={() => navigation.navigate("PreRegister")}
          style={styles.touchable}
        >
          <Text>Registrate</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
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
    marginHorizontal: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00aae4",
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
    marginTop: 25,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00aae4",
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
  img: {
    alignSelf: "center",
    height: 200,
  },
});
