import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Axios from "axios";
import { API } from "../../env.js";
const { width, height } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function sendMoney({ route, navigation }) {
  const transfData = {};
  transfData.destiny = route.params.id_contact;

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number().required("Campo requerido"),
    }),
    onSubmit: ({ amount }) => {
      transfData.amount = values.amount;
      // AsyncStorage.getItem("@localUser").then((data) => {
      //   console.log(data);
      // });
      transfData.state = "COMPLETED";

      AsyncStorage.getItem("@localUser").then((data) => {
        transfData.origin = JSON.parse(data).id;
        console.log("ONSUBMIT--------", transfData);
        Axios.get(`${API}/api/accounts/saldoarg`).then(({ data }) => {
          if (transfData.amount > data) {
            alert("Saldo insuficiente");
          } else {
            Axios.put(`${API}/api/accounts/transc`, transfData)
              .then((data) => {
                if (data.error) {
                  alert(data.error);
                } else {
                  alert("Transferencia realizada con éxito.");
                  navigation.navigate("Me");
                }
              })
              .catch((error) => console.log(error));
          }
        });
      });
    },
  });
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Enviar Dinero</Text>
        <Text style={styles.textSub}>
          Ingresá cuanto dinero le queres transferir a tu contacto
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Cantidad a transferir"
          value={values.amount}
          onChangeText={handleChange("amount")}
          numeric
          keyboardType={"numeric"}
        />
        {touched.amount && errors.amount ? <Text>{errors.amount}</Text> : null}
        <TouchableOpacity
          mode="contained"
          secureTextEntry={true}
          title="Register"
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text>Transferir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  textTitle: {
    fontSize: 40,
  },
  textSub: {
    fontSize: 20,
  },
  input: {
    alignItems: "center",
    width: "auto",
    height: 50,
    marginHorizontal: 10,
    borderWidth: 2,
    marginTop: 120,
    marginBottom: 20,
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
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00aae4",
  },
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
    backgroundColor: "#FFF",
    height: "100%",
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});
