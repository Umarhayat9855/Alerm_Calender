import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {colors} from '../utils/colors';

const TaskDetail = (props: any) => {
  const {title, imageStyle, description, image, color} = props;
  return (
    <View
      style={{
        width: '90%',
        marginLeft: '5%',
        backgroundColor: color,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: color,
        marginTop: '5%',
      }}>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {console.log('imageimageimage',image)}
        <Image 
           source={{uri:'https://firebasestorage.googleapis.com/v0/b/caretech-97787.appspot.com/o/umar?alt=media&token=86e08afb-49c3-428a-92dc-8117ee7d5b37'}} 
          // source={require('../../assets/icons/task_white.png')}
         // source={{uri:image}}
        style={{width: 60,height: 60,borderRadius:10 }} />
        <View
          style={{
            marginLeft: 10,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'Raleway-Medium',
              color: colors.white,
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Raleway-Medium',
              color: colors.white,
            }}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TaskDetail;
