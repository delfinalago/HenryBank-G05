import React, { useState } from "react";
import { CreditCardInput } from "react-native-credit-card-input";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Modal,
  ScrollView,
  TextInput,
  //   Picker,
} from "react-native";

const { width, height } = Dimensions.get("window");
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { API } from "../../env.js";

export default function Card({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const amount = route.params.amount;
  const [valid, setValid] = useState(false);

  const onChange = (formData) => {
    formData.valid && setValid(formData.valid);
    return;
  };

  const onFocus = (field) => console.log("focus", field);

  const handleSubmit = (formData) => {
    console.log("valid---------", valid);
    if (valid) {
      let parms = {};
      parms.amount = amount;
      AsyncStorage.getItem("@localUser").then((data) => {
        parms.destiny = JSON.parse(data).id;
        console.log("Parms para recarga-------", parms);
        Axios.put(`${API}/api/accounts/accountarg`, parms)
          .then((data) => {
            if (data.error) {
              Toast.show({
                type: "error",
                position: "bottom",
                text1: `Error: ${data.error}`,
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
              });
            } else {
              setTimeout(() => {
                Toast.show({
                  type: "success",
                  position: "bottom",
                  text1: ` Transaccion exitosa ... `,
                  visibilityTime: 3000,
                  autoHide: true,
                  topOffset: 30,
                  bottomOffset: 40,
                });
                navigation.navigate("Me");
              }, 3000);
              Toast.show({
                type: "success",
                position: "bottom",
                text1: `Cargando ... `,
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
              });
            }
          })
          .catch((error) => console.log(error));
      });
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: `Error: Datos de tarjeta inválidos`,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <LinearGradient
        colors={["#00f27c", "#384b99"]}
        start={[1, 0]}
        end={[0, 1]}
        style={styles.background}
      >
        <View style={styles.container}>
          <CreditCardInput
            valid={true}
            autoFocus
            requiresName
            requiresCVC
            // cardScale={1.1}
            allowScroll={true}
            labelStyle={styles.label}
            inputStyle={styles.cardInput}
            validColor={"black"}
            invalidColor={"red"}
            // placeholderColor={"darkgray"}
            placeholders={{
              number: "1234 5678 1234 5678",
              name: "NOMBRE COMPLETO",
              expiry: "MM/YY",
              cvc: "CVC",
            }}
            labels={{
              number: "NÚMERO TARJETA",
              expiry: "EXPIRA",
              name: "NOMBRE COMPLETO",
              cvc: "CVC",
            }}
            onFocus={onFocus}
            onChange={onChange}
          />

          <TouchableOpacity
            mode="contained"
            secureTextEntry={true}
            style={styles.button}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={styles.innerText}>RECARGAR</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  containerPrincipal: {
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
   
  },
  text: {
    fontSize: 42,
    fontFamily: "sans-serif-condensed",
  },
  code: {
    fontSize: 42,
    textAlign: "center",
    marginTop: 100,
    fontFamily: "sans-serif-condensed",
    
  },
  title: {
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.4,
    fontFamily: "sans-serif-condensed",
  },
  input: {
    flexDirection: "column",
    marginHorizontal: 20,
    height: 50,
    color: "#000000",
    alignItems: "center",
    borderWidth: 3,
    marginVertical: 25,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C0C0C0",
    paddingVertical: 2,
    fontFamily: "sans-serif-condensed",
    backgroundColor: "#0002cd"
  },
  cardInput: {
    flexDirection: "column",
    marginHorizontal: 20,
    height: 50,
    color: "#000000",
    alignItems: "center",
    borderWidth: 3,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: "#FFF",
    paddingVertical: 2,
    fontFamily: "sans-serif-condensed",
   
  },
  label: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "sans-serif-condensed",
 
  },
  button: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#0002cd",
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    
  },
  innerText: {
    color: "white",
    fontFamily: "sans-serif-condensed",
    fontSize: 15
  },
  background: {
    paddingBottom: 190,
  },
  container: {
    marginTop: 200,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginBottom: 30
  },
});
