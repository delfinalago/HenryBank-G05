import { StyleSheet } from "react-native";

export const forms = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgb(255, 255, 255)",
    paddingVertical: 30,
    marginHorizontal: 20,
  
  },
  background: {
    paddingVertical: 200,
  

  },
  text: {
    flexDirection: "column",
    fontSize: 30,
    marginRight: 10,
    textAlign: "center",
    marginTop: 10,
    opacity: 0.6,
    color: "#000000",
  },
  touchable: {
    color: "#000000",
    marginHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#0002cd",
    
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
    borderColor: "#C0C0C0",
    paddingVertical: 2,
    fontFamily: "sans-serif-condensed"
  },
  img: {
    alignSelf: "center",
    height: 120,
    width: 120,
  },
  logo: {
    fontFamily: "sans-serif-condensed",
    alignSelf: "center",
    fontSize: 30,
    marginVertical: 10,
    color: "#8A8E8A",
  },
});
