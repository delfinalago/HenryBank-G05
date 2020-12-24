import { useFormik, Form, Field, touched } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
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
import { API } from "../../env.js";

export default function Code({ navigation }) {
  const [code, setCode] = useState(null);
  const [amount, setAmount] = useState(null);
  const handleChange = (e) => {
    console.log("valor Amount-----", e);
    setAmount(e);
  };

  const randomNum = () => {
    return Math.floor(Math.random() * 999999 - 100000) + 100000;
  };

  const handleCode = () => {
    let num = randomNum();
    setCode(num);
  };
  const handleSubmit = () => {
    let parms = {};
    parms.amount = amount;
    AsyncStorage.getItem("@localUser").then((data) => {
      parms.destiny = JSON.parse(data).id;
    });
    console.log("Parms para recarga-------", parms);
    Axios.put(`${API}/api/accounts/accountarg`, parms)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Transferencia realizada con éxito.");
          navigation.navigate("Me");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={{ backgroundColor: "#FFF", height: "100%" }}>
        <Text style={styles.title}>¿Cuanto dinero queres recargar?</Text>

        <TextInput
          placeholder="Cantidad"
          placeholderTextColor="#00716F"
          style={styles.input}
          onChange={handleChange}
          numeric
          keyboardType={"numeric"}
        />

        <TouchableOpacity
          mode="contained"
          secureTextEntry={true}
          title="Obtener código"
          onPress={handleCode}
          style={styles.button}
        >
          <Text>Obtener código</Text>
        </TouchableOpacity>
      </View>
      {code ? (
        <View>
          <Text style={styles.title}>
            Presentá este codigo en un RapiPago o PagoFácil para efectuar la
            recarga
          </Text>
          <TouchableOpacity
            mode="contained"
            secureTextEntry={true}
            title="Confirmar"
            onPress={handleSubmit}
            style={styles.button}
          >
            <Text>Confirmar</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{code}</Text>
        </View>
      ) : (
        <></>
      )}
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
  title: {
    fontSize: 20,
    marginHorizontal: 55,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.4,
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
  button: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#00aae4",
    paddingVertical: 10,
    borderRadius: 10,
  },
});
