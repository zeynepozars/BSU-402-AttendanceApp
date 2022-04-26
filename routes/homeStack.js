import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import StudentList from "../screens/studentList";
import TakeAttendance from "../screens/takeAttendance";
import History from "../screens/History"
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
  History: {
    screen: History,
    navigationOptions: {
      title: "History",
    },
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
