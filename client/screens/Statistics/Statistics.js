import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
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
    <ScrollView style={styles.scrollView}>
      
        <Text style={styles.title}>MIS GASTOS</Text>
        
      
      <View style={styles.container}>
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
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#4DBAF4",
          backgroundGradientTo: "#0FEA2D",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
            
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      </View>
      <View>
        <TouchableOpacity
          type="outline"
          title="Mensual"
          style={styles.boton}
          onPress={handleMovMesEg}
        >
        <Text style={{color: "#fff" , fontSize: 20}}>Mensual</Text>
        </TouchableOpacity>

        <TouchableOpacity
          type="outline"
          title="Semanal"
          style={styles.boton}
          onPress={handleMovSemEg}
        >
           <Text style={{color: "#fff" , fontSize: 20}}>Semanal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          type="outline"
          title="Diario"
          style={styles.boton}
          onPress={handleMovDiaEg}
        //´${handler}
        >
        <Text style={{color: "#fff" , fontSize: 20}}>Diario</Text>
        </TouchableOpacity>
       
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  container: {
    marginTop: 50,
  },
  text: {
    fontSize: 42,
  },
  input: {
    flexDirection: "column",
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    color: "#000000",
    alignItems: "center",
    borderWidth: 3,
    marginTop: 25,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00aae4",
    paddingVertical: 2,
  },
  boton: {
    color: "#fff",
    marginHorizontal: 130,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#00aae4",
  },
  innerText: {
    color: "white",
  },
  title: {
    paddingTop: 50,
    fontSize: 30,
    alignSelf: "center",
    color: "#00aae4",
    fontWeight: "bold",
  },
});
