import React, { useState, useEffect } from "react";
import { globalStyles } from "../styles/global";
import {
  AppRegistry,
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import Requestor from "../lib/Requestor";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const apiKey = "API KEY HERE";
let facelistId = "facelist_001";
let facelistData = {
  name: "My student facelist",
};

let faceApiBaseUrl = "https://faceapizo.cognitiveservices.azure.com/";

export default function TakeAttendance({ navigation }) {
  var studentList = navigation.getParam("list");
  const [image, setImage] = useState("");
  const [list, setList] = useState(studentList);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

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

  function createFaceList() {
    Requestor.request(
      faceApiBaseUrl + "/face/v1.0/facelists/" + facelistId,
      "PUT",
      apiKey,
      JSON.stringify(facelistData)
    ).then(function (res) {
      Alert.alert("Face List Created!");
    });
    for (var i = 0; i < list.length; i++) {
      var studentData = {
        name: list[i].name,
        filename: list[i].uri,
      };
      console.log(list[i].name + " is adding");

      Requestor.upload(
        faceApiBaseUrl +
          "/face/v1.0/facelists/" +
          facelistId +
          "/persistedFaces",
        apiKey,
        list[i].uri,
        {
          userData: JSON.stringify(studentData),
        }
      ).then((res) => {
        console.log("Student " + i + " is added to list");
      });
    }
  }

  async function getStudentFromFace() {
    //captures the face
    if (this.SnapCamera) {
      let imgData = await this.SnapCamera.takePictureAsync();
      setImage(imgData.uri);
    }

    Requestor.upload(faceApiBaseUrl + "/face/v1.0/detect", apiKey, image).then(
      (facedetect_res) => {
        let faceId = facedetect_res[0].faceId;

        let data = {
          faceId: faceId,
          faceListId: facelistId,
          maxNumOfCandidatesReturned: 1,
        };

        Requestor.request(
          faceApiBaseUrl + "/face/v1.0/findsimilars",
          "POST",
          apiKey,
          JSON.stringify(data)
        ).then((similarfaces_res) => {
          let similarFace = similarfaces_res[1];

          Requestor.request(
            faceApiBaseUrl + "/face/v1.0/facelists/" + facelistId,
            "GET",
            apiKey
          ).then((facelist_res) => {
            let userData = {};
            facelist_res["persistedFaces"].forEach((face) => {
              if (face.persistedFaceId == similarFace.persistedFaceId) {
                userData = JSON.parse(face.userData);
              }
            });

            Alert.alert(
              "Similar to: " +
                userData.name +
                " with confidence of " +
                similarFace.confidence
            );
          });
        });
      }
    );
  }

  /*
  const takeImageForAtt = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("No Access To Camera!");
      return;
    }
    Alert.alert("Take a photo to identify student");
    let imgData = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    console.log(imgData);

    if (!imgData.cancelled) {
      setImage(imgData);
    }
  };
  */

  async function saveList(aurl, list) {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    };
    const response = await fetch(aurl, requestOptions);
  }

  function saveButton() {
    var urladdress =
      "https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=atten";
    const response = saveList(urladdress, list);
  }

  function Item({ chooseItem, item, index, borderWidth, borderColor }) {
    return (
      <TouchableOpacity
        style={globalStyles.listContainer}
        onPress={() => chooseItem(item.key)}
      >
        <Text style={globalStyles.itemText}>{item.name}</Text>
        <BouncyCheckbox
          onPress={chooseItem}
          isChecked={item.present}
          fillColor="#2e8b57"
        />
      </TouchableOpacity>
    );
  }

  function chooseItem(key) {
    const changedList = list.map((item) => {
      if (item.key === key) {
        item.present ? (item.present = false) : (item.present = true);
      }
      return item;
    });
    setList(changedList);
  }

  const renderItem = ({ item, index }) => {
    const borderWidth = item.selected ? 4 : 1;
    const borderColor = item.selected ? "darkseagreen" : "black";
    return (
      <View style={globalStyles.container}>
        <Item
          item={item}
          chooseItem={() => {
            chooseItem(item.key);
          }}
          index={index}
          borderWidth={{ borderWidth }}
          borderColor={{ borderColor }}
        />
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.dateText}>{date}</Text>
      <Button
        title="Create a Facelist"
        onPress={createFaceList}
        color="#4682b4"
      />
      <Camera
        ref={(ref) => {
          this.SnapCamera = ref;
        }}
        ratio={"1:1"}
        style={globalStyles.cameraContainer}
      />
      <View style={globalStyles.buttonStyle}>
        <Button
          title="Click to Identify a Student"
          onPress={getStudentFromFace}
          color="black"
        />
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={(item, index) => index}
      />
      <Button
        title="Attendance History"
        onPress={historyClickHandler}
        color="#4682b4"
      />
      <Button title="Submit Attendance" onPress={saveButton} color="#4682b4" />
    </View>
  );
}
AppRegistry.registerComponent("takeAttendance", () => TakeAttendance);
