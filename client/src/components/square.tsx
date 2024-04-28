'use client';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
require('dotenv');
const messagesEndpointAPI = process.env.API_MESSAGES_ENDPOINT || '/api/messages';

const socket = io('https://thought-square.vercel.app');

const Square: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; timestamp: string }[]>([]);

  const fetchMessages = async () => {
    const response = await fetch(messagesEndpointAPI);
    if (response.ok) {
      const data = await response.json();
      setMessages(data);
    }
  };

  useEffect(() => {
    fetchMessages();
  },);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddMessage = async () => {
    if (inputValue.trim() !== '') {
      const currentDateTime = new Date().toLocaleString();
      const newMessage = { text: inputValue, timestamp: currentDateTime };
      const response = await fetch(messagesEndpointAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });
      if (response.ok) {
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputValue('');
        socket.emit('message', 'Hello, Socket.IO!');
      }
    }
  };

  useEffect(() => {
    // Listen for 'receive-message' event from the server
    socket.on('receive-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });


  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddMessage();
    }
  };
  
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('message', (data: any) => {
      setMessages(data);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
    
    socket.on('connect_timeout', () => {
      console.error('Socket connection timeout');
    });
    
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <input
          className="mt-10 p-2 w-80 text-center rounded-l-full bg-slate-400 placeholder-white italic"
          placeholder="What's on your mind?"
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button className="w-fit p-2 rounded-r-full bg-slate-500" onClick={handleAddMessage}>
          ✓
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-950 mt-4 w-96 lg:w-96 h-96 overflow-y-auto text-300-slate border border-slate-50 rounded-md overflow-x-hidden">
          {messages.slice().reverse().map((message, index) => (
            <div key={index} className="p-2 border-b border-gray-300">
              <span className="text-slate-400 block min-w-full text-xs mb-2">{message.timestamp}</span>
              <span>{message.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Square;