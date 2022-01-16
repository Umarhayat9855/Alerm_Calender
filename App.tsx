import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './src/screens/AuthFlow/login';
import Signup from './src/screens/AuthFlow/signup';
import AddReminder from './src/screens/AppFlow/addReminder';
import AddEvents from './src/screens/AppFlow/addEvents';
import AddTask from './src/screens/AppFlow/addTask';
import ChangePassword from './src/screens/AppFlow/myProfile';
import MyPeople from './src/screens/MyPeople/myPeople';
import AddNewPeople from './src/screens/AddPeople/addNewPeople';
import PeopleProfile from './src/screens/PeopleProfile/peopleProfile';
import Chat from './src/screens/Chat/chat';
import MapView from './src/screens/ParentHome/MapView';
// import HomeScreen from './src/screens/AppFlow/home';
// import MyProfile from './src/screens/AppFlow/myProfile';
import DrawerNavigator from './src/screens/DrawerNavigator/drawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "@react-native-firebase/app";
import getAnalytics from "@react-native-firebase/analytics";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptionStyle = {
  headerShown: false,
};

interface IProps { }

interface IState {
  initialRoute?: string;
}

class MainNavigator extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      initialRoute: '',
    };
    this.getUserInfo();
  }
  componentDidMount(){
    var firebaseConfig = {
      apiKey: "AIzaSyCbksZGaf0HEPafPs0XG7jzKSA9H1ShUFM",
      authDomain: "caretech-97787.firebaseapp.com",
      databaseURL: "https://caretech-97787-default-rtdb.firebaseio.com/",
      projectId: "caretech-97787",
      storageBucket: "caretech-97787.appspot.com",
      messagingSenderId: "930192739979",
      appId: "1:930192739979:web:b0443830928aef1fa3ce8e",
      measurementId: "G-4J27MV01TJ",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
   }else {
      firebase.app(); // if already initialized, use that one
   }
    // if (!firebase.app.length) {
    //   console.log("HELLO THERE~~!!")
    //   firebase.initializeApp(firebaseConfig)
    //   // let firestore = firebase.firestore();
    //   // const app = initializeApp(firebaseConfig);
    //   // const analytics = getAnalytics(app);
    // }
    //Initialize Firebase  
    const app = firebase.initializeApp(firebaseConfig);
    // const analytics = firebase.getAnalytics(app);
    console.log("analytics",app)
    // firebase.initializeApp(firebaseConfig)
  }
  getUserInfo = async () => {
   
    let userInfo: any = await AsyncStorage.getItem('@user');
    userInfo = JSON.parse(userInfo);
    console.log('User Info in App: ', userInfo);
    if (userInfo) {
      if (userInfo != null) this.setState({ initialRoute: 'Drawer' });
      console.log('userInfo != null');
    } else {
      this.setState({ initialRoute: 'Login' });
      console.log('userInfo else');
    }
  };


  // const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
  //   const progress = Animated.add(
  //     current.progress.interpolate({
  //       inputRange: [0, 1],
  //       outputRange: [0, 1],
  //       extrapolate: 'clamp',
  //     }),
  //     next
  //       ? next.progress.interpolate({
  //         inputRange: [0, 1],
  //         outputRange: [0, 1],
  //         extrapolate: 'clamp',
  //       })
  //       : 0,
  //   );

  //   return {
  //     cardStyle: {
  //       transform: [
  //         {
  //           translateX: Animated.multiply(
  //             progress.interpolate({
  //               inputRange: [0, 1, 2],
  //               outputRange: [
  //                 screen.width, // Focused, but offscreen in the beginning
  //                 0, // Fully focused
  //                 screen.width * -0.3, // Fully unfocused
  //               ],
  //               extrapolate: 'clamp',
  //             }),
  //             inverted,
  //           ),
  //         },
  //       ],
  //     },
  //   };
  // };

  render() {
    const { initialRoute } = this.state;
    return initialRoute ? (
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={screenOptionStyle}>
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
            <Stack.Screen
              name="AddReminder"
              component={AddReminder}></Stack.Screen>
            <Stack.Screen name="AddEvents" component={AddEvents}></Stack.Screen>
            <Stack.Screen name="AddTask" component={AddTask}></Stack.Screen>
            <Stack.Screen name="MyPeople" component={MyPeople}></Stack.Screen>
            <Stack.Screen name="Chat" component={Chat}></Stack.Screen>
            <Stack.Screen
              name="AddNewPeople"
              component={AddNewPeople}></Stack.Screen>
            <Stack.Screen
              name="PeopleProfile"
              component={PeopleProfile}></Stack.Screen>
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}></Stack.Screen>
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigator}></Stack.Screen>
            <Stack.Screen
              name="MapView"
              component={MapView}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    ) : null;
  }
}

export default MainNavigator;
