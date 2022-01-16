import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  Alert
} from 'react-native';
import { colors } from '../../utils/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UIActivityIndicator } from 'react-native-indicators';
import axios from 'axios';
import { GLOBAL } from '../../utils/global';
import DropdownAlert from 'react-native-dropdownalert';
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
export default function Login(props: any) {
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [isLoading, setLoading] = useState<any>(false);
  let dropDownAlertRef = useRef<any>(null);

  useEffect(() => {
    SplashScreen.hide();
  });

  const onLogin = async () => {
    let Type = null;
    await AsyncStorage.removeItem('@userType');
    const { navigation } = props;
    setLoading(true);
    auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        dropDownAlertRef.current?.alertWithType(
          'success',
          'Success',
          'Successfully Login'
        );
        const user = auth().currentUser;
        if (user) {
          console.log('User email: ', user.uid);
          AsyncStorage.setItem(
            '@user',
            JSON.stringify(user.uid),
          );
          database()
            .ref(`/users/${user.uid}`)
            .once('value')
            .then(snapshot => {
              // console.log('Data is in login ', snapshot.val());
              // const Array=snapshot.val();
              const Array = Object.keys(snapshot.val());
              // console.log('is in login')
              const UserType = Array.toString().replace(/^\s+|\s+$/g, '');
              console.log('User data is in login ', UserType);
              Type = UserType
              StogeVal(UserType)
              // let response = await AsyncStorage.setItem('@userType',UserType);
            })
        }
        // setLoading(false);
        // props.navigation.navigate('Drawer')
        // setTimeout(
        //   () =>
        //     props.navigation.dispatch(
        //       CommonActions.reset({
        //         index: 0,
        //         routes: [{name: 'Drawer'}],
        //       }),
        //     ),
        //       1000,
        //     );
        return;

      })
      // .catch(err => {
      //   setLoading(false)
      //     // Alert.alert('Login with right Email & Password')
      //     console.log(err)
      // })
      .catch(err => {
        dropDownAlertRef.current.alertWithType(
          'error',
          'Error',
          'Please Check Email or Password'
        );
        // setLoading(false);
      })

    // axios
    //   .post(GLOBAL.LOGIN, {
    //     email,
    //     password,
    //   })
    //   .then(async response => {
    //     console.log(response?.data);

    //     if (response?.data?.status == 200) {
    //       await AsyncStorage.setItem(
    //         '@user',
    //         JSON.stringify(response?.data?.userData),
    //       );
    //       dropDownAlertRef.current?.alertWithType(
    //         'success',
    //         'Success',
    //         response?.data?.message,
    //       );
    //       setLoading(false);
    //       setTimeout(
    //         () =>
    //           props.navigation.dispatch(
    //             CommonActions.reset({
    //               index: 0,
    //               routes: [{name: 'Drawer'}],
    //             }),
    //           ),
    //         1000,
    //       );
    //       return;
    //     }
    //     dropDownAlertRef.current.alertWithType(
    //       'error',
    //       'Error',
    //       response?.data?.message,
    //     );
    //     setLoading(false);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     dropDownAlertRef.current.alertWithType(
    //       'error',
    //       'Error',
    //       'Something went wrong.',
    //     );
    //     setLoading(false);
    //   });
    console.log('Type', Type)
    // let response = await AsyncStorage.setItem('@userType',Type); 
    // console.log('response',response)
    // setLoading(false);
  };
  const StogeVal = async (val: string) => {
    console.log('val before Saving', val)
    try {
      await AsyncStorage.setItem('@userType', val);
      props.navigation.push('Drawer')
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
    //let response = await AsyncStorage.setItem('@userType',val);

    // if(response===null){
    //   props.navigation.navigate('Drawer')
    //   setLoading(false);
    // }
  }
  return (
    <View style={styles.container}>
      <DropdownAlert ref={dropDownAlertRef} />
      <StatusBar
        backgroundColor={colors.mainBGColor}
        animated={true}
        barStyle={'dark-content'}
      />
      <KeyboardAwareScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '30%',
          }}>
          <Text
            style={{
              color: colors.black,
              fontSize: 30,
              fontWeight: '600',
            }}>
            Sign In To{' '}
          </Text>
          <Text
            style={{
              color: colors.mainAppColor,
              fontSize: 30,
              fontWeight: '600',
            }}>
            Care Tech
          </Text>
        </View>
        <TextInput
          placeholder={'Email'}
          style={{
            width: '80%',
            marginLeft: '10%',
            borderWidth: 1,
            borderColor: colors.mainAppColor,
            borderRadius: 5,
            paddingLeft: 10,
            marginTop: '10%',
          }}
          onChangeText={text => setEmail(text)}
          placeholderTextColor={colors.placeholderTextColor}
        />

        <TextInput
          placeholder={'Password'}
          style={{
            width: '80%',
            marginLeft: '10%',
            borderWidth: 1,
            borderColor: colors.mainAppColor,
            borderRadius: 5,
            paddingLeft: 10,
            marginTop: 15,
          }}
          onChangeText={text => setPassword(text)}
          placeholderTextColor={colors.placeholderTextColor}
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={() => {
            // props.navigation.navigate('MyProfile')
          }}>
          <Text
            style={{
              marginLeft: '10%',
              fontSize: 14,
              color: colors.black,
              marginTop: 10,
            }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.mainAppColor,
            width: '80%',
            marginLeft: '10%',
            alignItems: 'center',
            paddingVertical: 10,
            borderRadius: 5,
            marginTop: '15%',
          }}
          onPress={() => onLogin()}>
          {isLoading ? (
            <UIActivityIndicator size={30} color={colors.white} />
          ) : (
            <Text
              style={{
                fontSize: 24,
                color: colors.white,
                fontWeight: '600',
              }}>
              Sign In
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <View
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={{ fontSize: 18, color: colors.black }}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
          <Text
            style={{ marginLeft: 5, fontSize: 18, color: colors.mainAppColor }}>
            Sign Up
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
