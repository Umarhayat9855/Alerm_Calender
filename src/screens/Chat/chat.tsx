import React, { useState,useEffect ,useCallback} from "react";
import {StyleSheet, View, FlatList,Modal,Text,TouchableOpacity,Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {colors} from '../../utils/colors';
import HeaderScreen from '../../components/header';
import CardHorizental from '../../components/cardHorizental';
import ChatBox from './ChatBox';
import { GiftedChat } from 'react-native-gifted-chat';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
// import 
const ChatStack = createMaterialTopTabNavigator();
import auth from '@react-native-firebase/auth';
const MyPeople = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
  const ChatpeopleChat = () => {
    console.log('modalVisible')
    setModalVisible(!modalVisible);
  }
  return (
    <View>
    <FlatList
      data={[
        {id: 1, relation: 'Uncle', chatIcon: true},
        {id: 2, relation: 'Uncle', chatIcon: true},
        {id: 3, relation: 'Uncle', chatIcon: true},
      ]}
      style={{
        backgroundColor: colors.white,
      }}
      keyExtractor={(item: any) => item.id}
      renderItem={({item}) => (
        <CardHorizental
          relation={item.relation}
          name={'John Micheal'}
          chatIcon={item.chatIcon}
        />
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            padding: '0.2%',
            backgroundColor: colors.mainAppColor,
          }}></View>
      )}
      ListFooterComponent={() => (
        <View
          style={{
            padding: '0.2%',
            backgroundColor: colors.mainAppColor,
          }}></View>
      )}
    />
    <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          {/* <TouchableOpacity onPress={ChatpeopleChat}>Close</TouchableOpacity>
          <View style={{width:100,height:100}}>
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
          />
          </View> */}
          <ChatBox/>
      </View>
      </Modal>
      </View>
  );
};

const ChatPeople = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [threads, setThreads] = useState([]);
  const [SendData,setSendData] = useState([]);
  const [ArraySend,setArraySend] = useState([]);
  const [Email,setEmail] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
  const ChatpeopleChat = () => {
    console.log('modalVisible')
    setModalVisible(!modalVisible);
  }
  useEffect(() => {
    const user = auth().currentUser;

if (user) {
  console.log('user._user.email',user._user.email)
  setEmail(user._user.email)
} else {
  console.log('user',user)
}
    console.log('Email before the firebase fatching',Email)
    const unsubscribe = firestore()
      .collection(user._user.email)
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',

            latestMessage: {
              text: ''
            },
            ...documentSnapshot.data()
          };
        });

        setThreads(threads);

        // if (loading) {
        //   setLoading(false);
        // }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);
  const CreateUser = () => {
    console.log('EmailEmailEmail',Email)
    firestore()
    .collection(Email)
    .add({
      name: 'Hayat',
      latestMessage: {
        text: `Added`,
        createdAt: new Date().getTime()
      }
    })
    .then(docRef => {
      docRef.collection('MESSAGES').add({
        text: ``,
        createdAt: new Date().getTime(),
        system: true
      });
    });
  }
  const NavigatChat = (id) => {
    console.log('NavigatChat',id)
    setArraySend(id)
    setModalVisible(!modalVisible);
  }
  return (
    <View>
    {/* <FlatList
      style={{
        backgroundColor: colors.white,
      }}
      data={[
        {id: 1, time: '11:00', message: 'A new sample message....'},
        {id: 2, time: '12:00', message: 'A new business message....'},
        {id: 3, time: '01:00', message: 'A new event message....'},
      ]}
      keyExtractor={(item: any) => item.id}
      renderItem={({item}) => (
        <CardHorizental
          CloseFun={ChatpeopleChat}
          time={item.time}
          name={'John Micheal'}
          message={item.message}
        />
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            padding: '0.2%',
            backgroundColor: colors.mainAppColor,
          }}></View>
      )}
      ListFooterComponent={() => (
        <View
          style={{
            padding: '0.2%',
            backgroundColor: colors.mainAppColor,
          }}></View>
      )}
    /> */}
    <TouchableOpacity onPress={CreateUser}>
      <Text>CreateUser</Text>
    </TouchableOpacity>
    <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity style={{flexDirection:'row',marginTop:10}}
            // onPress={() => navigation.navigate('Room', { thread: item })}
            onPress={()=>NavigatChat(item)}
          >
        {/* <CardHorizental
          CloseFun={ChatpeopleChat}
          time={item.time}
          name={item.name}
          message={item.message}
        /> */}
        <Image source={{
            uri: 'https://www.woodcockpsychology.com.au/wp-content/uploads/2015/03/child.jpg',
          }}
          style={{width:70,height:70,borderRadius:60,marginLeft:20}}
        />
        <View>
          <Text style={styles.Heading}>{item.name}</Text>
          <Text style={styles.SubHeading}>{item.latestMessage.text}</Text>
        </View>
            {/* <List.Item
              title={item.name}
              description={item.latestMessage.text}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
              left={props => <List.Icon {...props} icon={{ source: "add-a-photo", direction: 'rtl' }} />}
            /> */}
          </TouchableOpacity>
        )}
      />
    <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
          {/* <ChatBox 
            // CloseFun={ChatpeopleChat}
          /> */}
          {/* <TouchableOpacity onPress={ChatpeopleChat}>
            <Text>sjdcsdisdi</Text>
          </TouchableOpacity> */}
          {/* <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      /> */}
      <ChatBox Array={ArraySend}/>
      </Modal>
      </View>
  );
};

const Chat = (props: any) => {
  return (
    <View style={styles.container}>
      <HeaderScreen title={'Chat'} navigation={props.navigation} />
      <ChatStack.Navigator
        initialRouteName={'ChatBox'}
        tabBarOptions={{
          indicatorStyle: {backgroundColor: colors.mainAppColor},
          activeTintColor: colors.black,
          inactiveTintColor: colors.black,
          labelStyle: {
            fontSize: 15,
            fontFamily: 'Raleway-Medium',
            textTransform: 'none',
          },
          style: {
            paddingTop: 5,
          },
        }}>
        <ChatStack.Screen
          name="ChatBox"
          component={ChatPeople}
          options={{tabBarLabel: 'Chat Box'}}
        />
        <ChatStack.Screen
          name="MyPeople"
          component={MyPeople}
          options={{tabBarLabel: 'My People'}}
        />
      </ChatStack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  },
  Heading:{
    fontSize: 20,
    fontFamily: 'Raleway-Medium',
    marginTop:10,marginLeft:10,

  },
  SubHeading:{
    fontSize: 17,
    fontFamily: 'Raleway-Medium',
    marginTop:5,marginLeft:10,
  },
});

export default Chat;
