import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {logoo} from "../../assets/logoo.png"
import axios from "axios";
import {
  ScrollView,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity, Image
} from "react-native";
import { Dimensions } from "react-native";

import { API } from "../../env.js";
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function UserData() {
  const [data, setData] = useState({});
  const [inputVisible, setInputVisible] = useState({
    street: false,
    cellphone: false,
  });
  const [input, setInput] = useState({
    street: "",
    cellphone: "",
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get(`${API}/api/users/data`).then(({ data }) => {
      setData(data);
    });
  }, [reload]);

  const handleSubmit = (field) => {
    axios
      .put(`${API}/api/users/data`, { [field]: input[field], field })
      .then(() => {
        setInputVisible({
          street: false,
          cellphone: false,
        });
        setInput({
          street: "",
          cellphone: "",
        });
        setReload(!reload);
      });
  };

  const verifyDirection = (street) =>
    axios
      .get(
        `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${street}`
      )
      .then(({ data }) => {
        if (data.direccionesNormalizadas.length) {
          return true;
        } else {
          return false;
        }
      });

  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#00f27c", "#384b99"]}
      start={[1, 0]}
      end={[0, 1]}
      style={styles.background}
    >
      <View style={styles.container}>
      {/* <View style={styles.img}>
      <Image source={require('../../assets/logoo.png')} /> */}
    {/* </View>
          <Text style={styles.logoo}>VESKI</Text>
        <View> */}
        <Text style={styles.title}>MIS DATOS</Text>
        <View style={styles.field}>
          <Text style={styles.text}>{`NOMBRE: \n${data.first_name} ${data.last_name}`}</Text>
        {/* </View> */}
         </View>
        <View>
          <View style={styles.field}>
            <Text style={styles.text}>{`TELEFÓNO: \n${data.cellphone}`}</Text>
            <TouchableOpacity
              onPress={() => {
                setInputVisible({
                  ...inputVisible,
                  cellphone: !inputVisible.cellphone,
                });
              }}
            >
              <Text style={styles.button}>EDITAR</Text>
            </TouchableOpacity>
          </View>
          {inputVisible.cellphone && (
            <View style={styles.field}>
              <TextInput
                value={input.cellphone}
                style={styles.input}
                placeholder="nuevo teléfono"
                keyboardType="numeric"
                onChangeText={(text) => setInput({ ...input, cellphone: text })}
              />
              <TouchableOpacity
                onPress={() => {
                  handleSubmit("cellphone");
                }}
              >
                <Text style={styles.button}>CONFIRMAR</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.field}>
            <Text style={styles.text}>{`DIRECCIÓN: \n${data.street}`}</Text>
            <TouchableOpacity
              onPress={() => {
                setInputVisible({
                  ...inputVisible,
                  street: !inputVisible.street,
                });
              }}
            >
              <Text style={styles.button}>EDITAR</Text>
            </TouchableOpacity>
          </View>
          {inputVisible.street && (
            <View style={styles.field}>
              <TextInput
                style={styles.input}
                value={input.street}
                placeholder="nueva dirección"
                onChangeText={(text) => setInput({ ...input, street: text })}
              />
              <TouchableOpacity
                onPress={async () => {
                  if (await verifyDirection(input.street)) {
                    handleSubmit("street");
                  } else {
                    alert("Direccion inválida");
                  }
                }}
              >
                <Text style={styles.button}>CONFIRMAR</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.field}>
            <Text style={styles.text}>{`EMAIL: \n${data.username}`}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.text}>{`DNI: \n${data.dni}`}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: "sans-serif-condensed",
    fontStyle: "italic"
  },
  container: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 30,
    fontFamily: "sans-serif-condensed"
  },

  title: {
    fontSize: 30,
    marginVertical: 20,
    marginTop: 10,
    fontFamily: "sans-serif-condensed",
    alignSelf: "center",
    color: "#0002cd",
    
  
   
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    fontFamily: "sans-serif-condensed",
    
  },
  input: {
    width: 220,
    paddingHorizontal: 15,
    fontSize: 20,
    fontFamily: "sans-serif-condensed",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif-condensed",

  },
  logoo: {
    fontSize:10
  },
  img: {
    marginTop: 30
  },
  button: {
    color: "#0002cd",
    fontSize: 15,
    marginVertical: 15,
    fontFamily: "sans-serif-condensed",

  },
});
