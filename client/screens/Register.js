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

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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
      name: "",
      lastname: "",
      phone: "",
      dni: "",
      address: "",
      province: "",
      city: "",
      nacimiento: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, "El nombre ingresado debe tener mas de 4 caracteres")
        .max(50, "El nombre ingresado debe tener tener menos de 50 caracteres")
        .required("Campo requerido"),
      lastname: Yup.string()
        .min(4, "El nombre ingresado debe tener mas de 4 caracteres")
        .max(50, "El nombre ingresado debe tener tener menos de 50 caracteres")
        .required("Campo requerido"),
      phone: Yup.string()
        .required("Ingrese su numero de telefono")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Numero de telefono no valido"
        ),
    }),
    onSubmit: ({ name, lastname, phone }) => {
      alert(`name: ${name}, lasname: ${lastname}, phone: ${phone}`);
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
          Alta de cliente
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
          Complete los campos para registrarse.
        </Text>

        <TextInput
          placeholder="Nombre"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("name")}
          value={values.name}
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
        {touched.name && errors.name ? <div>{errors.name}</div> : null}

        <TextInput
          placeholder="Apellido"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("lastname")}
          value={values.lastname}
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
        {touched.lastname && errors.lastname ? (
          <div>{errors.lastname}</div>
        ) : null}

        <TextInput
          placeholder="Telefono"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("phone")}
          onBlur={handleBlur}
          value={values.phone}
          keyboardType="numeric"
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
        {touched.phone && errors.phone ? <div>{errors.phone}</div> : null}

        <TextInput
          placeholder="DNI"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("dni")}
          value={values.dni}
          keyboardType="numbers-and-punctuation"
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

        <TextInput
          placeholder="Fecha de nacimiento"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("nacimiento")}
          value={values.nacimiento}
          keyboardType=""
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

        <TextInput
          placeholder="Direccion"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("address")}
          value={values.address}
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

        <TextInput
          placeholder="Provincia"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("province")}
          value={values.province}
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

        <TextInput
          placeholder="Ciudad"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("city")}
          value={values.city}
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
