// ALTA USER
import { useFormik, Form, Field, touched } from "formik";
import * as Yup from "yup";
import React, { useRef } from "react";
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
import { Dimensions } from "react-native";
var height = Dimensions.get('window').height; //full height

const randomNum = () => {
  return Math.floor(Math.random() * 999999) + 1;
};

export default function PreRegisterToken({ navigation }) {
  const Elem2 = useRef(null);
  const Elem3 = useRef(null);
  const Elem4 = useRef(null);
  const Elem5 = useRef(null);
  const Elem6 = useRef(null);

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
    // validationSchema: Yup.object({
    //   one: Yup.number().required("Campo requerido"),
    //   two: Yup.number().required("Campo requerido"),
    //   three: Yup.number().required("Campo requerido"),
    //   four: Yup.number().required("Campo requerido"),
    //   five: Yup.number().required("Campo requerido"),
    //   six: Yup.number().required("Campo requerido"),
    // }),
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
            } else {
              alert("No coincide con el código enviado.");
            }
          } else {
            alert("No se encontró ningun código generado.");
          }
        } catch (error) {
          console.log(error);
        }
      })();
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


      <Text style={styles.titulo2}>
         VALIDACION DE CUENTA</Text>
        <Text style={styles.titulo}>
          INGRESA EL CODIGO QUE HEMOS ENVIADO A TU CORREO</Text>
        <View style={styles.flexcontainer}>


            <TextInput
              onChangeText={handleChange("one")}
              value={values.one}
              style={styles.input}
              maxLength={1}
              numeric
              keyboardType={"numeric"}
              autoFocus={true}
              onChange={() => Elem2.current.focus()}
            />
            {touched.one && errors.one ? <Text>{errors.one}</Text> : null}


          <TextInput
            placeholder=""
            placeholderTextColor="#C0C0C0"
            onChangeText={handleChange("two")}
            value={values.two}
            style={styles.input}
            maxLength={1}
            numeric
            keyboardType={"numeric"}
            ref={Elem2}
            onChange={() => Elem3.current.focus()}
          />
          {touched.two && errors.two ? <Text>{errors.two}</Text> : null}

          <TextInput
            placeholder=""
            placeholderTextColor="#C0C0C0"
            onChangeText={handleChange("three")}
            value={values.three}
            style={styles.input}
            maxLength={1}
            numeric
            keyboardType={"numeric"}
            ref={Elem3}
            onChange={() => Elem4.current.focus()}
          />
          {touched.three && errors.three ? <Text>{errors.three}</Text> : null}

          <TextInput
            placeholder=""
            placeholderTextColor= "#C0C0C0"
            onChangeText={handleChange("four")}
            value={values.four}
            style={styles.input}
            maxLength={1}
            numeric
            keyboardType={"numeric"}
            ref={Elem4}
            onChange={() => Elem5.current.focus()}
          />
          {touched.four && errors.four ? <Text>{errors.four}</Text> : null}

          <TextInput
            placeholder=""
            placeholderTextColor="#C0C0C0"
            onChangeText={handleChange("five")}
            value={values.five}
            style={styles.input}
            maxLength={1}
            numeric
            keyboardType={"numeric"}
            ref={Elem5}
            onChange={() => Elem6.current.focus()}
          />
          {touched.five && errors.five ? <Text>{errors.five}</Text> : null}

          <TextInput
            placeholder=""
            placeholderTextColor="#C0C0C0"
            onChangeText={handleChange("six")}
            value={values.six}
            style={styles.input}
            maxLength={1}
            numeric
            keyboardType={"numeric"}
            ref={Elem6}
            onChange={handleSubmit}
          />
          {touched.six && errors.six ? <Text>{errors.six}</Text> : null}
        </View>
        <TouchableOpacity
          mode="contained"
          secureTextEntry={true}
          title="Register"
          onPress={handleSubmit}
          style={styles.boton}
        >
          <Text style={{color: "#fff" , fontSize: 20, fontFamily: "sans-serif-condensed"}}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 42,
  },
  flexcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
   
  },
  input: {
    marginHorizontal: 1,
    height: 50,
    color: "#000000",
    alignItems: "center",
    marginTop: 25,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#C0C0C0",
    width: 45,
    marginStart: 9,
    textAlign: "center",

  },
  container: {
    marginTop: 60,
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgb(255, 255, 255)",
    paddingVertical: 30,
    marginHorizontal: 10,
  },
  background: {
    paddingVertical: 50,
    height: height,
  },
  titulo: {
    textAlign: "center",
    color: "#C0C0C0",
    paddingTop: 10,
    fontSize: 18,
    alignSelf: "center",

    margin:10,
  
    fontFamily: "sans-serif-condensed",

  },
  titulo2: {
    textAlign: "center",
    color: "#0002cd",
    paddingTop: 10,
    fontSize: 30,
    alignSelf: "center",
    margin: 10,
    fontFamily: "sans-serif-condensed",

  },
  boton: {
    color: "#fff",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#0002cd",
  },
});
