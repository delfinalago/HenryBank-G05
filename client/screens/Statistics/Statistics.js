import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from "react-native";
import {logoo} from  "../../assets/logoo.png"
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import axios from "axios";
import { API } from "../../env.js";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

export default function Statistics({ navigation }) {
  // const [saldo, setSaldo] = useState([]);
  const [gastos, setGastos] = useState([0, 0, 0, 0, 0, 0]);
  const [labels, setLabels] = useState([
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
    "Ene",
  ]);

  useEffect(() => {
    axios
      .get(`${API}/api/accounts/movMesEg`) // trae de la bd todos los gastos del usuario
      .then(({ data }) => {
        setGastos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   AsyncStorage.getItem("@localUser")
  //   .then((data) => {
  //     const id= JSON.parse(data).id;
  //   axios
  //     .get(`${API}/api/accounts/movMesEg`, id) // trae de la bd todos los gastos del usuario
  //     .then(({ data }) => {
  //       setGastos(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   })
  //  },[]);

  console.log(gastos);

  const handleMovDiaEg = () => {
    axios
      .get(`${API}/api/accounts/movDiaEg`)
      .then(({ data }) => {
        console.log("DATA=", data);
        setLabels(new Array(30).fill("."));
        setGastos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMovSemEg = () => {
    axios
      .get(`${API}/api/accounts/movSemEg`)
      .then(({ data }) => {
        console.log("DATASEM=", data);
        setGastos(data);
        setLabels(new Array(12).fill("."));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMovMesEg = () => {
    axios
      .get(`${API}/api/accounts/movMesEg`)
      .then(({ data }) => {
        setLabels(["Ago", "Sep", "Oct", "Nov", "Dic", "Ene"]);
        setGastos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const element = [];

  console.log("Gastos =", gastos);

  return (
    <ScrollView style={{ height: height }}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#00f27c", "#384b99"]}
        start={[1, 0]}
        end={[0, 1]}
        style={styles.background}
      >
        <View style={styles.container}>
        
          <Text style={styles.title}>MIS GASTOS</Text>
           
          <LineChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: gastos,
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={230}
            width={280}
            chartConfig={{
              backgroundColor: "#C0C0C0",
               backgroundGradientFrom: "#F5FFFA",
               backgroundGradientTo: "#F5FFFA",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgb(0, 0, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              // marginHorizontal: 10,
              // marginHorizontal: -10,
                marginTop: 14,
              // borderRadius: 16,
              alignSelf: "center",
              marginBottom: 8
            }}
          />
          <Text style={styles.title2}>AQUI PODES CONSULTAR EL BALANCE DE TUS GASTOS SEGUN EL PERIODO SELECCIONADO</Text>
          <View style={styles.direccion}>
            <TouchableOpacity
              type="outline"
              title="Mensual"
              style={styles.boton}
              onPress={handleMovMesEg}
            >
              <Text style={{ color: "#fff", fontSize: 15,  fontFamily: "sans-serif-condensed" }}>MENSUAL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              type="outline"
              title="Semanal"
              style={styles.boton}
              onPress={handleMovSemEg}
            >
              <Text style={{ color: "#fff", fontSize: 15, fontFamily: "sans-serif-condensed" }}>SEMANAL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              type="outline"
              title="Diario"
              style={styles.boton}
              onPress={handleMovDiaEg}
              //´${handler}
            >
              <Text style={{ color: "#fff", fontSize: 15,  fontFamily: "sans-serif-condensed" }}>DIARIO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   marginTop: 20,
  //   flex: 1,
  //   justifyContent: "center",
  //   borderRadius: 30,
  //   backgroundColor: "rgb(255, 255, 255)",
  //   width: -80,
  //   marginVertical: -20,
  //   marginHorizontal: -8,

  // },
  container: {
    marginTop: -70,
    flex: 1,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "rgb(255, 255, 255)",
    paddingVertical: 30,
    marginHorizontal: 20,
    paddingBottom: -20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  
  },
  background: {
    paddingVertical: 80,
   
  },
  text: {
    fontSize: 42,
    fontFamily: "sans-serif-condensed"
  },

  boton: {
    width: 280,
    color: "#fff",
    marginTop: 8,
    paddingVertical: 10,
    margin: 18,
    borderRadius: 10,
    backgroundColor: "#0002cd",
    marginBottom: 10,
    alignItems: "center",
   
  },
  innerText: {
    color: "black",
  },
  title: {
    // paddingBottom: 10,
    fontSize: 26,
    alignSelf: "center",
    color: "#0002cd",
    marginTop: -30
  

  },
  title2: {
    fontSize: 12,
    fontFamily: "sans-serif-condensed",
    color: "#000000",
    textAlign: "center",
    margin:3,
    marginLeft: 10,
    marginRight: 10
  },
  img: {
    marginTop: -2,
    margin: 10,
    marginLeft: 10,
    
  },
  direccion: {
    flexDirection: "column",
    justifyContent: "space-evenly",

  },
});
