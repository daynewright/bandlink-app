import { StyleSheet } from "react-native";
import { primary } from "./Colors";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", //Colors[theme].backgroundContainer,
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: primary.lightgrey, //Colors[theme].borderColor,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#FFF", //Colors[theme].background,
  },
  btn: {
    backgroundColor: primary.orange, //Colors[theme].primary,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
  btnIcon: {
    position: "absolute",
    left: 16,
  },
  textLink: {
    display: "flex",
    alignItems: "center",
    margin: 10,
  },
});
