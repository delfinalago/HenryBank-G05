import React, { useEffect, useState, useCallback } from "react";
import { API } from "../../env";
import axios from "axios";
import { Card, Button } from "react-native-elements";
import BaseIcon from "./Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile({ navigation, setToken }) {
  const [refreshing, setRefreshing] = useState(false);
  const [saldo, setSaldo] = useState({});

  const Logout = async () => {
    try {
      await AsyncStorage.setItem("@localUser", "");
      setToken("");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };
  const getSaldo = () => {
    axios.get(`${API}/api/accounts/saldoarg?nombre=true`).then(({ data }) => {
      setSaldo(data);
      console.log(data);
    });
  };
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getSaldo();
    wait(1300).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getSaldo();
  }, []);

  return (
    <ScrollView
      style={styles.scroll}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <View style={styles.logout}>
            <TouchableOpacity onPress={Logout}>
              <BaseIcon
                icon={{
                  type: "font-awesome",
                  name: "sign-out",
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.saldoContainer}>
            {/* <Text style={styles.saldo}>Mi saldo</Text> */}
            <Text style={styles.name}>¡Hola, {saldo.name}!</Text>
            <Text style={styles.saldo}>Saldo: ${saldo.balance}</Text>
          </View>
          <View style={styles.buttons}>
            <Button
                titleStyle={styles.listItem}
                type="outline"
                title="Transacciones"
                onPress={() => navigation.navigate("transacciones")}
                containerStyle={styles.listItemContainer}
                icon={
                  <BaseIcon
                    containerStyle={{
                      backgroundColor: "#29333d",
                      marginLeft: 10,
                    }}
                    icon={{
                      type: "font-awesome",
                      name: "bank",
                    }}
                  />
                }
              />
            <Button
              titleStyle={styles.listItem}
              type="outline"
              title="Estadisticas"
              onPress={() => console.log("Estadisticas")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{
                    backgroundColor: "#29333d",
                    marginLeft: 15,
                  }}
                  icon={{
                    type: "font-awesome",
                    name: "line-chart",
                  }}
                />
              }
            />
            {/* <Button
                titleStyle={styles.listItem}
                type="outline"
                title="Mis productos "
                onPress={() => this.onPressSetting()}
                containerStyle={styles.listItemContainer}
                icon={
                  <BaseIcon
                    containerStyle={{ backgroundColor: "#29333d" }}
                    icon={{
                      type: "font-awesome",
                      name: "credit-card",
                    }}
                  />
                }
              /> */}
            <Button
              titleStyle={styles.listItem}
              title="Mis contactos"
              type="outline"
              onPress={() => navigation.navigate("contactsList")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{ backgroundColor: "#29333d" }}
                  icon={{
                    type: "font-awesome",
                    name: "user-circle",
                  }}
                />
              }
            />
            <Button
              titleStyle={styles.listItem}
              title="Recargar dinero"
              type="outline"
              onPress={() => navigation.navigate("RechargeMoney")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  style={styles.listItem}
                  containerStyle={{ backgroundColor: "#29333d" }}
                  icon={{
                    type: "font-awesome",
                    name: "google-wallet",
                  }}
                />
              }
            />
            <Button
              titleStyle={styles.listItem}
              type="outline"
              title="Enviar dinero"
              onPress={() => navigation.navigate("SelectContact")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{ backgroundColor: "#29333d" }}
                  icon={{
                    type: "font-awesome",
                    name: "money",
                  }}
                />
              }
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

// export default Contact;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
    margin: 10,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerColumn: {
    alignItems: "center",
    ...Platform.select({
      ios: {
        alignItems: "center",
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: "center",
      },
    }),
  },
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  userImage: {
    borderColor: "#FFF",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
  },
  saldoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 50,
  },
  saldo: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 50,
  },
  name: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
    // paddingBottom: 8,
    // textAlign: "center",
  },
  listItemContainer: {
    height: 55,
    width: "80%",
    color: "#FFF",
  },

  buttons: {
    alignItems: "center",
    color: "#FFF",
    borderRadius: 50,

    //   display: 'grid',
    //   'grid-template-columns': '3fr 3fr'
  },
  button: {
    width: "50%",
  },
  listItem: {
    width: 250,
  },
  buttons: {
    display: "flex",
    alignItems: "center",
  },
  logout: {
    flexDirection: "row-reverse",

    // marginTop: 20,
    // marginHorizontal: 100,
  },
});