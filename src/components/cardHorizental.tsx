import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Image} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {colors} from '../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CardHorizental = (props: any) => {
  const {time, relation, message, chatIcon, item} = props;

  return (
    <TouchableOpacity
      style={styles.screenHeader}
      // onPress={() =>
      //   props?.navigation?.navigate('PeopleProfile', {item: item})
      // }
      onPress={props.CloseFun}
      >
      <View style={styles.leftHeader}>
        <Image
          size={12}
          borderRadius={40}
          source={{
            uri: 'https://www.woodcockpsychology.com.au/wp-content/uploads/2015/03/child.jpg',
          }}
          alt="react-native"
        />
      </View>
      <View style={styles.titleHeader}>
        <Text style={styles.titleText}>{item?.username}</Text>
        {message && <Text style={styles.disText}>{message}</Text>}
        {relation && <Text style={styles.disText}>Relation: {relation}</Text>}
      </View>
      <View style={styles.rightHeader}>
        {time && <Text style={styles.disText}>{time}</Text>}
        {chatIcon && (
          <Image
            source={require('../../assets/icons/chat.png')}
            style={{height: 27, width: 30, marginBottom: -18}}
            alt={'chatIcon'}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  screenHeader: {
    paddingVertical: '5%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  leftHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  titleHeader: {
    flex: 3,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  titleText: {
    color: colors.black,
    fontFamily: 'Raleway-Medium',
    fontSize: 20,
  },
  disText: {
    color: colors.black,
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
    // marginBottom: 18,
  },
});

export default CardHorizental;
