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
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { API } from "../../env.js";

const randomNum = () => {
  return Math.floor(Math.random() * 999999 - 100000) + 100000;
};

export default function preRegister({ navigation }) {
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
      let token = randomNum();
      values.token = token;
      Axios.post(`${API}/api/registration/auth`, {
        values,
      })
        .then(({ data }) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert(
              `Se ha enviado un email a su casilla de correo (${email}) para continuar con el registro`
            );
            (async () => {
              try {
                await AsyncStorage.setItem(
                  "@localUserStore",
                  JSON.stringify(values)
                );
              } catch (error) {
                alert(error);
              }
            })();
            navigation.navigate("PreRegisterToken");
          }
        })
        .catch((error) => console.log(error));
    },
  });

  return (
  
      <LinearGradient
          // Button Linear Gradient
          colors={["#00f27c", "#384b99"]}
          start={[1, 0]}
          end={[0, 1]}
          style={styles.background}
        >
    <ScrollView style={styles.background} >
            
      <View style={styles.container}>
        <Text
          style={styles.title}
        >Bienvenido al proceso de registro de Veski</Text>

        <Text
          style={{
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
            flexDirection: "column",
            marginHorizontal: 30,
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
          }}
        />
        {touched.email && errors.email ? <Text>{errors.email}</Text> : null}

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("password")}
          value={values.password}
          secureTextEntry={true}
          style={{
            flexDirection: "column",
            marginHorizontal: 30,
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
          }}
        />
        {touched.password && errors.password ? (
          <Text>{errors.password}</Text>
        ) : null}

        <TextInput
          placeholder="Confirme contraseña"
          placeholderTextColor="#00716F"
          onChangeText={handleChange("confirmpassword")}
          value={values.confirmpassword}
          secureTextEntry={true}
          style={{
            flexDirection: "column",
            marginHorizontal: 30,
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
          }}
        />
        {touched.confirmpassword && errors.confirmpassword ? (
          <Text>{errors.confirmpassword}</Text>
        ) : null}

        <TouchableOpacity
          mode="contained"
          secureTextEntry={true}
          title="Register"
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={{color: "#fff" , fontSize: 20}}>Confirmar</Text>
        </TouchableOpacity>
      </View>
     
    </ScrollView> 
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 42,
  },
  button: {
    marginHorizontal: 130,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#00aae4",
  },
  title: {
    paddingTop: 20,
    fontSize: 40,
    alignSelf: "center",
    color: "#00aae4",
    fontWeight: "bold",
    textAlign:"center",
    paddingBottom: 20,
    
  },
  background: {
    paddingVertical: 50,
  },
  container: {
    marginTop: 40,
    flex: 1,
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 30,
    marginHorizontal: 10,
  },
});
