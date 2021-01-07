import { StyleSheet } from "react-native";

export const forms = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 30,
    marginHorizontal: 10,
  },
  background: {
    paddingVertical: 50,
  },
  text: {
    flexDirection: "column",
    fontSize: 30,
    marginRight: 10,
    textAlign: "center",
    marginTop: 10,
    opacity: 0.8,
    color: "#000000",
  },
  touchable: {
    color: "#000000",
    marginHorizontal: 130,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#00aae4",
  },
  input: {
    flexDirection: "column",
    marginHorizontal: 30,
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
  img: {
    alignSelf: "center",
    height: 120,
    width: 120
  },
  logo: {
    alignSelf: "center",
    fontSize: 25,
    marginVertical: 10,
    color: "#8A8E8A"
  }
});
