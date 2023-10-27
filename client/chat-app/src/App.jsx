import React from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

function App() {
  return (
    <>
      <h1>Real time chat application</h1>
    </>
  );
}

export default App;
