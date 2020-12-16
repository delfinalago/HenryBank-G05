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

export default function sendMoney({ route, navigation }) {
  const transfData = navigation.params;
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
    onSubmit: ({ email, password, confirmpassword }) => {
      transfData.amount = values.amount;
      Axios.put(`${API}/api/accounts/transc`, transfData)
        .then(({ data }) => {
          if (data.error) {
            alert(data.error);
          } else {
            console.log(data);
            alert("Transferencia realizada con éxito.");
            navigation.navigate("Profile");
          }
        })
        .catch((error) => console.log(error));
    },
  });
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Transferir Dinero</Text>
        <Text style={styles.textSub}>
          Ingresá cuanto dinero le queres transferir a tu contacto
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Cantidad a transferir"
          numeric
          keyboardType={"numeric"}
        />
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
    marginHorizontal: 10,
    borderWidth: 2,
    marginTop: 50,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 10,
    paddingVertical: 2,
  },
  button: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#00716F",
    paddingVertical: 10,
    borderRadius: 23,
  },
  container: {
    backgroundColor: "#FFF",
    height: "100%",
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
