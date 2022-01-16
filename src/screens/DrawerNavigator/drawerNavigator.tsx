import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';

import ChildHome from '../ChildHome/home';
import ParentHome from '../ParentHome/home';
import DrawerElements from './drawerElements';
import myProfile from '../AppFlow/myProfile';
import Chat from '../Chat/chat';
import MyPeople from '../MyPeople/myPeople';
import TimelineScreen from '../Timeline/timeline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, View,Text} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import {colors} from '../../utils/colors';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddNewPeople from '../AddPeople/addNewPeople';
const Drawer = createDrawerNavigator();

interface IProps {}

interface IState {
  userType?: any;
}

class DrawerNavigator extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      userType: '',
    };
    this.getUserInfo();
  }

  componentDidMount() {
    // console.log('componentDidMount')
    // this.getUserInfo();
    SplashScreen.hide();
  }
  getUserInfo = async () => {
    console.log('getUserInfo')
    const userInfo: any = await AsyncStorage.getItem('@user');
    const temp = JSON.parse(userInfo);
    console.log('UserInfo in Drawer',temp);
    let UserType = await AsyncStorage.getItem('@userType');
    // UserType = JSON.parse(UserType);
    console.log('User Type in getUserInfo', UserType);
    this.setState({userType:UserType})
  };
  render() {
    const userType = this.state.userType;
    console.log('userType in render ', userType);
    return userType != '' ? (
      <Drawer.Navigator
        drawerContent={props => <DrawerElements {...props} />}
        // initialRouteName='TimeLine'>
        initialRouteName={userType === 'Parent' ? 'ParentHome' : 'ChildHome'}>
        <Drawer.Screen
          options={{
            title: 'Home',
          }}
          name="ChildHome"
          component={ChildHome}
        />
        <Drawer.Screen
          options={{
            title: 'Home',
          }}
          name="ParentHome"
          component={ParentHome}
        />
        <Drawer.Screen
          name="MyProfileScreen"
          component={myProfile}></Drawer.Screen>
        <Drawer.Screen name="ChatScreen" component={Chat}></Drawer.Screen>
        <Drawer.Screen
          name="MyPeopleScreen"
          component={MyPeople}></Drawer.Screen>
        <Drawer.Screen
          name="TimeLine"
          component={TimelineScreen}></Drawer.Screen>
        <Drawer.Screen
          name="addNewPeople"
          component={AddNewPeople}></Drawer.Screen>
      </Drawer.Navigator>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <UIActivityIndicator color={colors.mainAppColor} size={50} />
      </View>
    );
  }
}
export default DrawerNavigator;
