import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {UIActivityIndicator} from 'react-native-indicators';
import DropDownPicker from 'react-native-dropdown-picker';
import {GLOBAL} from '../../utils/global';
import DropdownAlert from 'react-native-dropdownalert';
// import SingalSelectDropdownModal from '../../components/SingalSelectDropdownModal';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function Signup(props: any) {
  const [fullName, setFullName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [age, setAge] = useState<any>('');
  const [gender, setGender] = useState<any>(null);
  const [password, setPassword] = useState<any>('');
  const [confirmPassword, setConfirmPassword] = useState<any>('');
  const [userType, setUserType] = useState<any>('');
  const [isLoading, setLoading] = useState<any>(false);
  const [openModalGender, setOpenModalGender] = useState<boolean>(false);
  const [openModalUser, setOpenModalUser] = useState<any>(false);

  let dropDownAlertRef = useRef<any>(null);

  const genderData: any = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];

  const UserTypesData: any = [
    {label: 'Child', value: 'Child'},
    {label: 'Parent', value: 'Parent'},
  ];

  // const onCloseModalUser = () => {
  //   setOpenModalUser(false);
  // };

  // const onClickValuesUser = (id: any, name: any) => {
  //   console.log('ID: ', id);
  //   console.log('Name: ', name);

  //   setUserType({
  //     id,
  //     name,
  //   });
  // };

  // const onCloseModalGender = (open: boolean) => {
  //   setOpenModalGender(open);
  // };

  // const onClickValuesGender = (id: any, name: any) => {
  //   console.log('Name: ', name);
  //   setGender(name);
  // };
  const onSubmit = () => {
    if (password != confirmPassword) {
      dropDownAlertRef.current?.alertWithType(
        'error',
        'Error',
        'Password does not match.',
      );
      return;
    }
    onSignup();
  };
  const onSignup = async () => {
    setLoading(true);
    auth().createUserWithEmailAndPassword(email, password)
      .then((res) => {  
        console.log(res)
        dropDownAlertRef.current?.alertWithType(
          'success',
          'Success',
          'Successfully',
        );
        const user = auth().currentUser;
      if (user) {
        console.log('User email: ', user.uid);
        database()
        .ref(`/users/${user.uid}/${userType}`)
        .set({
          Name: fullName,
          Email: email,
          Age:age,
          Gender:gender,
          UserType:userType
        })
        .then(() => {
          props.navigation.navigate('Login')
          dropDownAlertRef.current?.alertWithType(
            'success',
            'Success',
            'Successfully',
          )
        });
      }
      setLoading(false);
      })
      .catch(err => {
        console.log(err)
        dropDownAlertRef.current.alertWithType(
          'error',
          'Error',
          'Error',
        );
        setLoading(false);
      })
  }
  // const onSignup = async () => {
  //   const {navigation} = props;

  //   setLoading(true);

  //   axios
  //     .post(GLOBAL.SIGNUP, {
  //       fullName,
  //       email,
  //       gender,
  //       age,
  //       password,
  //       userType,
  //     })
  //     .then(function (response) {
  //       if (response?.data?.status == 200) {
  //         dropDownAlertRef.current?.alertWithType(
  //           'success',
  //           'Success',
  //           response?.data?.message,
  //         );
  //         setLoading(false);
  //         setTimeout(() => navigation.navigate('Login'), 1000);
  //         return;
  //       }
  //       console.log(response.data);
  //       dropDownAlertRef.current.alertWithType(
  //         'error',
  //         'Error',
  //         response?.data?.message,
  //       );
  //       setLoading(false);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       dropDownAlertRef.current.alertWithType(
  //         'error',
  //         'Error',
  //         'Something went wrong.',
  //       );
  //       setLoading(false);
  //     });
  // };

  return (
    <View style={styles.container}>
      <DropdownAlert ref={dropDownAlertRef} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps={'handled'}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            marginTop: '5%',
          }}>
          Create Account
        </Text>
        <Image
          source={require('../../../assets/icons/profile.png')}
          style={{
            height: 120,
            width: 120,
            alignSelf: 'center',
            marginTop: '5%',
          }}
          resizeMode={'contain'}
        />
        <TextInput
          value={fullName}
          placeholder={'Full Name'}
          style={{
            width: '80%',
            marginLeft: '10%',
            borderWidth: 1,
            borderColor: colors.mainAppColor,
            borderRadius: 5,
            paddingLeft: 10,
            marginTop: 20,
            fontFamily: GLOBAL.FONT_FAMILY,
          }}
          onChangeText={text => setFullName(text)}
          placeholderTextColor={colors.placeholderTextColor}
        />

        <TextInput
          value={email}
          placeholder={'Email'}
          style={{
            width: '80%',
            marginLeft: '10%',
            borderWidth: 1,
            borderColor: colors.mainAppColor,
            borderRadius: 5,
            paddingLeft: 10,
            marginTop: 10,
            fontFamily: GLOBAL.FONT_FAMILY,
          }}
          onChangeText={text => setEmail(text)}
          placeholderTextColor={colors.placeholderTextColor}
        />

        {/* <TextInput
          value={gender}
          placeholder={'Gender'}
          style={{
            width: '80%',
            marginLeft: '10%',
            borderWidth: 1,
            borderColor: colors.mainAppColor,
            borderRadius: 5,
            paddingLeft: 10,
            marginTop: 10,
            fontFamily: GLOBAL.FONT_FAMILY,
          }}
          onChangeText={text => setGender(text)}
          placeholderTextColor={colors.placeholderTextColor}
        /> */}

        <DropDownPicker
          open={openModalGender}
          value={gender}
          items={genderData}
          setOpen={setOpenModalGender}
          setValue={setGender}
          labelStyle={{
            fontFamily: GLOBAL.FONT_FAMILY,
            color: '#787878',
          }}
          placeholder={'Gender'}
          placeholderStyle={{
            fontFamily: GLOBAL.FONT_FAMILY,
            color: '#787878',
          }}
          style={{
            borderWidth: 1,
            borderColor: colors.mainAppColor,
            marginTop: '4%',
            width: '80%',
            alignSelf: 'center',
          }}
          dropDownContainerStyle={{
            borderWidth: 1,
            borderColor: colors.mainAppColor,
            marginTop: 10,
            width: '80%',
            alignSelf: 'center',
          }}
        />
        {/*<TouchableOpacity
            style={{
              width: '100%',
              borderRadius: 5,
              padding: 15,
            }}
            onPress={() => setOpenModalGender(true)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {gender === null ? (
                <Text
                  style={{
                    fontFamily: GLOBAL.FONT_FAMILY,
                    color: '#787878',
                  }}>
                  Gender{' '}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: GLOBAL.FONT_FAMILY,
                    color: '#4F4C4C',
                  }}
                  allowFontScaling={true}>
                  {gender}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View> */}

        <TextInput
          value={age}
          placeholder={'Age'}
          style={{
            width: '80%',
            marginLeft: '10%',
            borderWidth: 1,
            borderColor: colors.mainAppColor,
            borderRadius: 5,
            paddingLeft: 10,
            marginTop: 10,
            fontFamily: GLOBAL.FONT_FAMILY,
          }}
          keyboardType={'numeric'}
          onChangeText={text => setAge(text)}
          placeholderTextColor={colors.placeholderTextColor}
        />

        <DropDownPicker
          open={openModalUser}
          value={userType}
          items={UserTypesData}
          setOpen={setOpenModalUser}
          setValue={setUserType}
          labelStyle={{
            fontFamily: GLOBAL.FONT_FAMILY,
            color: '#787878',
          }}
          placeholder={'Which user are you?'}
          placeholderStyle={{
            fontFamily: GLOBAL.FONT_FAMILY,
            color: '#787878',
          }}
          style={{
            borderWidth: 1,
            borderColor: colors.mainAppColor,
            marginTop: '4%',
            width: '80%',
            alignSelf: 'center',
          }}
          dropDownContainerStyle={{
            borderWidth: 1,
            borderColor: colors.mainAppColor,
            marginTop: 10,
            width: '80%',
            alignSelf: 'center',
          }}
        />

        {/* <View
          style={[
            {
              marginTop: '4%',
              marginHorizontal: '10%',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: colors.mainAppColor,
            },
          ]}>
          <TouchableOpacity
            style={{
              width: '100%',
              borderRadius: 5,
              padding: 15,
            }}
            onPress={() => setOpenModalUser(true)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {userType?.name === null ? (
                <Text
                  style={{
                    fontFamily: GLOBAL.FONT_FAMILY,
                    color: '#787878',
                  }}>
                  Which user are you?{' '}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: GLOBAL.FONT_FAMILY,
                    color: '#4F4C4C',
                  }}
                  allowFontScaling={true}>
                  {userType?.name}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View> */}

        <TextInput
          value={password}
          placeholder={'Password'}
          style={{
            width: '80%',
            marginLeft: '10%',
            borderWidth: 1,
            borderColor: colors.mainAppColor,
            borderRadius: 5,
            paddingLeft: 10,
            marginTop: 10,
            fontFamily: GLOBAL.FONT_FAMILY,
          }}
          onChangeText={text => setPassword(text)}
          placeholderTextColor={colors.placeholderTextColor}
          secureTextEntry={true}
        />

        <TextInput
          value={confirmPassword}
          placeholder={'Confirm Password'}
          style={{
            width: '80%',
            marginLeft: '10%',
            borderWidth: 1,
            borderColor: colors.mainAppColor,
            borderRadius: 5,
            paddingLeft: 10,
            marginTop: 10,
            fontFamily: GLOBAL.FONT_FAMILY,
          }}
          onChangeText={text => setConfirmPassword(text)}
          placeholderTextColor={colors.placeholderTextColor}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={{
            backgroundColor: colors.mainAppColor,
            width: '80%',
            marginLeft: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            borderRadius: 5,
            marginTop: '15%',
          }}
          disabled={isLoading}
          onPress={() => onSubmit()}>
          {isLoading ? (
            <UIActivityIndicator size={30} color={colors.white} />
          ) : (
            <Text
              style={{
                fontSize: 24,
                color: colors.white,
                fontWeight: '600',
                fontFamily: GLOBAL.FONT_FAMILY,
              }}>
              Sign Up
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      {/* {openModalUser && (
        <SingalSelectDropdownModal
          showModal={openModalUser}
          filter={1}
          checkedValue={userType?.name}
          setModalClose={onCloseModalUser}
          setCheckboxClicked={onClickValuesUser}
        />
      )}
      {openModalGender && (
        <SingalSelectDropdownModal
          showModal={openModalGender}
          filter={2}
          checkedValue={gender}
          setModalClose={onCloseModalGender}
          setCheckboxClicked={onClickValuesGender}
        />
      )} */}
      <View
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 18,
            color: colors.black,
            fontFamily: GLOBAL.FONT_FAMILY,
          }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text
            style={{
              fontFamily: GLOBAL.FONT_FAMILY,
              marginLeft: 5,
              fontSize: 18,
              color: colors.mainAppColor,
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
