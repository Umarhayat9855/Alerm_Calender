import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {colors} from '../utils/colors';

const HeaderScreen = (props: any) => {
  const {bellIcon, addIcon, title, menuIcon, menuIconPress} = props;
  return (
    // <View style={styles.container}>
    <View style={styles.screenHeader}>
      <StatusBar
        backgroundColor={colors.mainAppColor}
        barStyle={'light-content'}
      />
      <View style={styles.leftHeader}>
        {
          menuIcon ? (
            <TouchableOpacity onPress={menuIconPress}>
              <Image
                source={require('../../assets/icons/menuIcon.png')}
                style={{
                  height: 30,
                  width: 30,
                }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ) : (
            // <TouchableOpacity>
            <AntDesign
              name={'arrowleft'}
              size={30}
              color={colors.white}
              onPress={() => props.navigation.goBack()}
            />
          )
          // </TouchableOpacity>
        }
      </View>
      <View style={styles.titleHeader}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.leftHeader}>
        {bellIcon && (
          <SimpleLineIcons name={'bell'} size={30} color={colors.white} />
        )}
        {addIcon && (
          <Fontisto
            name={'plus-a'}
            size={30}
            color={colors.white}
            onPress={() => props.navigation.navigate('AddNewPeople')}
          />
        )}
      </View>
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBGColor,
    flex: 1,
  },
  screenHeader: {
    // height: '8%',
    paddingVertical: '4%',
    backgroundColor: colors.mainAppColor,
    flexDirection: 'row',
  },
  leftHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleHeader: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: colors.white,
    fontSize: 20,
  },
});

export default HeaderScreen;
