import React, { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';

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

      await props.socket.emit('send_message', messageData);
    }
  };

  useEffect(() => {
    props.socket.on('receive_message', (data) => {
      console.log(data);
    });
  }, [props.socket]);
  return (
    <div className="max-w-md mx-auto mt-16 p-2 bg-white shadow-md overflow-hidden border border-blue-900">
      {/* Chat header */}
      <div className="bg-blue-500 text-white py-3 px-4 rounded-2xl text-center">
        <p className="text-2xl font-semibold">Live Chat</p>
      </div>

      {/* Chat body */}
      <div className="p-[160px] mt-2 border border-blue-700 rounded-2xl"></div>

      {/* Chat footer */}
      <div className="bg-gray-200 p-2 flex items-center">
        <input
          type="text"
          className="w-full p-2 rounded-full outline-none"
          placeholder="Hey..."
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-full ml-2"
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
