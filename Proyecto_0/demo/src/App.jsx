import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function App() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        const newSocket = io(`http://localhost:3001`);
        setSocket(newSocket);
        newSocket.on('messageFromServer', (msg) => {
            setReceivedMessages(prev => [...prev, msg]);
        });
        return () => newSocket.close();
    }, [setSocket]);

    const sendMessage = () => {
        socket.emit('messageFromClient', message);
        setMessage('');
    };

    return (
        <div className="App">
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send a message..."
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                {receivedMessages.map((msg, index) => (
                    <p key={index}>{msg.data}</p>
                ))}
            </div>
        </div>
    );
}

export default App;
