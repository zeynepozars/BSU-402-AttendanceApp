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
  const [list, setList] = useState([]);
  const [cameraPermission, setCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [showMe, setShowMe] = useState(false);
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

  // loads the initial list
  useEffect(() => {
    fetchInitialData();
  }, []);

  if (cameraPermission === null) {
    return (
      <View>
        <Text>No Access To Camera</Text>
      </View>
    );
  }

  if (cameraPermission === false) {
    return (
      <View>
        <Text>No Access To Camera</Text>
      </View>
    );
  }

  async function fetchInitialData() {
    const resp = await fetch(
      "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=atten"
    );
    const inData = await resp.json();
    setList(inData);
  }

  /*
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
    setList(newList);
  }
  */

  function Item({ chooseItem, item, index, borderWidth, borderColor }) {
    return (
      <TouchableOpacity
        style={globalStyles.listContainer}
        onPress={() => chooseItem(item.key)}
      >
        <Text style={globalStyles.itemText}>{item.name}</Text>
        <Image
          style={[globalStyles.item, borderWidth, borderColor]}
          source={{ uri: list[index].uri }}
        />
      </TouchableOpacity>
    );
  }

  function chooseItem(key) {
    const changedList = list.map((item) => {
      if (item.key === key) {
        item.selected ? (item.selected = false) : (item.selected = true);
      }
      return item;
    });
    setList(changedList);
  }

  const addItem = (studentName) => {
    var newStudent = [];
    if (list.length === 0) {
      newStudent = [
        { key: 1, name: studentName, uri: "", present: false, selected: false },
      ];
    } else {
      newStudent = [
        {
          key: list.length + 1,
          name: studentName,
          uri: "",
          present: false,
          selected: false,
        },
      ];
    }
    newStudent = newStudent.concat(list);
    setList(newStudent);
    Alert.alert("Take a picture of the student!");
    this.RBSheet.open();
  };

  const addButton = () => {
    setShowMe(true);
  };

  const deleteItem = () => {
    setList((oldList) => {
      return oldList.filter((item) => item.selected != true);
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let imgData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(imgData);

    if (!imgData.cancelled) {
      const changedList = list.map((item) => {
        if (item.key === list[0].key) {
          item.uri = imgData.uri;
        }
        return item;
      });
      setList(changedList);
    }
  };

  const takeImage = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("No Access To Camera!");
      return;
    }
    let imgData = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    console.log(imgData);

    if (!imgData.cancelled) {
      const changedList = list.map((item) => {
        if (item.key === list[0].key) {
          item.uri = imgData.uri;
        }
        return item;
      });
      setList(changedList);
    }
  };

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

  const clickHandler = () => {
    navigation.navigate("TakeAttendance", { list });
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Attendance App</Text>
      <Text style={globalStyles.dateText}>{date}</Text>

      <View style={globalStyles.tabContainer}>
        <Button
          title="Add"
          onPress={() => addButton()}
          color="#778899"
        ></Button>
        <Button
          title="Delete"
          onPress={() => deleteItem()}
          color="#dc143c"
        ></Button>
      </View>
      <View style={globalStyles.container}>
        <FlatList
          data={list}
          renderItem={renderItem}
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
        <DialogInput
          isDialogVisible={showMe}
          title="Enter Student"
          message="Enter Student To Add"
          submitInput={(inputText) => {
            setShowMe(false);
            addItem(inputText);
          }}
          closeDialog={() => {
            setShowMe(false);
          }}
        ></DialogInput>
        <Button
          title="Take Attendance"
          onPress={clickHandler}
          color="#4682b4"
        />
      </View>
      <RBSheet
        ref={(ref) => {
          this.RBSheet = ref;
        }}
        height={300}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Button title="Take photo" onPress={takeImage}></Button>
        <Button title="Choose From Library" onPress={pickImage}></Button>
        <Button title="Cancel" onPress={() => this.RBSheet.close()}></Button>
      </RBSheet>
    </SafeAreaView>
  );
}
