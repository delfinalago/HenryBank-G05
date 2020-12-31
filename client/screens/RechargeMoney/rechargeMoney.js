import React, { useState, useEffect } from "react";
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
      <View style={{ backgroundColor: "#FFF", height: "100%", marginTop: 200 }}>
        <Text style={styles.title}>¿Cuanto dinero queres recargar?</Text>

        <TextInput
          placeholder="Cantidad"
          placeholderTextColor="#00716F"
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
          style={styles.button}
        >
          <Text style={styles.innerText}>Elegir medio de pago</Text>
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
