import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Axios from "axios";
import { API } from "../../env.js";
const { width, height } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';

export default function sendMoney({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

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
      description: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number().required("Campo requerido"),
    }),
    onSubmit: () => {
      console.log("eeeeeeh");
      transfData.amount = values.amount;
      transfData.description = values.description;
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
      <LinearGradient
        // Button Linear Gradient
        colors={["#00f27c", "#384b99"]}
        start={[1, 0]}
        end={[0, 1]}
        style={styles.background}
      >
        <Text style={styles.textTitle}>Enviar Dinero</Text>
        <View style={styles.container}>

          <Text style={styles.textSub}>
            Ingresá cuanto dinero le queres transferir a tu contacto
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad a transferir"
            value={values.amount}
            onChangeText={handleChange("amount")}
            keyboardType={"numeric"}
          />
          {touched.amount && errors.amount ? <Text>{errors.amount}</Text> : null}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Transferir</Text>
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            syle={styles.modal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Ya esta todo listo!</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Incluir un mensaje?"
                  value={values.description}
                  onChangeText={handleChange("description")}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={(e) => {
                    handleSubmit(e);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    height: height,
  },
  textTitle: {
    fontSize: 32,
    alignSelf: "center",

    marginBottom: 30
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
    marginTop: 30,
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
    // justifyContent: "space-between",
    // flexDirection: "row",
    // alignItems: "center",
    marginVertical: 4,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginHorizontal: 30,
    paddingVertical: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
  },
  background: {
    height: height + 50,
    justifyContent: "center",

  },
});
