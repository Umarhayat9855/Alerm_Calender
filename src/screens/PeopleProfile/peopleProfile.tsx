import { Image } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import HeaderScreen from '../../components/header';
import { colors } from '../../utils/colors';

const PropleProfile = (props: any) => {
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    setUserData(props.route.params.item);
  }, []);
  const actions = [
    {
      icon: require('../../../assets/icons/tasklist.png'),
      name: 'bt_tasklist',
      position: 2,
      color: colors.mainAppColor,
    },
    {
      icon: require('../../../assets/icons/reminder.png'),
      name: 'bt_reminder',
      position: 1,
      color: colors.mainAppColor,
    },
  ];
  return (
    <View style={styles.container}>
      <HeaderScreen title={'People Profile'} navigation={props.navigation} />
      <View style={styles.peopleDetail}>
        <View style={styles.imageView}>
          <Image
            size={24}
            borderRadius={50}
            source={{
              uri: 'https://www.woodcockpsychology.com.au/wp-content/uploads/2015/03/child.jpg',
            }}
            alt="react-native"
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.nameText}>{userData?.username}</Text>
          <Text
            style={styles.emailText}
            numberOfLines={1}
            allowFontScaling={true}>
            {userData?.email}
          </Text>
          <Text style={styles.emailText}>{userData?.gender}</Text>
          <Text style={styles.emailText}>{userData?.age}</Text>
        </View>
      </View>
      <View style={styles.googleMapsContainer}>
        <Text style={styles.googleMapsText}>
          Google Maps showing his current location
        </Text>
      </View>
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          if (name == 'bt_reminder')
            props.navigation.navigate('ChangePassword');
          else return 0;
        }}
        color={colors.mainAppColor}
        distanceToEdge={15}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  peopleDetail: {
    height: '20%',
    flexDirection: 'row',
    marginHorizontal: '3%',
    paddingVertical: '2%',
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    flex: 2,
    alignSelf: 'center',
    paddingLeft: '8%',
  },
  nameText: {
    color: colors.black,
    fontFamily: 'Raleway-Bold',
    fontSize: 18,
    paddingVertical: '1%',
  },
  emailText: {
    color: colors.black,
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
    paddingVertical: '1%',
  },
  googleMapsContainer: {
    height: '70%',
    // backgroundColor: 'red',
    borderColor: colors.mainAppColor,
    borderWidth: 3,
    borderRadius: 5,
    marginHorizontal: '4%',
    paddingVertical: '2%',
    paddingHorizontal: '20%',
    justifyContent: 'center',
  },
  googleMapsText: {
    color: colors.black,
    fontFamily: 'Raleway-SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default PropleProfile;
