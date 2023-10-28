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

  // click the button and join the room handle function
  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
    }
  };

  // click the button then join the room but not go to any http request. this is a amazing thing in socket.io. you can show this go to inspact -> network tab

  return (
    <div>
      <h3>Chat App</h3>
      <input
        type="text"
        placeholder="Jack..."
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="text"
        placeholder="Room id..."
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Join a Room</button>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
