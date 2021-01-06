import { useFormik, Form, Field, touched } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Code({ route, navigation }) {
  const amount = route.params.amount;
  return (
    <ScrollView style={styles.scrollView}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#00f27c", "#384b99"]}
        start={[1, 0]}
        end={[0, 1]}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Seleccioná un método de pago</Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Code", {
                amount: amount,
              })
            }
            style={styles.touchable}
          >
            <Text style={styles.buttonTitle}>Código de pago electrónico</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Card", {
                amount: amount,
              })
            }
            style={styles.touchable}
          >
            <Text style={styles.buttonTitle}>Tarjeta de crédito o débito</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    marginHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  background: {
    height: 770,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonTitle: {
    fontSize: 20,
    paddingVertical: 10,
    color: "#00aae4",
  },
  touchable: {
    color: "#000000",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00aae4",
    marginVertical: 10,
  },
});
