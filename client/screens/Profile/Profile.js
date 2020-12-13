import React, { Component } from "react";
import { Card, Button } from "react-native-elements";
import BaseIcon from "./Icon";

import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#29333d",
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
  headerContainer: {},
  headerColumn: {
    alignItems: 'center',
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
    backgroundColor: "#29333d",
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
  saldo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 16,
  },
  saldoActual: {
    color: "#FFF",
  },
  saldoNumber: {
    marginTop: 4,
    fontSize: 42,
    color: "#FFF",
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
    display: 'flex',
    alignItems: "center",
  }
});

class Contact extends Component {
  renderHeader = () => {
    const { avatar, avatarBackground, name } = this.props;

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{ uri: avatarBackground }}
        >
          <View style={styles.headerColumn}>
            <Image style={styles.userImage} source={{ uri: avatar }} />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}></View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  onPressSetting = () => {
  
  };

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            <View style={styles.saldo}>
              <Text style={styles.saldoActual}>Tu saldo actual es:</Text>
              <Text style={styles.saldoNumber}>$22.580,06</Text>
            </View>
            <View style={styles.buttons}>
              <Button
                titleStyle={styles.listItem}
                type="outline"
                title="Transacciones"
                onPress={() => this.onPressSetting()}
                containerStyle={styles.listItemContainer}
                icon={
                  <BaseIcon
                    containerStyle={{ backgroundColor: "#29333d", marginLeft:10 }}
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
                onPress={() => this.onPressSetting()}
                containerStyle={styles.listItemContainer}
                icon={
                  <BaseIcon
                    containerStyle={{ backgroundColor: "#29333d", marginLeft:15 }}
                    icon={{
                      type: "font-awesome",
                      name: "line-chart",
                    }}
                  />
                }
              />
              <Button
                titleStyle={styles.listItem}
                type="outline"
                title="Mis productos"
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
              />
              <Button
                titleStyle={styles.listItem}
                title="Mis datos"
                type="outline"
                onPress={() => this.onPressSetting()}
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
                onPress={() => this.onPressSetting()}
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
                onPress={() => this.onPressSetting()}
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
}

export default Contact;
