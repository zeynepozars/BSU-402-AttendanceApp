import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import StudentList from "../screens/studentList";
import TakeAttendance from "../screens/takeAttendance";
import Constants from "expo-constants";

const screens = {
  StudentList: {
    screen: StudentList,
  },
  TakeAttendance: {
    screen: TakeAttendance,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
