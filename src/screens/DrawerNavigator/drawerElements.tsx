import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import {colors} from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Separator from '../../components/separator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

export default function DrawerElements(props: any) {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userType, setUserType] = useState<any>(null);
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userInfo: any = await AsyncStorage.getItem('@user');
    const temp = JSON.parse(userInfo);
    console.log('temp: ', temp['userType']);
    setUserInfo(temp);
    setUserType(temp['userType']);
  };

  return (
    <View style={styles.container}>
      <Drawer.Section
        style={{
          backgroundColor: colors.mainAppColor,
          width: '100%',
          height: '25%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../../assets/icons/profile.png')}
          style={{
            height: 100,
            width: 100,
            tintColor: colors.white,
          }}
          resizeMode={'contain'}
        />

        <Text
          style={{
            fontSize: 18,
            color: colors.white,
            marginVertical: 3,
          }}>
          {/* {userInfo?.fullName} */}
        </Text>

        <Text
          style={{
            fontSize: 18,
            color: colors.white,
          }}>
          {/* {userInfo?.email.toLowerCase()} */}
        </Text>
      </Drawer.Section>

      <Drawer.Section>
        <DrawerItem
          onPress={() => props.navigation.navigate('HomeScreen')}
          icon={() => {
            return <Icon name={'home'} size={20} color={colors.mainAppColor} />;
          }}
          labelStyle={{
            color: colors.mainAppColor,
          }}
          label={'Home'}
        />
        <Separator />
        {userType != 0 && (
          <DrawerItem
            onPress={() => props.navigation.navigate('addNewPeople')}
            icon={() => {
              return (
                <Image
                  source={require('../../../assets/icons/people.png')}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  resizeMode={'contain'}
                />
              );
            }}
            labelStyle={{
              color: colors.mainAppColor,
            }}
            label={'Add People'}
          />
        )}
        <Separator />
        {userType != 0 && (
          <DrawerItem
            onPress={() => props.navigation.navigate('TimeLine')}
            icon={() => {
              return (
                <Image
                  source={require('../../../assets/icons/timeline.png')}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  resizeMode={'contain'}
                />
              );
            }}
            labelStyle={{
              color: colors.mainAppColor,
            }}
            label={'Timeline'}
          />
        )}
        {userType != 0 && <Separator />}

        {userType == 1 && (
          <DrawerItem
            onPress={() => props.navigation.navigate('MyPeopleScreen')}
            icon={() => {
              return (
                <Image
                  source={require('../../../assets/icons/people.png')}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  resizeMode={'contain'}
                />
              );
            }}
            labelStyle={{
              color: colors.mainAppColor,
            }}
            label={'People'}
          />
        )}
        {userType != 0 && <Separator />}

        <DrawerItem
          onPress={() => props.navigation.navigate('ChatScreen')}
          icon={() => {
            return (
              <Image
                source={require('../../../assets/icons/chat.png')}
                style={{
                  height: 20,
                  width: 20,
                }}
                resizeMode={'contain'}
              />
            );
          }}
          labelStyle={{
            color: colors.mainAppColor,
          }}
          label={'Chat'}
        />
        <Separator />

        <DrawerItem
          onPress={() => props.navigation.navigate('MyProfileScreen')}
          icon={() => {
            return <Icon name={'user'} size={20} color={colors.mainAppColor} />;
          }}
          labelStyle={{
            color: colors.mainAppColor,
          }}
          label={'Profile'}
        />
        <Separator />

        <DrawerItem
          onPress={async () => {
            await AsyncStorage.removeItem('@user');
            await AsyncStorage.removeItem('@userType');
            // props.navigation.dispatch(
            //   CommonActions.reset({
            //     index: 0,
            //     routes: [{name: 'Login'}],
            //   }),
            // );
            props.navigation.navigate('Login')
          }}
          icon={() => {
            return (
              <Icon name={'sign-out'} size={20} color={colors.mainAppColor} />
            );
          }}
          labelStyle={{
            color: colors.mainAppColor,
          }}
          label={'Logout'}
        />
        {/* <Separator /> */}
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
