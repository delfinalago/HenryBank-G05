import React, { useEffect, useState } from "react";
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

  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 30,
      marginVertical: 50,
    },
    field: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    input: {
      borderColor: "#000000",
      borderWidth: 1,
      width: 220,
      paddingHorizontal: 15,
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={styles.title}
        >{`${data.first_name} ${data.last_name}`}</Text>
      </View>
      <View>
        <View style={styles.field}>
          <Text style={styles.text}>Teléfono: {data.cellphone}</Text>
          <TouchableOpacity
            onPress={() => {
              setInputVisible({
                ...inputVisible,
                cellphone: !inputVisible.cellphone,
              });
            }}
          >
            <Text>Editar</Text>
          </TouchableOpacity>
        </View>
        {inputVisible.cellphone && (
          <View style={styles.field}>
            <TextInput
              value={input.cellphone}
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(text) => setInput({ ...input, cellphone: text })}
            />
            <TouchableOpacity
              onPress={() => {
                handleSubmit("cellphone");
              }}
            >
              <Text>Confirmar</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.field}>
          <Text style={styles.text}>Dirección: {data.street}</Text>
          <TouchableOpacity
            onPress={() => {
              setInputVisible({
                ...inputVisible,
                street: !inputVisible.street,
              });
            }}
          >
            <Text>Editar</Text>
          </TouchableOpacity>
        </View>
        {inputVisible.street && (
          <View style={styles.field}>
            <TextInput
              style={styles.input}
              value={input.street}
              onChangeText={(text) => setInput({ ...input, street: text })}
            />
            <TouchableOpacity
              onPress={() => {
                handleSubmit("street");
              }}
            >
              <Text>Confirmar</Text>
            </TouchableOpacity>
          </View>
        )}
        <View>
          <Text style={styles.text}>Email: {data.username}</Text>
        </View>
        <View>
          <Text style={styles.text}>DNI: {data.dni}</Text>
        </View>
      </View>
    </View>
  );
}
