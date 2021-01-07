import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import {
  ScrollView,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { API } from "../../env.js";

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

  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#00f27c", "#384b99"]}
      start={[1, 0]}
      end={[0, 1]}
      style={styles.background}
    >
      <View style={styles.container}>
        <View>
          <Text
            style={styles.title}
          >{`${data.first_name} ${data.last_name}`}</Text>
        </View>
        <View>
          <View style={styles.field}>
            <Text style={styles.text}>{`Teléfono: \n${data.cellphone}`}</Text>
            <TouchableOpacity
              onPress={() => {
                setInputVisible({
                  ...inputVisible,
                  cellphone: !inputVisible.cellphone,
                });
              }}
            >
              <Text style={styles.button}>Editar</Text>
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
                <Text style={styles.button}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.field}>
            <Text style={styles.text}>{`Dirección: \n${data.street}`}</Text>
            <TouchableOpacity
              onPress={() => {
                setInputVisible({
                  ...inputVisible,
                  street: !inputVisible.street,
                });
              }}
            >
              <Text style={styles.button}>Editar</Text>
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
                onPress={() => {
                  handleSubmit("street");
                }}
              >
                <Text style={styles.button}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.field}>
            <Text style={styles.text}>{`Email: \n${data.username}`}</Text>
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
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    marginVertical: 50,
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  input: {
    width: 220,
    paddingHorizontal: 15,
    fontSize: 20,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "#00aae4",
    fontSize: 15,
  },
});
