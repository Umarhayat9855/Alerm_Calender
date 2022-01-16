import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {colors} from '../utils/colors';

export default function TaskBgColor(props: any) {
  const [color, setColor] = useState<any>(null);

  return (
    <View>
      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
          fontFamily: 'Raleway-Medium',
          marginLeft: '5%',
        }}>
        Background Color
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: '60%',
          justifyContent: 'space-evenly',
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            setColor(1);
            props.setBackgroundColor(colors.mainAppColor);
          }}
          style={{
            backgroundColor: colors.mainAppColor,
            height: 20,
            width: 20,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: colors.black,
          }}>
          {color === 1 ? (
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: colors.white,
                alignSelf: 'center',
              }}
              resizeMode={'contain'}
              source={require('../../assets/icons/check.png')}
            />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setColor(2);
            props.setBackgroundColor(colors.orange);
          }}
          style={{
            backgroundColor: colors.orange,
            height: 20,
            width: 20,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: colors.black,
          }}>
          {color === 2 ? (
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: colors.white,
                alignSelf: 'center',
              }}
              resizeMode={'contain'}
              source={require('../../assets/icons/check.png')}
            />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setColor(3);
            props.setBackgroundColor(colors.purple);
          }}
          style={{
            backgroundColor: colors.purple,
            height: 20,
            width: 20,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: colors.black,
          }}>
          {color === 3 ? (
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: colors.white,
                alignSelf: 'center',
              }}
              resizeMode={'contain'}
              source={require('../../assets/icons/check.png')}
            />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setColor(4);
            props.setBackgroundColor(colors.pink);
          }}
          style={{
            backgroundColor: colors.pink,
            height: 20,
            width: 20,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: colors.black,
          }}>
          {color === 4 ? (
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: colors.white,
                alignSelf: 'center',
              }}
              resizeMode={'contain'}
              source={require('../../assets/icons/check.png')}
            />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setColor(5);
            props.setBackgroundColor(colors.blue);
          }}
          style={{
            backgroundColor: colors.blue,
            height: 20,
            width: 20,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: colors.black,
          }}>
          {color === 5 ? (
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: colors.white,
                alignSelf: 'center',
              }}
              resizeMode={'contain'}
              source={require('../../assets/icons/check.png')}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: colors.mainAppColor,
          marginTop: 15,
        }}
      />
    </View>
  );
}
