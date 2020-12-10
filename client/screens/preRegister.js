// ALTA USER
import { useFormik, Form, Field, touched } from "formik";
import * as Yup from "yup";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Axios from "axios";

export default function register() {
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Debe ingresar un email valido")
        .required("Campo requerido"),
      password: Yup.string()
        .required("Campo requerido")
        .min(5, "Mínimo 5 caracteres", "warning"),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
        .required("Campo requerido"),
    }),
    onSubmit: ({ email, password, confirmpassword }) => {
      Axios.post(`http://192.168.0.211:3000/api/registration/sendemail`, {
        email,
      })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      alert(
        `Se ha enviado un email a su casilla de correo (${email}) para continuar con el registro`
      );
    },
  });

  return (
    <ScrollView style={styles.scrollView}>
      <View style={{ backgroundColor: "#FFF", height: "100%" }}>
        <Text
          style={{
            paddingTop: 20,
            fontSize: 40,
            alignSelf: "center",
          }}
        >
          Bienvenido al proceso de registro de Veski
        </Text>

        <Text
          style={{
            fontFamily: "Verdana",
            fontSize: 20,
            marginHorizontal: 55,
            textAlign: "center",
            marginTop: 5,
            opacity: 0.4,
          }}
        >
          Por favor ingrese un email y contraseña para continuar.
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("email")}
          value={values.email}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 55,
            borderWidth: 2,
            marginTop: 50,
            paddingHorizontal: 10,
            borderColor: "#00716F",
            borderRadius: 23,
            paddingVertical: 2,
          }}
        />
        {touched.email && errors.email ? <div>{errors.email}</div> : null}

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("password")}
          value={values.password}
          secureTextEntry={true}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 55,
            borderWidth: 2,
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

        <TextInput
          placeholder="Confirme contraseña"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("confirmpassword")}
          value={values.confirmpassword}
          secureTextEntry={true}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 55,
            borderWidth: 2,
            marginTop: 50,
            paddingHorizontal: 10,
            borderColor: "#00716F",
            borderRadius: 23,
            paddingVertical: 2,
          }}
        />
        {touched.confirmpassword && errors.confirmpassword ? (
          <div>{errors.confirmpassword}</div>
        ) : null}

        <TouchableOpacity
          mode="contained"
          secureTextEntry={true}
          title="Register"
          onPress={handleSubmit}
          style={{
            marginHorizontal: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            backgroundColor: "#00716F",
            paddingVertical: 10,
            borderRadius: 23,
          }}
        >
          <Text>Enviar</Text>
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
    fontSize: 42,
  },
});
