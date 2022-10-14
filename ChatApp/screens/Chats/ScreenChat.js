/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import io from 'socket.io-client';

const ScreenChat = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMsgArr, setChatMsgArr] = useState([]);
  const socket = io('http://192.168.0.101:3000');
  console.log(chatMessage, chatMsgArr);
  useEffect(() => {
    socket.on('message', function (msg) {
      console.log(msg);
    });
  }, []);
  useEffect(() => {
    setChatMsgArr([
      {
        _id: 1,
        text: '',
        createdAt: '',
        user: {},
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    const chatText = messages?.find(item => item._id);
    socket.emit('message', chatText?.text);
    setChatMsgArr(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  return (
    <GiftedChat
      messages={chatMsgArr}
      onInputTextChanged={text => setChatMessage(text)}
      onSend={msg => onSend(msg)}
      renderBubble={renderBubble}
      alwaysShowSend
      scrollToBottom
    />
  );
};

export default ScreenChat;
