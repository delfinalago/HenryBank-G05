import React, { useState, useEffect } from "react";

import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

export default function RechargeMoney({ navigation }) {
  const [amount, setAmount] = useState(0);

  const handleChange = (e) => {
    setAmount(e);
  };

  const handleSubmit = () => {
    if (amount > 0) {
      navigation.navigate("SelectMethod", {
        amount: amount,
      });
    } else {
      alert("Por favor ingresá una cantidad valida.");
    }
  };

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
          <Text style={styles.title}>¿CUÁNTO DINERO QUERÉS RECARGAR?</Text>

          <TextInput
            placeholder= "CANTIDAD"
            placeholderTextColor="#C0C0C0"
            style={styles.input}
            onChangeText={handleChange}
            numeric
            keyboardType={"numeric"}
          />

          <TouchableOpacity
            mode="contained"
            secureTextEntry={true}
            title="Obtener código"
            onPress={handleSubmit}
            style={styles.touchable}
          >
            <Text style={styles.buttonTitle}>ELEGIR MEDIO DE PAGO</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 250
  },
  background: {
    height: 770,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#0002cd",
    fontFamily: "sans-serif-condensed"
  },
  input: {
    marginVertical: 20,
    fontSize: 18,
    paddingVertical: 20,
    fontFamily: "sans-serif-condensed",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    

  },
  buttonTitle: {
    fontSize: 20,
    paddingVertical: 10,
    color: "#FFFFFF",
    backgroundColor: "#0002cd",
    fontFamily: "sans-serif-condensed",
    // width: 280,
   
  
  },
  touchable: {
    // color: "#000000",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0002cd",
    backgroundColor: "#0002cd",
    marginVertical: 25,
    // paddingHorizontal: 10
  },
});
