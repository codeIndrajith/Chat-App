import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { IoMdSend } from 'react-icons/io';

// using socket.io-client and connection to server
const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

function Chat(props) {
  const [currentMessage, setCurrentMessage] = useState('');

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: props.room,
        author: props.username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
    }
  };
  return (
    <div>
      {/* chat header */}
      <div className="">
        <p>Live Chat</p>
      </div>
      {/* chat body */}
      <div className=""></div>
      {/* chat footer */}
      <div className="">
        <input
          type="text"
          placeholder="Hey..."
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <button onClick={sendMessage}>
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
