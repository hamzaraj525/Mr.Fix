import React, {useState, useCallback, useEffect} from 'react';
import {Text, View, ScrollView, Pressable, SafeAreaView} from 'react-native';
import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {GiftedChat} from 'react-native-gifted-chat';

function Chat({navigation, props}) {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const {userId, userName} = useSelector(reducers => reducers.cartReducer);

  useEffect(() => {
    const unsubscribe = database()
      .ref('/Chats')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          li.push({
            _id: child.val()._id,
            text: child.val().text,
            user: child.val().user,
          });
        });
        setMessages(li);
      });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback(msgArray => {
    const message = msgArray[0];
    const myMsg = {
      ...message,
      createdAt: new Date(),
    };
    setMessages(prevMessages => GiftedChat.append(prevMessages, myMsg));
    const newReference = database().ref('/Chats').push();
    newReference.set(myMsg);
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <Text
        style={{
          fontFamily: 'RobotoSlab-Bold',
          color: 'black',
          fontWeight: '500',
          alignSelf: 'center',
          fontSize: 21,
        }}>
        Chat with Fixer
      </Text>
      {!messages ? (
        <GiftedChat
          inverted={true}
          messages={messages}
          onSend={text => onSend(text)}
          user={{
            _id: userId,
            name: userName,
          }}
          placeholder="Type a message..."
        />
      ) : (
        <View
          style={{
            alignSelf: 'center',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'RobotoSlab-Bold',
              color: 'black',
              fontWeight: '500',
              fontSize: 21,
            }}>
            No new Messages
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
export default Chat;
