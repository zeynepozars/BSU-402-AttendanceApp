import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Alert,
  CheckBox,
} from "react-native";
import Constants from "expo-constants";
import StudentList from "./screens/studentList";
import Navigator from "./routes/homeStack";

export default function App() {
  return <Navigator />;
}
