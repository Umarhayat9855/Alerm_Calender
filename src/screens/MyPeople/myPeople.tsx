import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';

import {colors} from '../../utils/colors';
import HeaderScreen from '../../components/header';
import CardHorizental from '../../components/cardHorizental';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {GLOBAL} from '../../utils/global';
import {UIActivityIndicator} from 'react-native-indicators';

const MyPeople = (props: any) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userList, setUserList] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userInfo: any = await AsyncStorage.getItem('@user');
    const temp = JSON.parse(userInfo);
    console.log('temp: ', temp['id']);
    setUserInfo(temp);
    getUsersList(temp?.id);
  };

  const getUsersList = (id: any) => {
    axios
      .post(GLOBAL.GET_YOUR_USERS_LIST, {
        childID: id,
      })
      .then(function (response: any) {
        if (response?.data?.status == 200) {
          // console.log(response?.data?.users);
          let filteredData = response?.data?.users;
          setUserList(filteredData);
          setLoading(true);
          return;
        }
        setUserList([]);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(true);
      });
  };
  const {bellIcon} = props;
  return (
    <View style={styles.container}>
      <HeaderScreen
        title={'My People'}
        addIcon={true}
        navigation={props.navigation}
      />

      {isLoading ? (
        userList.length > 1 ? (
          <FlatList
            data={userList}
            keyExtractor={(item: any) => item.id}
            renderItem={({item}) => {
              console.log(item);
              if (item?.id != userInfo?.id)
                return (
                  <CardHorizental
                    item={item}
                    relation={item.userType == 1 ? 'Parent' : 'Child'}
                    navigation={props.navigation}
                  />
                );
              else return null;
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  padding: '0.2%',
                  backgroundColor: colors.mainAppColor,
                }}></View>
            )}
            ListFooterComponent={() => (
              <View
                style={{
                  padding: '0.2%',
                  backgroundColor: colors.mainAppColor,
                }}></View>
            )}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24,
                // justifyContent: 'center',
              }}>
              Nothing Found
            </Text>
          </View>
        )
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <UIActivityIndicator color={colors.mainAppColor} size={50} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

export default MyPeople;
