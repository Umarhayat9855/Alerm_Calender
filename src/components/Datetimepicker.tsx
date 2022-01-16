import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
const App = (props: any) => {
  const [date, setDate] = useState<any>(new Date(1598051730000));
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState<any>(false);

  const onChange = (event: any, selectedDate: any) => {
    console.log('onChange');
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const showMode = (currentMode: any) => {
    console.log('showMode');
    setShow(true);
    setMode(currentMode);
    if (mode == 'date') showTimepicker();
  };
  const showDatepicker = () => {
    console.log('showDatepicker');
    showMode('date');
  };
  const showTimepicker = () => {
    console.log('showTimepicker');
    showMode('time');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateTimeBttn} onPress={showDatepicker}>
        <Text>{'Get Date'}</Text>
      </TouchableOpacity>
      <View style={styles.separator}></View>
      <Text></Text>
      <View style={styles.separator}></View>
      <TouchableOpacity style={styles.dateTimeBttn} onPress={showTimepicker}>
        <Text>{'Get Time'}</Text>
      </TouchableOpacity>
      <View style={styles.separator}></View>
      <Text></Text>​
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTimeBttn: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
  },
  separator: {
    padding: '2%',
  },
});
export default App;
