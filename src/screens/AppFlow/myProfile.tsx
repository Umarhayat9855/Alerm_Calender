import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import HeaderScreen from '../../components/header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyProfile = (props: any) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userInfo: any = await AsyncStorage.getItem('@user');
    const temp = JSON.parse(userInfo);
    console.log('temp: ', temp['id']);
    setUserInfo(temp);
  };

  return (
    <View style={styles.container}>
      <HeaderScreen title={'My Profile'} navigation={props.navigation} />
      <View
        style={{
          height: 120,
          width: 120,
          borderRadius: 70,
          alignSelf: 'center',
          marginTop: 25,
        }}>
        <Image
          source={require('../../../assets/images/john.png')}
          style={{
            height: 120,
            width: 120,
          }}
          resizeMode={'cover'}
        />
      </View>

      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          marginTop: 5,
          fontFamily: 'Raleway-Medium',
        }}>
        {userInfo?.fullName}
      </Text>

      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          marginTop: 5,
          fontFamily: 'Raleway-Medium',
        }}>
        {userInfo?.email}
      </Text>

      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            fontFamily: 'Raleway-Medium',
            marginLeft: '5%',
          }}>
          Change Password:
        </Text>
        <TextInput
          placeholder={'Old Password'}
          value={oldPassword}
          style={{
            width: '90%',
            marginLeft: '5%',
            borderColor: colors.mainAppColor,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 20,
            paddingLeft: 15,
          }}
          secureTextEntry={true}
          onChangeText={text => setOldPassword(text)}
        />

        <TextInput
          placeholder={'New Password'}
          value={newPassword}
          style={{
            width: '90%',
            marginLeft: '5%',
            borderColor: colors.mainAppColor,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 15,
            paddingLeft: 15,
          }}
          secureTextEntry={true}
          onChangeText={text => setNewPassword(text)}
        />

        <TextInput
          placeholder={'Confirm Password'}
          value={confirmPassword}
          style={{
            width: '90%',
            marginLeft: '5%',
            borderColor: colors.mainAppColor,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 15,
            paddingLeft: 15,
          }}
          secureTextEntry={true}
          onChangeText={text => setConfirmPassword(text)}
        />

        <TouchableOpacity
          style={{
            width: '90%',
            marginLeft: '5%',
            backgroundColor: colors.mainAppColor,
            paddingVertical: 10,
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 24,
              fontFamily: 'Raleway-Medium',
            }}>
            Save Password
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default MyProfile;
