import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  FlatList,
} from 'react-native';
import {Image} from 'native-base';
import {colors} from '../utils/colors';
import {GLOBAL} from '../utils/global';
import axios from 'axios';
import SingalSelectDropdownModal from './SingalSelectDropdownModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';


const PersonCard = (props) => {
  var array=props.item
  // var Id=array.map(ls=>ls.Email)
  console.log('Person Card',array)
  // const [modalOpen, setModalOpen] = useState<any>(false);
  const [userInfo, setUserInfo] = useState(null);
  const [onSuccess, setOnSuccess] = useState(false);
  // const [Email,setEmail] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  const CreateUser = () => {
    console.log('EmailEmailEmail','ali@gmail.com')
    firestore()
    .collection('ali@gmail.com')
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

  const getUserInfo = async () => {
    const userInfo: any = await AsyncStorage.getItem('@user');
    const temp = JSON.parse(userInfo);
    setUserInfo(temp);
  };

  // const onCloseModalUserTypes = () => {
  //   setModalOpen(false);
  // };

  // const onClickValuesUserTypes = (id: any, name: any) => {
  //   setUserTypesAssociation(id);
  // };

  const setUserTypesAssociation = () => {
    axios
      .post(GLOBAL.DECIDING_RELATION, {
        parentID: props.id,
        childID: userInfo.id,
      })
      .then(function (response: any) {
        console.log(response?.data);

        if (response?.data?.status == 200) {
          props.showAlert('success', 'Success', response?.data?.message);
          setOnSuccess(true);
          return;
        }
        props.showAlert('error', 'Error', response?.data?.message);
        setOnSuccess(false);
        console.log(response.data);
      })
      .catch(function (error) {
        props.showAlert('error', 'Error', error?.message);
        setOnSuccess(false);
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          size={24}
          borderRadius={50}
          source={{
            uri: 'https://www.woodcockpsychology.com.au/wp-content/uploads/2015/03/child.jpg',
          }}
          style={styles.image}
          alt="react-native"
        />
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.text}>{props.email}</Text>
        <Text style={styles.text}>Gender: {props.gender}</Text>
        <Text style={styles.text}>Age: {props.age}</Text>
      </View>
      <TouchableOpacity
        style={styles.addPersonButton}
        onPress={() => {CreateUser();}}>
        <Text style={styles.addPersonButtonText}>
          {onSuccess ? 'Person Added' : 'Add Person'}
        </Text>
      </TouchableOpacity>

      {/* {modalOpen && (
        <SingalSelectDropdownModal
          showModal={modalOpen}
          filter={3}
          // checkedValue={userTypes.name}
          setModalClose={onCloseModalUserTypes}
          setCheckboxClicked={onClickValuesUserTypes}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: '4%',
    marginHorizontal: '9%',
  },
  card: {
    borderRadius: 5,
    borderWidth: 3,
    borderColor: colors.mainAppColor,
    paddingVertical: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: '5%',
  },
  text: {
    color: colors.black,
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
    paddingVertical: '1%',
  },
  addPersonButton: {
    backgroundColor: colors.mainAppColor,
    borderRadius: 5,
    marginVertical: '3%',
    paddingVertical: '4%',
    justifyContent: 'center',
  },
  addPersonButtonText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'Raleway-SemiBold',
    fontSize: 20,
  },
});

export default PersonCard;
