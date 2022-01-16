import React from 'react'
import { StyleSheet, View } from 'react-native';
import { colors } from '../utils/colors';

const Separator = (props: any) => {
    return (
        <View style={{
            height: 1,
            width: '100%',
            backgroundColor: colors.mainAppColor
        }} />
    );
};

const styles = StyleSheet.create({});

export default Separator;