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

const SingalSelectDropdownModal = (props: any) => {
  const [showModal, setShowModal] = useState<any>(false);
  const [allValues, setAllValues] = useState<any>([]);
  const [name, setName] = useState<any>('');
  const [id, setID] = useState<any>(0);
  const [isLoading, setLoading] = useState<any>(false);

  useEffect(() => {
    getItemOnSale();
    setName(props?.checkedValue);
    setShowModal(props?.showModal);
  }, []);

  const getItemOnSale = () => {
    setAllValues([
      {id: 0, name: 'Child'},
      {id: 1, name: 'Parent'},
    ]);
    setLoading(true);
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'red',
        justifyContent: 'center',
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={}>
          {allValues && allValues.length > 0
            ? allValues.map((item: any, index: any) => {
                return (
                  <Pressable
                    style={{
                      backgroundColor: 'white',
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
