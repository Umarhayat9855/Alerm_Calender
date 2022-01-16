// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   TextInput,
//   Platform,
//   Alert,
// } from 'react-native';
// import {colors} from '../../utils/colors';
// import TaskBgColor from '../../components/taskBgColor';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import HeaderScreen from '../../components/header';
// import Feather from 'react-native-vector-icons/Feather';
// import {GLOBAL} from '../../utils/global';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import DropDownPicker from 'react-native-dropdown-picker';
// import moment from 'moment';
// import axios from 'axios';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {UIActivityIndicator} from 'react-native-indicators';
// import DropdownAlert from 'react-native-dropdownalert';
// import {useRef} from 'react';

// export default function AddReminder(props: any) {
//   const [userInfo, setUserInfo] = useState<any>(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState<any>('date');
//   const [show, setShow] = useState<any>(false);
//   const [duration, setDuration] = useState<any>(0);
//   const [userList, setUserList] = useState<any>([]);
//   const [coverImage, setCoverImage] = useState<any>(null);
//   const [openDurationDropDown, setOpenDurationDropDown] = useState<any>(false);
//   const [openPersonDropDown, setOpenPersonDropDown] = useState<any>(false);
//   const [person, setPerson] = useState('');
//   const [backgroundColor, setBackgroundColor] = useState('');
//   const [isLoading, setLoading] = useState<boolean>(true);
//   let dropDownAlertRef = useRef<any>(null);

//   useEffect(() => {
//     getUserInfo();
//   }, []);

//   const getUserInfo = async () => {
//     const userInfo: any = await AsyncStorage.getItem('@user');
//     const temp = JSON.parse(userInfo);
//     console.log('temp: ', temp['id']);
//     setUserInfo(temp);
//     getUsersList(temp?.id);
//   };

//   const durationData: any = [
//     {label: 'Everyday', value: 0},
//     {label: 'Weekly', value: 1},
//     {label: 'Monthly', value: 2},
//     {label: 'Yearly', value: 3},
//   ];

//   const onChange = (event: any, selectedDate: any) => {
//     console.log('onChange');
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     setDate(currentDate);
//     if (mode == 'date') showTimepicker();
//   };

//   const showMode = (currentMode: any) => {
//     console.log('showMode');
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     console.log('showDatepicker');
//     showMode('date');
//   };

//   const showTimepicker = () => {
//     console.log('showTimepicker');
//     showMode('time');
//   };

//   const gallery = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//       },
//       async (image: any) => {
//         console.log('Gallery: ', image.assets[0]);
//         setCoverImage({
//           fileName: image.assets[0].fileName,
//           uri: image.assets[0].uri,
//           type: image.assets[0].type,
//         });
//       },
//     );
//   };

//   const camera = () => {
//     launchCamera(
//       {
//         mediaType: 'photo',
//         includeBase64: false,
//       },
//       async (image: any) => {
//         console.log('CAmera: ', image.assets[0]);
//         setCoverImage({
//           fileName: image.assets[0].fileName,
//           uri: image.assets[0].uri,
//           type: image.assets[0].type,
//         });
//       },
//     );
//   };

//   const openPicker = () => {
//     Alert.alert(
//       'Upload Image',
//       'Please select Image source.',
//       [
//         {text: 'Gallery', onPress: () => gallery()},
//         {text: 'Camera', onPress: () => camera()},
//       ],
//       {cancelable: true},
//     );
//   };

//   const getUsersList = (id: any) => {
//     axios
//       .post(GLOBAL.GET_YOUR_USERS_LIST, {
//         childID: id,
//       })
//       .then(function (response: any) {
//         if (response?.data?.status == 200) {
//           console.log(response?.data?.users);
//           setUserList(
//             response?.data?.users?.map((item: any) =>
//               item.id == id
//                 ? {
//                     value: item.id,
//                     label: 'Myself',
//                   }
//                 : {
//                     value: item.id,
//                     label: item.username,
//                   },
//             ),
//           );
//           setLoading(true);
//           return;
//         }
//         setUserList([]);
//         setLoading(true);
//       })
//       .catch(function (error) {
//         console.log(error);
//         setLoading(true);
//       });
//   };

//   const onSave = async () => {
//     Alert.alert('sdcs')
//     // const {navigation} = props;
//     // console.log('onSave',
//     //   person,
//     //   title,
//     //   description,
//     //   date,
//     //   duration,
//     //   backgroundColor.trim(),
//     //   coverImage,
//     // );

//     // let formData = new FormData();
//     // formData.append('assignedBy', userInfo?.id);
//     // formData.append('assignedTo', person);
//     // formData.append('taskTypeID', 'q');
//     // formData.append('taskTitle', title);
//     // formData.append('taskDescription', description);
//     // formData.append(
//     //   'taskDate',
//     //   moment(date).utc().local().format('YYYY MM DD HH:mm:ss'),
//     // );
//     // formData.append(
//     //   'taskStartTime',
//     //   moment(date).utc().local().format('YYYY MM DD HH:mm:ss'),
//     // );
//     // formData.append('colorCode', backgroundColor);
//     // formData.append('taskImage', {
//     //   name: coverImage?.fileName,
//     //   type: 'image/jpeg',
//     //   uri: coverImage?.uri,
//     // });

//     // console.log(formData);
//     // setLoading(false);

//     // axios
//     //   .post(GLOBAL.ADD_TASK, formData)
//     //   .then(function (response) {
//     //     if (response?.data?.status == 200) {
//     //       console.log('handled: ', response.data);
//     //       dropDownAlertRef.current.alertWithType(
//     //         'success',
//     //         'Success',
//     //         response?.data?.message,
//     //       );
//     //       setLoading(true);
//     //       setTimeout(() => navigation.goBack(), 500);
//     //       return;
//     //     }
//     //     dropDownAlertRef.current.alertWithType(
//     //       'error',
//     //       'Error',
//     //       response?.data?.message,
//     //     );
//     //     setLoading(true);
//     //     return;
//     //   })
//     //   .catch(function (error) {
//     //     console.log('handled error:', error);
//     //     dropDownAlertRef.current.alertWithType(
//     //       'error',
//     //       'Error',
//     //       'Something went wrong.',
//     //     );
//     //     setLoading(true);
//     //   });
//   };

//   return (
//     <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
//       <DropdownAlert ref={dropDownAlertRef} />
//       <View style={styles.container}>
//         <HeaderScreen title="Add Reminder" navigation={props.navigation} />
//         <Image
//           source={require('../../../assets/images/reminder.png')}
//           style={{
//             width: '100%',
//             height: 150,
//           }}
//         />
//         <TextInput
//           placeholder={'Title'}
//           placeholderTextColor={colors.black}
//           value={title}
//           style={{
//             fontSize: 18,
//             fontFamily: 'Raleway-Medium',
//             borderBottomWidth: 1,
//             borderBottomColor: colors.mainAppColor,
//             width: '100%',
//             paddingLeft: 20,
//             marginTop: '5%',
//           }}
//           onChangeText={text => setTitle(text)}
//         />

//         <TextInput
//           placeholder={'Description'}
//           placeholderTextColor={colors.black}
//           value={description}
//           style={{
//             fontSize: 18,
//             fontFamily: 'Raleway-Medium',
//             borderBottomWidth: 1,
//             borderBottomColor: colors.mainAppColor,
//             width: '100%',
//             paddingLeft: 20,
//             marginTop: 20,
//           }}
//           multiline={true}
//           onChangeText={text => setDescription(text)}
//         />

//         <View
//           style={{
//             width: '100%',
//           }}>
//           <DropDownPicker
//             open={openDurationDropDown}
//             value={duration}
//             items={durationData}
//             setOpen={setOpenDurationDropDown}
//             setValue={setDuration}
//             labelStyle={{
//               fontFamily: GLOBAL.FONT_FAMILY,
//               color: colors.black,
//               fontSize: 18,
//               marginLeft: '5%',
//             }}
//             placeholder={'Everyday'}
//             placeholderStyle={{
//               fontFamily: GLOBAL.FONT_FAMILY,
//               color: colors.black,
//               fontSize: 18,
//               marginLeft: '5%',
//             }}
//             style={{
//               borderWidth: 1,
//               borderColor: colors.white,
//               marginTop: '4%',
//               width: '40%',
//               alignSelf: 'flex-start',
//             }}
//             showArrowIcon={false}
//             dropDownContainerStyle={{
//               borderWidth: 1,
//               borderColor: colors.mainAppColor,
//               // marginTop: 50,
//               marginBottom: -8,
//               marginLeft: '3%',
//               width: '40%',
//               alignSelf: 'flex-start',
//               overflow: 'scroll',
//             }}
//             dropDownDirection={'TOP'}
//           />
//           <TouchableOpacity
//             onPress={showDatepicker}
//             style={{
//               width: '90%',
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginLeft: '5%',
//               marginTop: 10,
//             }}>
//             <View>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontFamily: 'Raleway-Regular',
//                 }}>
//                 {moment(date).utc().local().format('dddd, DD MMMM YYYY')}
//               </Text>
//             </View>
//             <View>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontFamily: 'Raleway-Regular',
//                 }}>
//                 {moment(date).utc().local().format('h:mm a')}
//               </Text>
//             </View>
//           </TouchableOpacity>

//           {show && (
//             <DateTimePicker
//               testID="dateTimePicker"
//               value={date}
//               mode={mode}
//               is24Hour={true}
//               display="default"
//               onChange={onChange}
//             />
//           )}

//           <View
//             style={{
//               width: '100%',
//               height: 1,
//               backgroundColor: colors.mainAppColor,
//               marginTop: 20,
//             }}
//           />

//           <View
//             style={{
//               width: '100%',
//             }}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontFamily: 'Raleway-Medium',
//                 marginLeft: '5%',
//                 marginTop: 20,
//               }}>
//               Select Person
//             </Text>

//             <DropDownPicker
//               open={openPersonDropDown}
//               value={person}
//               items={userList}
//               setOpen={setOpenPersonDropDown}
//               setValue={setPerson}
//               labelStyle={{
//                 fontFamily: GLOBAL.FONT_FAMILY,
//                 color: '#787878',
//               }}
//               placeholder={'Select Person'}
//               placeholderStyle={{
//                 fontFamily: GLOBAL.FONT_FAMILY,
//                 color: '#787878',
//               }}
//               style={{
//                 borderWidth: 1,
//                 borderColor: colors.white,
//                 width: '95%',
//                 alignSelf: 'center',
//               }}
//               dropDownContainerStyle={{
//                 borderWidth: 1,
//                 borderColor: colors.mainAppColor,
//                 width: '95%',
//                 alignSelf: 'center',
//               }}
//             />

//             <View
//               style={{
//                 width: '100%',
//                 height: 1,
//                 backgroundColor: colors.mainAppColor,
//               }}
//             />
//           </View>
//         </View>

//         <TaskBgColor setBackgroundColor={setBackgroundColor} />

//         <View
//           style={{
//             margin: '4%',
//           }}>
//           {coverImage ? (
//             <Image
//               source={coverImage}
//               style={{
//                 width: '100%',
//                 height: 150,
//               }}
//             />
//           ) : (
//             <TouchableOpacity
//               onPress={() => openPicker()}
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 paddingVertical: '20%',
//                 borderWidth: 3,
//                 borderColor: 'grey',
//               }}>
//               <Text
//                 style={{
//                   color: 'grey',
//                   fontSize: 18,
//                 }}>
//                 Add Cover Image...
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         <TouchableOpacity
//           style={{
//             backgroundColor: colors.mainAppColor,
//             paddingVertical: 10,
//             alignItems: 'center',
//             marginBottom: 50,
//             width: '80%',
//             marginLeft: '10%',
//             marginTop: '10%',
//           }}
//           onPress={onSave}>
//           {isLoading ? (
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontFamily: 'Raleway-Medium',
//                 color: colors.white,
//               }}>
//               Save Reminder
//             </Text>
//           ) : (
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <UIActivityIndicator color={colors.white} size={30} />
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
// });


import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import {colors} from '../../utils/colors';
import TaskBgColor from '../../components/taskBgColor';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderScreen from '../../components/header';
import moment from 'moment';
import axios from 'axios';
import {GLOBAL} from '../../utils/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UIActivityIndicator} from 'react-native-indicators';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
export default function AddReminder(props: any) {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userType, setuserType] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ImageUrl , seturl] = useState('');
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [modeStartDate, setModeStartDate] = useState<any>('date');
  const [modeEndDate, setModeEndDate] = useState<any>('date');
  const [showStartDate, setShowStartDate] = useState<any>(false);
  const [showEndDate, setShowEndDate] = useState<any>(false);
  const [duration, setDuration] = useState<any>(0);
  const [userList, setUserList] = useState<any>([]);
  const [coverImage, setCoverImage] = useState<any>(null);
  const [openPersonDropDown, setOpenPersonDropDown] = useState<any>(false);
  const [person, setPerson] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FEC67D');
  const [isLoading, setLoading] = useState<boolean>(true);
  let dropDownAlertRef = useRef<any>(null);
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userInfo: any = await AsyncStorage.getItem('@user');
    const temp = JSON.parse(userInfo);
    console.log('userType in add event',temp)
    const usertype: any = await AsyncStorage.getItem('@userType');
    console.log('userType in add event',usertype)
    setUserInfo(temp);
    setuserType(usertype);
    // getUsersList(temp?.id);
    
  };

  const onChangeStartDate = (event: any, selectedDate: any) => {
    console.log('onChange');
    const currentDate = selectedDate || dateStart;
    setShowStartDate(Platform.OS === 'ios');
    setDateStart(currentDate);
    if (modeStartDate == 'date') showTimepickerStartDate();
  };

  const showModeStartDate = (currentMode: any) => {
    console.log('showMode');
    setShowStartDate(true);
    setModeStartDate(currentMode);
  };

  const showDatepickerStartDate = () => {
    console.log('showDatepicker');
    showModeStartDate('date');
  };

  const showTimepickerStartDate = () => {
    console.log('showTimepicker');
    showModeStartDate('time');
  };

  const onChangeEndDate = (event: any, selectedDate: any) => {
    console.log('onChange');
    const currentDate = selectedDate || dateStart;
    setShowEndDate(Platform.OS === 'ios');
    setDateEnd(currentDate);
    if (modeEndDate == 'date') showTimepickerEndDate();
  };

  const showModeEndDate = (currentMode: any) => {
    console.log('showMode');
    setShowEndDate(true);
    setModeEndDate(currentMode);
  };

  const showDatepickerEndDate = () => {
    console.log('showDatepicker');
    showModeEndDate('date');
  };

  const showTimepickerEndDate = () => {
    console.log('showTimepicker');
    showModeEndDate('time');
  };

  const gallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async (image: any) => {
        console.log('Gallery: ', image.assets[0]);
        setCoverImage({
          fileName: image.assets[0].fileName,
          uri: image.assets[0].uri,
          type: image.assets[0].type,
        });
      },
    );
  };

  const camera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      async (image: any) => {
        console.log('CAmera: ', image.assets[0]);
        setCoverImage({
          fileName: image.assets[0].fileName,
          uri: image.assets[0].uri,
          type: image.assets[0].type,
        });
        const task = storage()
          .ref('umar')
          .putFile(image.assets[0].uri);
        // set progress state
        task.on('state_changed', snapshot => {
          
        });
        try {
          await task;
        } catch (e) {
          console.error(e);
        }
        console.log('Uploaded Image',image.assets[0].uri)
        let imageRef = storage().ref('/' + 'umar');
        imageRef
          .getDownloadURL()
          .then((url) => {
            //from url you can fetched the uploaded image easily
            console.log('urlgetDownloadURLgetDownloadURL',url)
            seturl(url)
          })
          .catch((e) => console.log('getting downloadURL of image error => ', e));
      },
    );
  };

  const openPicker = () => {
    Alert.alert(
      'Upload Image',
      'Please select Image source.',
      [
        {text: 'Gallery', onPress: () => gallery()},
        {text: 'Camera', onPress: () => camera()},
      ],
      {cancelable: true},
    );
  };

  // const getUsersList = (id: any) => {
  //   axios
  //     .post(GLOBAL.GET_YOUR_USERS_LIST, {
  //       childID: id,
  //     })
  //     .then(function (response: any) {
  //       if (response?.data?.status == 200) {
  //         console.log(response?.data?.users);
  //         setUserList(
  //           response?.data?.users?.map((item: any) =>
  //             item.id == id
  //               ? {
  //                   value: item.id,
  //                   label: 'Myself',
  //                 }
  //               : {
  //                   value: item.id,
  //                   label: item.username,
  //                 },
  //           ),
  //         );
  //         setLoading(true);
  //         return;
  //       }
  //       setUserList([]);
  //       setLoading(true);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       setLoading(true);
  //     });
  // };

  const onSave = async () => {
    
    console.log('userType',userType,)
    console.log('userInfo',userInfo,)
    console.log('person',person,)
    console.log('title',title,)
    console.log('description',description,)
    // console.log('dateStart',dateStart,)
    console.log('dateEnd',dateEnd,)
    console.log('backgroundColor.trim()',backgroundColor.trim(),)
    console.log('coverImage',ImageUrl,)
    // axios
    //   .post(GLOBAL.LOGIN, {
    //     title,
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    const newReference = database().ref('/Reminder').push();
  console.log('Auto generated key: ', newReference.key);

newReference
  .set({
    userID:userInfo,
    UserType:userType,
    PersonAdd: person,
    Title: title,
    Description:description,
    DateStart:dateStart,
    DateEnd:dateEnd,
    Color:backgroundColor.trim(),
    Image:ImageUrl
  })
  .then(() => {
    dropDownAlertRef.current?.alertWithType(
      'success',
      'Success',
      'Add Event Successfully',
    )
    props.navigation.push('Drawer')
  });
  //   database().ref(`/Events`)
  // .set({

  //   PersonAdd: person,
  //   Title: title,
  //   Description:description,
  //   DateStart:dateStart,
  //   DateEnd:dateEnd,
  //   Color:backgroundColor.trim(),
  //   Image:coverImage
  // })
  // .then(() => {
  //   dropDownAlertRef.current?.alertWithType(
  //     'success',
  //     'Success',
  //     'Add Event Successfully',
  //   )
  //   // props.navigation.push('Drawer')
  // });
  };
  
  return isLoading ? (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <HeaderScreen title="Add Task" navigation={props.navigation} />
       <Image
          source={require('../../../assets/images/task.png')}
          style={{
            width: '100%',
            height: 150,
          }}
        />
        <TextInput
          placeholder={'Title'}
          placeholderTextColor={colors.black}
          value={title}
          style={{
            fontSize: 18,
            fontFamily: 'Raleway-Medium',
            borderBottomWidth: 1,
            borderBottomColor: colors.mainAppColor,
            width: '100%',
            paddingLeft: 20,
            marginTop: '5%',
          }}
          onChangeText={text => setTitle(text)}
        />

        <TextInput
          placeholder={'Description'}
          placeholderTextColor={colors.black}
          value={description}
          style={{
            fontSize: 18,
            fontFamily: 'Raleway-Medium',
            borderBottomWidth: 1,
            borderBottomColor: colors.mainAppColor,
            width: '100%',
            paddingLeft: 20,
            marginTop: 20,
          }}
          multiline={true}
          onChangeText={text => setDescription(text)}
        />

        <View
          style={{
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Raleway-Medium',
              marginLeft: '5%',
              marginTop: 20,
            }}>
            Everyday
          </Text>
          <TouchableOpacity onPress={showDatepickerEndDate}>
            <View>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: '5%',
                  marginTop:10
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Raleway-Regular',
                  }}>
                  {moment(dateEnd).utc().local().format('dddd, DD MMMM YYYY')}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Raleway-Regular',
                  }}>
                  {moment(dateEnd).utc().local().format('h:mm a')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: colors.mainAppColor,
              marginTop: 20,
            }}
          />
        </View>

        {showStartDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateStart}
            mode={modeStartDate}
            is24Hour={true}
            display="default"
            onChange={onChangeStartDate}
          />
        )}

        {showEndDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateEnd}
            mode={modeEndDate}
            is24Hour={true}
            display="default"
            onChange={onChangeEndDate}
          />
        )}

        <View
          style={{
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Raleway-Medium',
              marginLeft: '5%',
              marginTop: 20,
            }}>
            Location
          </Text>

          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: colors.mainAppColor,
              marginTop: 10,
            }}
          />
        </View>

        <View
          style={{
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Raleway-Medium',
              marginLeft: '5%',
              marginTop: 20,
            }}>
            Invite People
          </Text>

          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: colors.mainAppColor,
              marginTop: 10,
            }}
          />
        </View>

        <TaskBgColor setBackgroundColor={setBackgroundColor} />

        <TouchableOpacity onPress={() => openPicker()}
          style={{
            margin: '4%',
          }}>
          {coverImage ? (
            <Image
              source={coverImage}
              style={{
                width: '100%',
                height: 150,
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => openPicker()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: '20%',
                borderWidth: 3,
                borderColor: 'grey',
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 18,
                }}>
                Add Cover Image...
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: colors.mainAppColor,
            paddingVertical: 10,
            alignItems: 'center',
            marginBottom: 50,
            width: '80%',
            marginLeft: '10%',
            marginTop: '10%',
          }}
          onPress={onSave}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Raleway-Medium',
              color: colors.white,
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
