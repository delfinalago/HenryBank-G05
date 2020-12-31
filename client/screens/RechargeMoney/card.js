import React, { useState } from "react";
import { CreditCardInput } from "react-native-credit-card-input";
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

  const onChange = (formData) => {
    return;
  };

  const onFocus = (field) => console.log("focus", field);

  const handleSubmit = () => {
    let parms = {};
    parms.amount = amount;
    AsyncStorage.getItem("@localUser").then((data) => {
      parms.destiny = JSON.parse(data).id;
      parms.type = "recarga";
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
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={{ marginTop: 200 }}>
        <CreditCardInput
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
      </View>
      <View>
        <TouchableOpacity
          mode="contained"
          secureTextEntry={true}
          style={styles.button}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.innerText}>Recargar</Text>
        </TouchableOpacity>
      </View>
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
    marginHorizontal: 20,
    height: 50,
    color: "#000000",
    alignItems: "center",
    borderWidth: 3,
    marginVertical: 25,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00aae4",
    paddingVertical: 2,
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
  },
  label: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
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
