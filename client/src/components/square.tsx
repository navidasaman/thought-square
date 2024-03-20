'use client';
import React, { useState, useEffect } from 'react';

const Square: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; timestamp: string }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // To add the messages and date
  const handleAddMessage = () => {
    if (inputValue.trim() !== '') {
      const currentDateTime = new Date().toLocaleString();
      const newMessage = { text: inputValue, timestamp: currentDateTime };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // Save messages to localStorage (only in the client-side)
      if (typeof window !== 'undefined') {
        localStorage.setItem('messages', JSON.stringify([...messages, newMessage]));
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
      setMessages(storedMessages);
    }
  }, []);

  // To input message by pressing enter on keyboard
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddMessage();
    }
  };

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
          onClick={handleAddMessage}
        >
          ✓
        </button>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className="bg-gray-950 mt-4 sm:w-80 lg:w-96 h-96 overflow-y-auto text-300-slate border border-slate-50 rounded-md overflow-x-hidden ">
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