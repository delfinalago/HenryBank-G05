import React, { useState, useEffect } from "react";
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
  const [code, setCode] = useState(null);
  const amount = route.params.amount;

  // const handleChange = (e) => {
  //   setAmount(e);
  // };

  useEffect(() => {
    setCode(Math.floor(Math.random() * 999999 - 100000) + 100000);
  }, []);

  const handleSubmit = () => {
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
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 30,
          // paddingVertical: 20,
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>
          Recarga dinero con un código de pago electrónico
        </Text>
      </View>
      <View style={{ backgroundColor: "#FFF", height: "100%" }}>
        <View>
          <Text style={styles.code}>{code}</Text>
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
              <Text style={styles.innerText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
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
