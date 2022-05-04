import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import StudentList from "../screens/studentList";
import TakeAttendance from "../screens/takeAttendance";
import History from "../screens/History"
import Home from "../screens/Home"
import Credits from "../screens/Credits"
import Constants from "expo-constants";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home",
    },
  },
  Credits: {
    screen: Credits,
    navigationOptions: {
      title: "Credits",
    },
},
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
