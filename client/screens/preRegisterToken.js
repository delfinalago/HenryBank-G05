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

import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

const randomNum = () => {
  return Math.floor(Math.random() * 999999) + 1;
};

export default function PreRegisterToken({ navigation }) {
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      six: "",
    },
    validationSchema: Yup.object({
      one: Yup.number().required("Campo requerido"),
      two: Yup.number().required("Campo requerido"),
      three: Yup.number().required("Campo requerido"),
      four: Yup.number().required("Campo requerido"),
      five: Yup.number().required("Campo requerido"),
      six: Yup.number().required("Campo requerido"),
    }),
    onSubmit: ({ email, password, confirmpassword }) => {
      (async () => {
        try {
          const data = await AsyncStorage.getItem("@localUserStore");
          if (data !== null) {
            let parsData = JSON.parse(data);
            let input =
              values.one +
              values.two +
              values.three +
              values.four +
              values.five +
              values.six;
            console.log("input: ", input, " - parsData: ", parsData.token);

            if (parsData.token == input) {
              navigation.navigate("Register");
            }
          } else {
            console.log("No hay nada");
          }
        } catch (error) {
          console.log(error);
        }
      })();
    },
  });

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text
          style={{
            paddingTop: 20,
            fontSize: 30,
            alignSelf: "center",
          }}
        >
          Por favor ingrese los 6 digitos que enviamos a su casilla de correo:
        </Text>
        <View style={styles.flexcontainer}>
          <TextInput
            placeholder=""
            placeholderTextColor="#00716F"
            onChangeText={handleChange("one")}
            value={values.one}
            style={styles.input}
            maxLength={1}
            numeric
            keyboardType={"numeric"}
          />
          {touched.one && errors.one ? <Text>{errors.one}</Text> : null}

          <TextInput
            placeholder=""
            placeholderTextColor="#00716F"
            onChangeText={handleChange("two")}
            value={values.two}
            style={styles.input}
            maxLength={1}
            numeric
            keyboardType={"numeric"}
          />
          {touched.two && errors.two ? <Text>{errors.two}</Text> : null}

          <TextInput
            placeholder=""
            placeholderTextColor="#00716F"
            onChangeText={handleChange("three")}
            value={values.three}
            style={styles.input}
            maxLength={1}
            numeric
            keyboardType={"numeric"}
          />
          {touched.three && errors.three ? <Text>{errors.three}</Text> : null}

          <TextInput
            placeholder=""
            placeholderTextColor="#00716F"
            onChangeText={handleChange("four")}
            value={values.four}
            style={styles.input}
            maxLength={1}
            numeric
            keyboardType={"numeric"}
          />
          {touched.four && errors.four ? <Text>{errors.four}</Text> : null}

          <TextInput
            placeholder=""
            placeholderTextColor="#00716F"
            onChangeText={handleChange("five")}
            value={values.five}
            style={styles.input}
            maxLength={1}
            numeric
            keyboardType={"numeric"}
          />
          {touched.five && errors.five ? <Text>{errors.five}</Text> : null}

          <TextInput
            placeholder=""
            placeholderTextColor="#00716F"
            onChangeText={handleChange("six")}
            value={values.six}
            style={styles.input}
            maxLength={1}
            numeric
            keyboardType={"numeric"}
          />
          {touched.six && errors.six ? <Text>{errors.six}</Text> : null}
        </View>
        <TouchableOpacity
          mode="contained"
          secureTextEntry={true}
          title="Register"
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 42,
  },
  flexcontainer: {
    backgroundColor: "#FFF",
    width: "100%",
    flex: 1,
    flexDirection: "row",
  },
  input: {
    alignItems: "center",
    width: "3em",
    marginHorizontal: 10,
    borderWidth: 2,
    marginTop: 50,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2,
  },
  button: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#00716F",
    paddingVertical: 10,
    borderRadius: 23,
  },
  container: { backgroundColor: "#FFF", height: "100%" },
});
