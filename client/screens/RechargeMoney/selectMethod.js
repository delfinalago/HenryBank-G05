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
import Toast from "react-native-toast-message";

export default function Code({ route, navigation }) {
  const amount = route.params.amount;
  return (
    <ScrollView style={styles.scrollView}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 30,
          // paddingVertical: 20,
          justifyContent: "center",
          marginTop: 200,
        }}
      >
        <Text style={styles.title}>Seleccioná un método de pago</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Code", {
              amount: amount,
            })
          }
          style={styles.button}
        >
          <Text>Código de pago electrónico</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Card", {
              amount: amount,
            })
          }
          style={styles.button}
        >
          <Text>Tarjeta de crédito o débito</Text>
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
  code: {
    fontSize: 42,
    textAlign: "center",
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    marginHorizontal: 20,
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
  innerText: {
    color: "white",
  },
});
