import React from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
// import CalendarStrip from 'react-native-calendar-strip';
import {Agenda} from 'react-native-calendars';
// import moment from 'moment';

import {colors} from '../../utils/colors';
import HeaderScreen from '../../components/header';
import moment from 'moment';
import {GLOBAL} from '../../utils/global';

interface Props {
  navigation: any;
}

interface MyState {
  items: any;
  actions: any;
}

class TimelineScreen extends React.Component<Props, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: {
        '2021-10-04': [
          {
            id: 537,
            title: 'Divas by Jahida Wehbe',
            summary: 'The Theatre, Mall of the Emirates',
            image: 'Divas by Jahida Wehbe.jpg',
            start: '2020-02-29 09:00:00',
            end: '2020-02-29 23:59:00',
            location: null,
          },
          {
            id: 540,
            title: 'Cadence Live in Concert',
            summary: 'The Fridge, Alserkal Avenue',
            image: null,
            start: '2020-02-29 17:30:00',
            end: '2020-02-29 23:59:00',
            location: null,
          },
        ],
        '2021-10-05': [
          {
            id: 540,
            title: 'Cadence Live in Concert',
            summary: 'The Fridge, Alserkal Avenue',
            image: null,
            start: '2020-02-29 17:30:00',
            end: '2020-02-29 23:59:00',
            location: null,
          },
        ],
      },
      actions: [
        {
          text: 'Task',
          icon: require('../../../assets/icons/tasklist.png'),
          name: 'bt_task',
          position: 2,
          color: colors.mainAppColor,
        },
        {
          text: 'Reminder',
          icon: require('../../../assets/icons/reminder.png'),
          name: 'bt_reminder',
          position: 1,
          color: colors.mainAppColor,
        },
        {
          text: 'Event',
          icon: require('../../../assets/icons/eventIcon.png'),
          name: 'bt_event',
          position: 3,
          color: colors.mainAppColor,
        },
      ],
    };
  }

  // loadItems = (day: any) => {
  //   setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = this.timeToString(time);
  //       if (!this.state.items[strTime]) {
  //         this.state.items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           this.state.items[strTime].push({
  //             name: 'Item for ' + strTime + ' #' + j,
  //             height: Math.max(50, Math.floor(Math.random() * 150)),
  //           });
  //         }
  //       }
  //     }

  //     const newItems: any = {};

  //     Object.keys(this.state.items).forEach(key => {
  //       newItems[key] = this.state.items[key];
  //     });
  //     this.setState({
  //       items: newItems,
  //     });
  //   }, 1000);
  // };

  renderItem = (item: any) => {
    const cover_start_time = moment(item.start).format('LT');
    const cover_end_time = moment(item.end).format('LT');

    return (
      <TouchableOpacity
        // onPress={() => this.eventClicked(item)}
        style={{borderRadius: 5}}>
        <View style={{borderRadius: 5}}>
          <View
            style={[
              {
                flex: 1,
                borderRadius: 5,
                padding: 10,
                marginRight: 10,
                marginTop: 17,
              },
              {height: item.height},
            ]}>
            <ImageBackground
              style={{width: '100%', height: 150, borderRadius: 20}}
              imageStyle={{borderRadius: 10}}
              source={
                item.image
                  ? {uri: GLOBAL.IMAGE_PATH + item.image}
                  : require('../../../assets/images/exercise.jpg')
              }>
              <View
                style={{
                  opacity: 0.9,
                  backgroundColor: colors.mainAppColor,
                  width: '100%',
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  position: 'absolute', //Here is the trick
                  bottom: 0,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 13, color: 'white', marginLeft: 10}}>
                    {cover_start_time}
                  </Text>

                  <Text style={{fontSize: 13, color: 'white', marginLeft: 10}}>
                    {cover_end_time}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 2,
                    marginLeft: 10,
                    color: 'white',
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: 13,
                    color: 'white',
                    marginLeft: 10,
                  }}>
                  {item.summary}
                </Text>
                {item.location != null ? (
                  <Text
                    style={{
                      marginTop: 2,
                      fontSize: 13,
                      color: 'white',
                      marginLeft: 10,
                      marginBottom: 10,
                    }}>
                    at {item.location}
                  </Text>
                ) : null}
              </View>
            </ImageBackground>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  timeToString = (time: any) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  // renderItem = (item: any) => {
  //   return (
  //     <TouchableOpacity
  //       style={[styles.item, {height: item.height}]}
  //       onPress={() => Alert.alert(item.name)}>
  //       <Text>{item.name}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  rowHasChanged = (r1: any, r2: any) => {
    return r1.name !== r2.name;
  };

  render() {
    const {navigation} = this.props;
    const {actions, items} = this.state;
    return (
      <View style={styles.container}>
        <HeaderScreen
          bellIcon={true}
          title={'My Timeline'}
          navigation={navigation}
        />

        {/* <CalendarStrip
        scrollable
        style={{
          height: 80,
          paddingTop: 0,
          paddingBottom: 10,
          borderBottomEndRadius: 50,
          borderBottomStartRadius: 50,
        }}
        calendarColor={colors.mainAppColor}
        calendarHeaderStyle={{color: 'white'}}
        dateNumberStyle={{color: 'white'}}
        dateNameStyle={{color: 'white'}}
        iconContainer={{flex: 0.1}}
      /> */}

        <Agenda
          items={items}
          // loadItemsForMonth={this.loadItems}
          selected={new Date()}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          showClosingKnob={true}
          theme={{
            calendarBackground: '#A4D0B2',
            agendaKnobColor: '#ffffff',
            agendaDayTextColor: '#A4D0B2',
            agendaDayNumColor: '#A4D0B2',
            agendaTodayColor: '#00BBF2',
            dotColor: '#ffffff',
            selectedDotColor: '#A4D0B2',
            selectedDayBackgroundColor: '#ffffff',
          }}
        />

        <FloatingAction
          actions={actions}
          onPressItem={name => {
            if (name == 'bt_reminder') navigation.navigate('AddReminder');
            else if (name == 'bt_event') navigation.navigate('AddEvents');
            else if (name == 'bt_task') navigation.navigate('AddTask');
            else return 0;
          }}
          color={colors.mainAppColor}
          distanceToEdge={15}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default TimelineScreen;
