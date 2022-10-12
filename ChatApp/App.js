/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import io from 'socket.io-client';

const App = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMsgArr, setChatMsgArr] = useState([]);
  const socket = io('http://192.168.0.101:3000');

  useEffect(() => {
    socket.on('message', function (msg) {
      setChatMsgArr([...chatMsgArr, msg]);
    });
  }, []);

  const onSubmit = () => {
    socket.emit('message', chatMessage);
    setChatMessage('');
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={chatMessage}
        onSubmitEditing={() => onSubmit()}
        autoCorrect={false}
        onChangeText={text => setChatMessage(text)}
        style={styles.textInputStyle}
      />
      {chatMsgArr?.map((userChatMsg, index) => (
        <Text key={index}>{userChatMsg}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 2,
  },
});
export default App;
