import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import StudentList from "../screens/studentList";
import TakeAttendance from "../screens/takeAttendance";
import Constants from "expo-constants";

const screens = {
  StudentList: {
    screen: StudentList,
    navigationOptions: {
      title: "Student List",
    },
  },
  TakeAttendance: {
    screen: TakeAttendance,
    navigationOptions: {
      title: "Take Attendance",
    },
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
