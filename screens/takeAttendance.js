import React from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "../styles/global";
import Constants from "expo-constants";

export default function TakeAttendance({ navigation }) {
  var studentList = navigation.getParam("list");

  const clickHandler = () => {
    navigation.navigate("StudentList");
  };

  return (
    <View style={globalStyles.container}>
      <Text>Take Attendance</Text>
      <Button title="Go back to Student List" onPress={clickHandler} />
      <Text>Name of the first student: {studentList[0].name}</Text>
    </View>
  );
}
