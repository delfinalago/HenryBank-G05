import React, { useEffect, useState, useCallback, useRef } from "react";
import { API } from "../../env";
import axios from "axios";
import { Button, Avatar, ListItem } from "react-native-elements";
import BaseIcon from "./Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Animated,
   SafeAreaView, 
   Easing
} from "react-native";

import * as Animatable from "react-native-animatable";
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient
        // Button Linear Gradient
        colors={["#00f27c", "#384b99"]}
        start={[1, 0]}
        end={[0, 1]}
        style={styles.background}
        containerStyle={styles.scroll}
      >



{/* </ListItem> */}
<Animatable.View style={styles.saldoContainer2} animation="slideInDown" iterationCount={1} direction="alternate">
              <Text style={styles.name}>¡Hola {saldo.name?.split(" ")[0]}!</Text>
              <Text style={styles.saldo}>Saldo: ${saldo.balance}</Text>
        </Animatable.View>
        {/* <View style={styles.container1}>
          <View style={styles.saldoContainer2}>
              <Text style={styles.name}>¡Hola {saldo.name?.split(" ")[0]}!</Text>
              <Text style={styles.saldo}>Saldo: ${saldo.balance}</Text>
        </View> */}
          <View style={styles.container1}>
        <View style={{flex: 1 , flexDirection: 'row', borderRadius: 10 }}>
            <View style={styles.buttons}>
            
                <View style={styles.buttons}>

                  
                
                <Button
                    titleStyle={styles.listItem}
                    type="clear"
                    title="Estadisticas"
                    onPress={() => navigation.navigate("Statistics")}
                    containerStyle={styles.listItemContainer}
                        icon={
                            <BaseIcon
                            containerStyle={{
                            backgroundColor: "#29333d",
                            marginLeft: 15,
                            width:50,
                            height:50,
                            display:"flex",
                            position: "absolute"
                      
                          }}
                  icon={{
                    type: "font-awesome",
                    name: "line-chart",
                    
                  }}
                />
              }
            />

            <Button
              titleStyle={styles.listItem}
              title="Transacciones"
              type="clear"
              onPress={() => navigation.navigate("transacciones")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{ backgroundColor: "#29333d",
                            marginLeft: 15,
                            width:50,
                            height:50,
                            display:"flex",
                            position: "absolute"}}
                  icon={{
                    type: "font-awesome",
                    name: "bank",
                  }}
                />
              }
            />
            </View>
        </View>
        
        {/* <View style={{flex: 1 , backgroundColor: 'orange', flexDirection: 'row'}}> */}
        <View style={styles.buttons}>
        <Button
              titleStyle={styles.listItem}
              title="Recarga"
              type="clear"
              onPress={() => navigation.navigate("RechargeMoney")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{backgroundColor: "#29333d",
                            marginLeft: 15,
                            width:50,
                            height:50,
                            display:"flex",
                            position: "absolute"
                          }}
                  icon={{
                    type: "font-awesome",
                    name: "google-wallet",
                  }}
                />
              }
            /> 

            <Button
              titleStyle={styles.listItem}
              type="clear"
              title="Enviar dinero"
              onPress={() => navigation.navigate("SelectContact")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{backgroundColor: "#29333d",
                            marginLeft: 15,
                            width:50,
                            height:50,
                            display:"flex",
                            position: "absolute"}}
                  icon={{
                    type: "font-awesome",
                    name: "money",
                  }}
                />
              }
            />
          

            
            </View>
            {/* </View> */}
            <View style={styles.buttons}>
            {/* <View style={{flex: 1 , backgroundColor: 'orange', flexDirection: 'row'}}> */}
        
            
            <Button
              titleStyle={styles.listItem}
              title="Mis contactos"
              type="clear"
              onPress={() => navigation.navigate("contactsList")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{backgroundColor: "#29333d",
                            marginLeft: 15,
                            width:50,
                            height:50,
                            display:"flex",
                            position: "absolute" 
                          }}
                  icon={{
                    type: "font-awesome",
                    name: "handshake-o",
                  }}
                />
              }
            />

               <Button
              titleStyle={styles.listItem}
              title="Mis datos"
              type="clear"
              onPress={() => navigation.navigate("UserData")}
              containerStyle={styles.listItemContainer}
              icon={
                <BaseIcon
                  containerStyle={{ backgroundColor: "#29333d",
                            marginLeft: 15,
                            width:50,
                            height:50,
                            display:"flex",
                            position: "absolute"}}
                  icon={{
                    type: "font-awesome",
                    name: "user-circle",
                  }}
                />
              }
            /> 
           
          </View>
            </View>
          
        </View>

        {/* </View> */}
      </LinearGradient>
    </ScrollView>
  );
}

// export default Contact;

const styles = StyleSheet.create({
  container1: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 0,
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 20,
  

  },
  scroll: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  saldoContainer2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 62,
    marginTop: 40,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderStyle: "dotted", 
    borderColor: "#C0C0C0",
    borderWidth: 1
  
  
  },
  saldo: {
    fontSize: 35,
    fontWeight: "bold",
    marginVertical: 10,
    fontFamily: "sans-serif-condensed",
    color: "#000000"  
  },
  name: {
    color: "#000000",
    fontSize: 35,
    // fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "sans-serif-condensed",
  },
  buttons: {
    display: "flex",
    // flexDirection:"row", 
    alignContent: "space-around",
    // justifyContent: "center",
    // paddingTop: 10,
    justifyContent:"flex-start",
    //  borderWidth: 1,
    marginLeft: 15,
    paddingHorizontal: 10,
    

  },
  listItem: {
    marginVertical: 12,
    // marginTop:30,
    paddingTop: 80,
    //  borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    fontFamily: "sans-serif-condensed",
    marginHorizontal: 30,
    justifyContent: "center",
    alignSelf: "center",
    color: "#0002cd",
    marginBottom: -10,
    paddingVertical: 15,
   
    
  },
 
  background: {
    paddingBottom: 260,
    alignItems: "center",
    flex: 1,
    
    
  },
  listItemContainer:{
    display:"flex",
    flexBasis:"auto",
    // flexDirection:"row",
    // justifyContent:"flex-start",
    // borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    alignItems: "stretch",
    marginHorizontal: -30,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#FFFFFF"
  }
});
