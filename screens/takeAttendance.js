import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "../styles/global";
import Constants from "expo-constants";

export default function TakeAttendance({ navigation }) {
  var studentList = navigation.getParam("list");

  const backClickHandler = () => {
    navigation.navigate("StudentList");
  };
  const historyClickHandler = () => {
    navigation.navigate("History");
  };

  const [date, setDate] = useState(null);

  useEffect(() => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    setDate(date);
  }, []);

  const [list, setlist] = useState([]);

  async function loadList(aurl, alist) {
    const response = await fetch(aurl); // read the remote data file via fetch 'await' blocks
    const names = await response.json(); // parse the returned json object

    // add the returned list to the existing list
    names.forEach((item) => {
      // alist.push({ key: alist.length+1, title: item.title, selected: false })
      alist.push({
        key: alist.length + 1,
        name: item.studentName,
        uri: item.uri,
        present: false,
        selected: false,
      });
    });

    const newList = alist.map((item) => {
      return item;
    });
    setlist(newList);
  }

  async function saveList(aurl, list) {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    };
    const response = await fetch(aurl, requestOptions);
  }

  function loadButton() {
    var urladdress =
      "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=atten";
    // console.log("painnnnn")
    const response = loadList(urladdress, list, setlist);
  }

  function saveButton() {
    var urladdress =
      "https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=atten";
    const response = saveList(urladdress, list);
  }
  //<Button title="Go back to Student List" onPress={backClickHandler} />

  return (
    <View>
      <Text style={globalStyles.dateText}>{date}</Text>
      <Text>Take Attendance</Text>
      <Text>Name of the first student: {studentList[0].name}</Text>
      <Button
        style={globalStyles.button}
        title="Attendance History"
        onPress={historyClickHandler}
      />
      <Button title="Submit Attendence" onPress={saveButton} />
    </View>
  );
}
