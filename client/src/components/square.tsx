'use client';
import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
import { apiUrl } from './config';

dotenv.config();

const Square: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const crud = process.env.CRUD_API_FETCH || "http://localhost:5000/api/messages";

  const fetchMessages = async () => {
    const response = await fetch(crud);
    const data = await response.json();
    setMessages(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddMessage = async (newMessage: string, date: string) => {
    try {
      const response = await fetch(crud, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage, timestamp: date }), // Include timestamp in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to send message to the server');
      }

      const data = await response.json();
      console.log('Message added:', data);

      // Fetch updated messages after adding a new message
      fetchMessages();
    } catch (error) {
      console.error(error);      
      window.location.reload();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddMessage(inputValue, new Date().toLocaleString());
    }
  };

  useEffect(() => {
    fetchMessages();
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
        <button
          className="w-fit p-2 rounded-r-full bg-slate-500"
          // onClick={handleAddMessage}
          onClick={() => handleAddMessage(inputValue, new Date().toLocaleString())}

        >
          ✓
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-950 mt-4 w-96 lg:w-96 h-96 overflow-y-auto text-300-slate border border-slate-50 rounded-md overflow-x-hidden">
          {messages.slice().reverse().map((messages, index) => (
            <div key={index} className="p-2 border-b border-gray-300">
              <span className="text-slate-400 block min-w-full text-xs mb-2">{messages.timestamp}</span>
              <span>{messages.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Square;