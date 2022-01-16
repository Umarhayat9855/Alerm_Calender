import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  LogBox,
  RefreshControl,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../utils/colors';
import Header from '../../components/header';
import TaskDetail from '../../components/taskDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GLOBAL } from '../../utils/global';
import { UIActivityIndicator } from 'react-native-indicators';
import database from '@react-native-firebase/database';
import PushNotification from "react-native-push-notification";
import Geolocation from 'react-native-geolocation-service'; 
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import MapMarker from './MapView';
LogBox.ignoreAllLogs();
const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const HomeScreen = (props: any) => {
  const [User, setUser] = useState('');
  const [taskList, setTaskList] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [select, setSelect] = useState('Event');
  const [LocationName, setLocationName] = React.useState('');
  // const SelectFun = (id) => {
  //   setSelect(id)
  // }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    console.log('UseEffect in Home');
    database()
    .ref('users')
.orderByChild('UserType')
.equalTo('Parent')    
.once('value')
.then(snapshot => {
// console.log('User data: ', snapshot.val());
let array = snapshot.val()
// let val=Object.values(array)
console.log("Parent get ",array)
})
    createChannel()
    getUserInfo();
    getLocation();
  },[refreshing]);


  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'Test',
      channelName: 'Test Name'
    })
  };
  // YOU HAVE TO FETCH DATA AND OF EVENTS 
  // WITH DATE AND TIME
  const pushlocalNotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'Test',
      title: 'Hello This is New',
      message: 'its Time to your medicine',
      // REPLACE THE TIME FROM BACKEND IN HERE
      // date: new Date(Date.now() + 5 * 1000),
      date:new Date("2021-11-03 16:46:05"),
      // THIS ALLOWS NOTIFICATION TO RUN EVEN  
      // WHEN THE APP ISN'T RUNNING
      allowWhileIdle: true,
    })
  };

  const getUserInfo = async () => {
    const userInfo: any = await AsyncStorage.getItem('@user');
    // console.log('User Infosdfv : ', JSON.parse(userInfo));
    const temp = JSON.parse(userInfo);
    getEvent();
    setUser(temp);
    var PositionCor=null;
    {
        // try {
        //   const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        //     // {
        //     //   'title': 'Example App',
        //     //   'message': 'Example App access to your location '
        //     // }
        //   )
          // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
            var Latitude=null;
    var Longitude=null;
    Geolocation.getCurrentPosition(
        (position) => {
            Latitude=position.coords.latitude,
            Longitude=position.coords.longitude,
            console.log('position.coords.latitude',User,position);
            PositionCor=position;
database().ref(`/Location/${temp}`)
  .set({
    latitude:position.coords.latitude,
    longitude:position.coords.longitude,
    UserId:temp,
  })
  .then(() => {

  })
           Geocoder.init('AIzaSyAuSbEVaxvQ8UaTJrQAU_wBOIVk5TVm73o')
    console.log('Geocoder',Geocoder);
    Geocoder.from({
        latitude : position.coords.latitude,
        longitude : position.coords.longitude,

    })
.then(json => {
    var addressComponent = json.results[0].address_components[0];
    console.log(json);
    console.log(json.plus_code.compound_code);
    setLocationName(json.plus_code.compound_code);
})
.catch(error =>
    console.warn('Errorkjsbck',error)
);
        },
        (error) => {
            console.log(error.code, error.message);
        },
        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 100000
        },
        
    );
    console.log('Latitude After',Latitude);
    console.log('Longitude After',Longitude);
    
          // } 
          // else {
          //   console.log("location permission denied")
          //   alert("Location permission denied");
          // }
        // } catch (err) {
        //   console.warn(err)
        // }
      }
      // database()
      //       .ref(`/Location/${User}`)
      //       .once('value')
      //       .then(snapshot => {
              
      //         // let response = await AsyncStorage.setItem('@userType',UserType);
      //       })
//       const newReference = database().ref('/Location').push();

// console.log('Auto generated key: ', newReference.key);
  };
  const getLocation = async () => {
    


    
}
  const getEvent = () => {
    setSelect('Event')
    // console.log('getEvent')
    database()
      .ref('Events')
      .orderByChild('userID')
      .equalTo(User)
      .once('value')
      .then(snapshot => {
        // console.log('User data: ', snapshot.val());
        let array = snapshot.val()
        // console.log('JSON.parse(snapshot.val())', Object.values(array));
        setTaskList(Object.values(array))
        console.log("array",array)
      });
  };
  const getTodoTask = () => {
    setSelect('TodoTask')
    // console.log('getTodoTask')
    database()
      .ref('TodoTask')
      .orderByChild('userID')
      .equalTo(User)
      .once('value')
      .then(snapshot => {
        // console.log('User data: ', snapshot.val());
        let array = snapshot.val()
        // console.log('JSON.parse(snapshot.val())', Object.values(array));
        setTaskList(Object.values(array))
      });
  };
  const getReminder = () => {
    setSelect('Reminder')
    // console.log('getReminder')
    database()
      .ref('Reminder')
      .orderByChild('userID')
      .equalTo(User)
      .once('value')
      .then(snapshot => {
        // console.log('User data: ', snapshot.val());
        let array = snapshot.val()
        // console.log('JSON.parse(snapshot.val())', Object.values(array));
        setTaskList(Object.values(array))
      });
  };
  const ShowData = () => {
    getEvent()
  }
  return (
    <View style={styles.container}>
      <Header
        bellIcon={true}
        menuIcon={true}
        menuIconPress={() => {
          props.navigation.toggleDrawer();
        }}
        title={'Home'}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            marginLeft: '5%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity onPress={getLocation}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: 'Raleway-Medium',
              }}>
              Upcomming
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontFamily: 'Raleway-Medium',
              }}>
              Tasks
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Raleway-Medium',
            }}>
            Today
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            // flex: ,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Raleway-Medium',
              marginLeft: '5%',
            }}>
            My Tasks
          </Text>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TouchableOpacity style={select === 'Event' ? styles.ButtonSel : styles.UnButtonSel} onPress={getEvent}>
              <Text style={select === 'Event' ? styles.ButtonSelText : styles.UnButtonSelText}>Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={select === 'TodoTask' ? styles.ButtonSel : styles.UnButtonSel} onPress={getTodoTask}>
              <Text style={select === 'TodoTask' ? styles.ButtonSelText : styles.UnButtonSelText}>Todo Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={select === 'Reminder' ? styles.ButtonSel : styles.UnButtonSel} onPress={getReminder}>
              <Text style={select === 'Reminder' ? styles.ButtonSelText : styles.UnButtonSelText}>Reminder</Text>
            </TouchableOpacity>
          </View>
          {/* {console.log('taskList.lengthtaskList.length', taskList)} */}
          {/* {taskList.length === undefined ? ( */}
          {/* <FlatList
              data={taskList}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              style={{height: 270}}
              key={'_'}
              renderItem={({item}) => {
                return (
                  // <TaskDetail
                  //   title={item.tastTitle}
                  //   description={item.tastDescription}
                  //   image={
                  //     item.taskTypeID == 3
                  //       ? require('../../../assets/icons/task_white.png')
                  //       : item.taskTypeID == 1
                  //       ? require('../../../assets/icons/reminder_white.png')
                  //       : null
                  //   }
                  //   imageStyle={{
                  //     height:
                  //       item.taskTypeID == 3
                  //         ? 32
                  //         : item.taskTypeID == 1
                  //         ? 45
                  //         : null,
                  //     width: 30,
                  //     color: colors.white,
                  //   }}
                  //   color={item.taskColorCode}
                  // />
                  <Text>sjdc</Text>
                );
              }}
            /> */}
          {
            // console.log('', taskList)
          }
          <FlatList
            data={taskList}
            // data={[{
            //   title: 'Title',
            //   discription: 'Discription',
            //   color: '#CB96ED',
            //   icon: require('../../../assets/icons/reminder_white.png'),
            //   height: 45,
            //   width: 30,
            // },]}

            // keyExtractor={(item) => item.id}
            // keyExtractor = {(item, index) => index}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{ height: 270 }}
            // key={'_'}
            renderItem={({ item }) => {
              return (
                <TaskDetail
                  title={item.Title}
                  description={item.Description}
                  image={item.Image}
                  // imageStyle={{
                  //   height: 50,
                  //   width: 30,
                  //   color:'#CB96ED',
                  // }}
                  color={item.Color}
                />
              );
            }}
          />
          {/* ) : (
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                height: 200,
              }}>
              {isLoading ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    // justifyContent: 'center',
                  }}>
                  No tasks Found
                </Text>
              ) : (
                <UIActivityIndicator color={colors.mainAppColor} size={30} />
              )}
            </View>
          )} */}

          <TouchableOpacity onPress={ShowData}
            style={{
              width: '90%',
              marginLeft: '5%',
              alignItems: 'center',
              paddingVertical: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.mainAppColor,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.mainAppColor,
              }}>
              See More
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 30,
            // width : '90%',
            // marginLeft: '5%'
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Raleway-Medium',
              marginLeft: '5%',
            }}>
            My People 1
          </Text>
          <TouchableOpacity
            onPress={()=>props.navigation.navigate('MapView',{
              UserID:User
            })}
            style={{
              width: '90%',
              marginLeft: '5%',
              alignItems: 'center',
              paddingVertical: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.mainAppColor,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.mainAppColor,
              }}>
              See Location on Map
            </Text>
          </TouchableOpacity>
          <FlatList
            data={[
              {
                title: 'Title',
                discription: 'Discription',
                color: '#FEC67D',
                icon: require('../../../assets/icons/eventIcon.png'),
                height: 35,
                width: 30,
              },
              {
                title: 'Title',
                discription: 'Discription',
                color: '#36E2BE',
                icon: require('../../../assets/icons/task_white.png'),
                height: 32,
                width: 30,
              },
              {
                title: 'Title',
                discription: 'Discription',
                color: '#CB96ED',
                icon: require('../../../assets/icons/reminder_white.png'),
                height: 45,
                width: 30,
              },
              {
                title: 'Title',
                discription: 'Discription',
                color: '#FEC67D',
                icon: require('../../../assets/icons/eventIcon.png'),
                height: 35,
                width: 30,
              },
              {
                title: 'Title',
                discription: 'Discription',
                color: '#36E2BE',
                icon: require('../../../assets/icons/task_white.png'),
                height: 32,
                width: 30,
              },
              {
                title: 'Title',
                discription: 'Discription',
                color: '#CB96ED',
                icon: require('../../../assets/icons/reminder_white.png'),
                height: 45,
                width: 30,
              },
            ]}
            // keyExtractor={(item) => item.id}
            // keyExtractor = {(item, index) => index}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{ height: 270 }}
            key={'_'}
            renderItem={({ item }) => {
              return (
                <TaskDetail
                  title={item.title}
                  description={item.discription}
                  image={item.icon}
                  imageStyle={{
                    height: item.height,
                    width: item.width,
                    color: colors.white,
                  }}
                  color={item.color}
                />
              );
            }}
          />

          <TouchableOpacity
            style={{
              width: '90%',
              marginLeft: '5%',
              alignItems: 'center',
              paddingVertical: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.mainAppColor,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.mainAppColor,
              }}>
              See More
            </Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  ButtonSel: {
    marginTop: 10,
    width: '31%',
    height: 40,
    borderBottomWidth: 2,
    justifyContent: 'center',
    borderColor: "#FEC67D",

  },
  UnButtonSel: {
    marginTop: 10,
    width: '31%',
    height: 40,
    // borderBottomWidth:2,
    justifyContent: 'center',
  },
  ButtonSelText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
  },
  UnButtonSelText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
  },

});

export default HomeScreen;
