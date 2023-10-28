import React, { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
// import ScrollToBottom from 'react-scroll-to-bottom';

function Chat(props) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
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
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    props.socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [props.socket]);

  return (
    <div className="max-w-md mx-auto mt-16 p-4 shadow-md overflow-hidden border bg-gray-300">
      {/* Chat header */}
      <div className="bg-blue-500 text-white py-3 px-4 rounded-2xl text-center">
        <p className="text-2xl font-semibold">ChatsApp</p>
      </div>

      {/* Chat body */}

      <div className="p-4 space-y-4 h-80 overflow-y-auto mt-3">
        {/* <ScrollToBottom className="w-full h-full overflow-y-scroll , overflow-x-hidden"> */}
        {messageList.map((messageContent, index) => (
          <div
            key={index}
            className={`${
              messageContent.author === props.username
                ? 'text-right'
                : 'text-left'
            }`}
          >
            <div
              className={`${
                messageContent.author === props.username
                  ? 'bg-green-200 text-green-800'
                  : 'bg-gray-200 text-gray-800'
              } py-2 px-3 rounded-lg inline-block max-w-[70%] whitespace-pre-wrap`}
            >
              <p>{messageContent.message}</p>
            </div>
            <div className="text-xs text-black mt-1">
              <p className="inline-block">
                {messageContent.time} - {messageContent.author}
              </p>
            </div>
          </div>
        ))}
        {/* </ScrollToBottom> */}
      </div>

      {/* Chat footer */}
      <div className="p-2 flex items-center">
        <input
          type="text"
          className="w-full p-2 rounded-full outline-none"
          value={currentMessage}
          placeholder="Message"
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
