import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { globalStyles } from "../styles/global";
import Constants from "expo-constants";
import RBSheet from "react-native-raw-bottom-sheet";
import DialogInput from "react-native-dialog-input";
import * as ImagePicker from "expo-image-picker";

export default function StudentList({ navigation }) {
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

  const clickHandlerA = () => {
    navigation.navigate("StudentList");
  };

  const clickHandlerH = () => {
    navigation.navigate("History");
  };

  const clickHandlerC = () => {
    navigation.navigate("Credits");
  };

  return (
    <SafeAreaView style={globalStyles.container}>
        <Text style={globalStyles.titleText}>Attendance App</Text>
      <Text style={globalStyles.dateText}>{date}</Text>

      <View>
          <Button
          title="Take Attendance"
          onPress={clickHandlerA}
          color="#4682b4"
          borderWidth = "5px"
        />
        <Button
          title="Attendance History"
          onPress={clickHandlerH}
          color="#4682b4"
          borderWidth = "5px"
        />
        <Button
          title="Credits"
          onPress={clickHandlerC}
          color="#4682b4"
          borderWidth = "5px"
        />
        </View>
      </SafeAreaView>
  );
}
