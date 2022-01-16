import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropdownAlert from 'react-native-dropdownalert';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

import PersonCard from '../../components/cardPerson';
import HeaderScreen from '../../components/header';

import { colors } from '../../utils/colors';
import { GLOBAL } from '../../utils/global';
import { Select } from 'native-base';

const AddNewPeople = (props: any) => {
  const [User, setUser] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [userList, setUserList] = useState<any>([]);
  const [isLoading, setLoading] = useState<any>(true);
  const [arryUserData, setArryUserData] = useState<any>([]);
  const [eEmail, seteEmail] = useState<any>([]);


  let dropDownAlertRef = useRef<any>(null);

  useEffect(() => {
    getParentUsers();
  }, []);

  const searchPerson = () => {
    Keyboard.dismiss();

    setLoading(false);
    axios
      .post(GLOBAL.SEARCH_PERSON, {
        email,
      })
      .then(function (response: any) {
        if (response?.data?.status == 200) {
          setUserList([response?.data?.searchedUser]);
          setLoading(true);
          return;
        }
        setUserList([]);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showAlert = (code: string, title: string, message: string) => {
    dropDownAlertRef.current?.alertWithType(code, title, message);
  };

  const CreateUser = () => {
    console.log('EmailEmailEmail', eEmail)
    firestore()
      .collection(eEmail)
      .add({
        name: 'Hayat',
        latestMessage: {
          text: `Added`,
          createdAt: new Date().getTime()
        }
      })
      .then(docRef => {
        docRef.collection('MESSAGES').add({
          text: ``,
          createdAt: new Date().getTime(),
          system: true
        });
      });
  }

  const getParentUsers = () => {
    database()
      .ref('users')
      // .equalTo(User)
      .once('value')
      .then((snapshot) => {
        // console.log('User data: ', snapshot.val());
        let array = snapshot.val()
        console.log('JSON.parse(snapshot.val())', Object.values(array));
        setArryUserData(Object.values(array));
      });
  }

  return (
    <View style={styles.container}>
      <DropdownAlert ref={dropDownAlertRef} />
      <HeaderScreen title={'Add New People'} navigation={props.navigation} />
      <View style={styles.mainView}>
        <View style={styles.inputView}>
          <KeyboardAwareScrollView>
            <TextInput
              value={email}
              placeholder={'Email'}
              style={styles.textInput}
              autoCapitalize={'none'}
              onChangeText={value => setEmail(value)}
            />
          </KeyboardAwareScrollView>

        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => searchPerson()}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        <FlatList
          data={arryUserData}
          keyExtractor={(item: any) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PersonCard
              item={item}
              id={item.id}
              name={item.fullName}
              email={item.Email}
              gender={item.gender}
              age={item.age}
              showAlert={showAlert}
            />
          )}
        />
      </View>
      <View
        style={{
          paddingVertical: '4%',
        }}></View>
      {isLoading ? (
        userList.length > 0 ? (
          <FlatList
            data={userList}
            keyExtractor={(item: any) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <PersonCard
                id={item.id}
                name={item.fullName}
                email={item.email}
                gender={item.gender}
                age={item.age}
                showAlert={showAlert}
              />
            )}
          />
        ) : (
          <View
            style={{
              alignSelf: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24,
              }}>
              Nothing Found
            </Text>
          </View>
        )
      ) : (
        <Text
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}>
          Loading...
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  mainView: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: '4%',
  },
  inputView: {
    borderColor: colors.mainAppColor,
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: '2%',
  },
  textInput: {
    paddingLeft: '6%',
    fontSize: 18,
  },
  searchButton: {
    backgroundColor: colors.mainAppColor,
    borderRadius: 5,
    marginVertical: '2%',
    paddingVertical: '4%',
    justifyContent: 'center',
  },
  searchButtonText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'Raleway-SemiBold',
    fontSize: 20,
  },
  flatlist: {
    // paddingVertical: '8%',
  },
});

export default AddNewPeople;
