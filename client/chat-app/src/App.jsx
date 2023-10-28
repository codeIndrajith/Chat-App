import React, { useState } from 'react';
import { io } from 'socket.io-client';
import Chat from './Chat';

// using socket.io-client and connection to server
const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(true);

  // click the button and join the room handle function
  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(false);
    }
  };

  // click the button then join the room but not go to any http request. this is a amazing thing in socket.io. you can show this go to inspact -> network tab

  return (
    <div className="App">
      {showChat ? (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 text-center">Chat App</h3>
          <input
            type="text"
            className="w-full p-2 rounded-md outline-none mb-2"
            placeholder="Jack..."
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 rounded-md outline-none mb-4"
            placeholder="Room id..."
            onChange={(event) => setRoom(event.target.value)}
          />
          <button
            onClick={joinRoom}
            className="bg-blue-500 text-white p-2 rounded-md w-full"
          >
            Join a Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
