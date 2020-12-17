import React, { useEffect, useState } from "react";
import { API } from "../../env";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";

export default function Saldo() {
  const [saldo, setSaldo] = useState({});

  useEffect(() => {
    axios.get(`${API}/api/accounts/saldoarg?nombre=true`).then(({ data }) => {
      setSaldo(data);
      console.log(data);
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    name: {
      color: "#FFF",
      fontSize: 22,
      fontWeight: "bold",
      paddingBottom: 8,
      textAlign: "center",
    },
    saldo: {
      color: "#fafafa",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 1,
      fontSize: 30,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{saldo.name}</Text>
      <Text style={styles.saldo}>mi saldo</Text>
      <Text style={styles.saldo}>${saldo.balance}</Text>
    </View>
  );
}
