import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 3,
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
    aspectRatio: 1,
    resizeMode: "cover",
    borderWidth: 1,
    marginRight: 5,
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#778899",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  cameraContainer: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    borderWidth: 1,
  },
  photoContainer: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    borderWidth: 1,
    borderColor: "black",
  },
  itemText: {
    flex: 1,
    marginLeft: 7,
    marginTop: 5,
    marginRight: 5,
    textAlign: "left",
    fontFamily: "Optima",
    color: "#708090",
    borderRadius: 10,
    fontSize: 30,
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
  dateText: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    fontFamily: "Optima",
    color: "#708090",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    position: "absolute",
    bottom: 0,
  },
});
