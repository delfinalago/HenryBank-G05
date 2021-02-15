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
        >CREAR CUENTA</Text>

        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            marginTop: 5,
            opacity: 0.4,
            fontFamily: "sans-serif-condensed"
          }}
        >
          ¡REGISTRARSE ES SIMPLE Y RAPIDO!
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#C0C0C0"
          onChangeText={handleChange("email")}
          value={values.email}
          style={{
            flexDirection: "column",
            marginHorizontal: 30,
            height: 50,
            color: "#C0C0C0",
            alignItems: "center",
            borderWidth: 3,
            marginTop: 25,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#C0C0C0",
            paddingVertical: 2,
            fontFamily: "sans-serif-condensed"
          }}
        />
        {touched.email && errors.email ? <Text>{errors.email}</Text> : null}

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#C0C0C0"
          onChangeText={handleChange("password")}
          value={values.password}
          secureTextEntry={true}
          style={{
            flexDirection: "column",
            marginHorizontal: 30,
            height: 50,
            color: "#C0C0C0",
            alignItems: "center",
            borderWidth: 3,
            marginTop: 25,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#C0C0C0",
            paddingVertical: 2,
            fontFamily: "sans-serif-condensed"
          }}
        />
        {touched.password && errors.password ? (
          <Text>{errors.password}</Text>
        ) : null}

        <TextInput
          placeholder="Confirme contraseña"
          placeholderTextColor="#C0C0C0"
          onChangeText={handleChange("confirmpassword")}
          value={values.confirmpassword}
          secureTextEntry={true}
          style={{
            flexDirection: "column",
            marginHorizontal: 30,
            height: 50,
            color: "#C0C0C0",
            alignItems: "center",
            borderWidth: 3,
            marginTop: 25,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#C0C0C0",
            paddingVertical: 2,
            fontFamily: "sans-serif-condensed"
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
          <Text style={{color: "#fff" , fontSize: 18, fontFamily: "sans-serif-condensed"}}>CONFIRMAR</Text>
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
    marginHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#0002cd",
    
  },
  title: {
    paddingTop: 3,
    fontSize: 30,
    alignSelf: "center",
    color: "#00aae4",
    // fontWeight: "bold",
    textAlign:"center",
    paddingBottom: 20,
    fontFamily: "sans-serif-condensed",
    color: "#0002cd",
    
  },
  background: {
    paddingVertical: 40,
  
    
  },
  container: {
    marginVertical: 1,
    flex: 1,
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgb(255, 255, 255)",
    paddingVertical: 30,
    marginHorizontal: 20,
    
  },
});
