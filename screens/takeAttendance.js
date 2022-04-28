import React, { useState, useEffect } from "react";
import { AppRegistry, View, Text, Button, Alert } from "react-native";
import { globalStyles } from "../styles/global";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import Requestor from "../lib/Requestor";

const apiKey = "21e04042d9d641319d10f1a42fbfcc3d";
let facelistId = "facelist_001";
let facelistData = {
  name: "My student facelist",
};

let faceApiBaseUrl = "https://faceapizo.cognitiveservices.azure.com/";

export default function TakeAttendance({ navigation }) {
  var studentList = navigation.getParam("list");
  const [image, setImage] = useState("");
  const [list, setList] = useState(studentList);

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
    for (var i = 0; i < studentList.length; i++) {
      var studentData = {
        name: studentList[i].name,
        filename: studentList[i].uri,
      };
      console.log(studentList[i].name + " is adding");

      Requestor.upload(
        faceApiBaseUrl +
          "/face/v1.0/facelists/" +
          facelistId +
          "/persistedFaces",
        apiKey,
        studentList[i].uri,
        {
          userData: JSON.stringify(studentData),
        }
      ).then((res) => {
        console.log("Student " + i + " is added to list");
      });
    }
  }

  function getStudentFromFace() {
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

            setImage(userData.filename);
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

  return (
    <View>
      <Text style={globalStyles.dateText}>{date}</Text>
      <Text>Take Attendance</Text>
      <Text>Name of the first student: {studentList[0].name}</Text>
      <Button title="Create a Facelist" onPress={createFaceList} />
      <Button
        style={globalStyles.button}
        title="Attendance History"
        onPress={historyClickHandler}
      />
      <Button title="Submit Attendence" onPress={saveButton} />
    </View>
  );
}
AppRegistry.registerComponent("takeAttendance", () => TakeAttendance);
