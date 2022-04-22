import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 3,
  },
  photoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    borderWidth: 1,
    borderColor: "black",
  },
  tabContainer: {
    marginTop: 5,
    marginBottom: 3,
    padding: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    fontWeight: "bold",
  },
  item: {
    flex: 1,
    height: 150,
    width: 150,
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
  },
  itemText: {
    marginTop: 5,
    textAlign: "left",
    fontFamily: "Optima",
    color: "#708090",
  },
  titleText: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    fontFamily: "Optima",
    color: "#708090",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
});
