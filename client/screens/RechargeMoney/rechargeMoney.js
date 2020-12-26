import React, { useState, useEffect } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Card from "./card";
import Code from "./code";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

export default function RechargeMoney() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Código" },
    { key: "second", title: "Tarjeta" },
  ]);

  const renderTabBar = (props) => <TabBar {...props} />;

  const renderScene = SceneMap({
    first: Code,
    second: Card,
  });

  const initialLayout = { width: Dimensions.get("window").width };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.tabVtiew}
    />
  );
}

const styles = StyleSheet.create({
  tabVtiew: {
    backgroundColor: "#fff",
    marginTop: 30,
  },
});
