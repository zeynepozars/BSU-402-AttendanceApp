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

  

  return (
    <SafeAreaView style={globalStyles.container}>
        <Text style={globalStyles.titleText}>Attendance App</Text>
      <Text style={globalStyles.dateText}>Built by: </Text>
      <View>
      <Text style={globalStyles.NameText}>Zeynep Ozarslan</Text>
      <Text style={globalStyles.NameText}>Andrew Gerber</Text>
      <Text style={globalStyles.NameText}>Cesar Raymundo</Text>
      </View>
      <View><Text style={globalStyles.NameText}>Built for CS402 Sp 2022, Professor Cutchin</Text></View>

      </SafeAreaView>
  );
}
