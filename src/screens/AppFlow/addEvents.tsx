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
export default function AddEvents(props: any) {
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
    console.log('dateStart',dateStart,)
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
    const newReference = database().ref('/Events').push();

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
        <HeaderScreen title="Add Event" navigation={props.navigation} />
        <Image
          source={require('../../../assets/images/event.png')}
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
            Timeline
          </Text>
          <TouchableOpacity onPress={showDatepickerStartDate}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Raleway-Regular',
                  marginLeft: '5%',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                From
              </Text>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: '5%',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Raleway-Regular',
                  }}>
                  {moment(dateStart).utc().local().format('dddd, DD MMMM YYYY')}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Raleway-Regular',
                  }}>
                  {moment(dateStart).utc().local().format('h:mm a')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={showDatepickerEndDate}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Raleway-Regular',
                  marginLeft: '5%',
                  marginVertical: 5,
                }}>
                To
              </Text>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: '5%',
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
