import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  LogBox,
  RefreshControl
} from 'react-native';

import {colors} from '../../utils/colors';
import Header from '../../components/header';
import TaskDetail from '../../components/taskDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {GLOBAL} from '../../utils/global';
import {UIActivityIndicator} from 'react-native-indicators';
import database from '@react-native-firebase/database';
// LogBox.ignoreAllLogs();
const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const HomeScreen = (props: any) => {
  const [User,setUser] = useState('');
  const [taskList, setTaskList] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [select , setSelect] = useState('Event');
  // const SelectFun = (id) => {
  //   setSelect(id)
  // }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userInfo: any = await AsyncStorage.getItem('@user');
    console.log('User Infosdfv : ', JSON.parse(userInfo));
    const temp = JSON.parse(userInfo);
    // console.log('temp?.userType', temp?.id);
    getEvent();
    setUser(temp)
  };

  const getEvent = () => {
    setSelect('Event')
    console.log('getEvent')
    database()
    .ref('Events')
    .orderByChild('userID')
    .equalTo(User)
    .once('value')
    .then(snapshot => {
      // console.log('User data: ', snapshot.val());
      let array = snapshot.val()
      console.log('JSON.parse(snapshot.val())',Object.values(array));
      setTaskList(Object.values(array))
    });
  };
  const getTodoTask = () => {
    setSelect('TodoTask')
    console.log('getTodoTask')
    database()
    .ref('TodoTask')
    .orderByChild('userID')
    .equalTo(User)
    .once('value')
    .then(snapshot => {
      // console.log('User data: ', snapshot.val());
      let array = snapshot.val()
      console.log('JSON.parse(snapshot.val())',Object.values(array));
      setTaskList(Object.values(array))
    });
  };
  const getReminder = () => {
    setSelect('Reminder')
    console.log('getReminder')
    database()
    .ref('Reminder')
    .orderByChild('userID')
    .equalTo(User)
    .once('value')
    .then(snapshot => {
      // console.log('User data: ', snapshot.val());
      let array = snapshot.val()
      console.log('JSON.parse(snapshot.val())',Object.values(array));
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
          <View>
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
          </View>
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
          <View style={{flexDirection:'row',alignSelf:'center'}}>
            <TouchableOpacity style={select==='Event'?styles.ButtonSel:styles.UnButtonSel} onPress={getEvent}>
              <Text style={select==='Event'?styles.ButtonSelText:styles.UnButtonSelText}>Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={select==='TodoTask'?styles.ButtonSel:styles.UnButtonSel} onPress={getTodoTask}>
              <Text style={select==='TodoTask'?styles.ButtonSelText:styles.UnButtonSelText}>Todo Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={select==='Reminder'?styles.ButtonSel:styles.UnButtonSel} onPress={getReminder}>
              <Text style={select==='Reminder'?styles.ButtonSelText:styles.UnButtonSelText}>Reminder</Text>
            </TouchableOpacity>
          </View>
          {console.log('taskList.lengthtaskList.length',taskList)}
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
              console.log('',taskList)
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
            style={{height: 270}}
            // key={'_'}
            renderItem={({item}) => {
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
            style={{height: 270}}
            key={'_'}
            renderItem={({item}) => {
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
  ButtonSel:{
    marginTop:10,
    width:'31%',
    height:40,
    borderBottomWidth:2,
    justifyContent:'center',
    borderColor:"#FEC67D",

  },
  UnButtonSel:{
    marginTop:10,
    width:'31%',
    height:40,
    // borderBottomWidth:2,
    justifyContent:'center',
  },
  ButtonSelText:{
    textAlign:'center',
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
  },
  UnButtonSelText:{
    textAlign:'center',
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
  },

});

export default HomeScreen;
