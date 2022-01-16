import React, {useEffect, useState} from 'react'; // Done
import {Button, Text, Icon} from 'native-base';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GLOBAL} from '../utils/global';
import {Title} from 'react-native-paper';
import {colors} from '../utils/colors';
import axios from 'axios';

const SingalSelectDropdownModal = (props: any) => {
  const [showModal, setShowModal] = useState<any>(false);
  const [allValues, setAllValues] = useState<any>([]);
  const [name, setName] = useState<any>('');
  const [id, setID] = useState<any>(0);
  const [isLoading, setLoading] = useState<any>(false);

  useEffect(() => {
    if (props?.filter == 1) getUserTypes();
    if (props?.filter == 2) getGender();
    if (props?.filter == 3) getUserTypes2();
    else null;
    setName(props?.checkedValue);
    setShowModal(props?.showModal);
  }, []);

  const getUserTypes = () => {
    setAllValues([
      {id: 0, name: 'Child'},
      {id: 1, name: 'Parent'},
    ]);
    setLoading(true);
  };

  const getGender = () => {
    setAllValues([
      {id: 0, name: 'Male'},
      {id: 1, name: 'Female'},
    ]);
    setLoading(true);
  };

  const getUserTypes2 = () => {
    axios
      .get(GLOBAL.USER_TYPES)
      .then(function (response: any) {
        console.log(response?.data?.userTypes);
        if (response?.data?.status == 200) {
          setAllValues(response?.data?.userTypes);
          return;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <Pressable
          onPress={() => {
            setShowModal(false);
            props?.setModalClose();
          }}
          style={{
            height: '100%',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              borderRadius: 10,

              marginHorizontal: '10%',
            }}>
            {allValues && allValues.length > 0
              ? allValues.map((item: any, index: any) => {
                  return (
                    <Pressable
                      style={{
                        backgroundColor: '#f2f6f9',
                      }}
                      onPress={() => {
                        props.setCheckboxClicked(item.id, item.name);
                        setShowModal(false);
                        props?.setModalClose();
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderBottomColor: 'grey',
                          borderBottomWidth: 0.5,
                          paddingTop: 20,
                          paddingBottom: 20,
                          paddingStart: 20,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            numberOfLines={2}
                            style={{
                              color: '#4b4d4f',
                              fontFamily: GLOBAL.FONT_FAMILY,
                              fontSize: 16,
                            }}>
                            {item.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: 30,
                          }}>
                          {name === item.name ? (
                            <Image
                              style={{
                                height: 30,
                                width: 30,
                              }}
                              source={require('../../assets/icons/check.png')}
                            />
                          ) : null}
                        </View>
                      </View>
                    </Pressable>
                  );
                })
              : null}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default SingalSelectDropdownModal;

const styles = StyleSheet.create({
  navBar2: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.mainAppColor,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 200,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
