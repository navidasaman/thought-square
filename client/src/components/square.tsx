'use client';
import React, { useState, useEffect } from 'react';

const Square = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{ text: string; timestamp: string }[]>(
    JSON.parse(localStorage.getItem('messages') || '[]')
  );

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

      // Save messages to localStorage with timestamps
      localStorage.setItem('messages', JSON.stringify([...messages, newMessage]));
    }
  };

  useEffect(() => {
    // Load messages from localStorage when the component mounts
    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(storedMessages);
  }, []);

  // To input message by pressing enter on keyboard
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddMessage();
    }
  };

  return (
    <div className="p-3 text-50-slate">
      <input
        className="mt-10 p-2 w-96 text-center rounded-l-full bg-slate-400 placeholder-white italic"
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
      <div className="bg-gray-950 mt-4 lg:ml-3 sm:ml-2 h-96 overflow-y-auto sm:w-80 lg:w-96 text-300-slate border border-slate-50 border-opacity-40 rounded-md overflow-x-hidden">
        {messages.slice().reverse().map((message, index) => (
          <div key={index} className="p-2 border-b border-gray-300 border-opacity-20">
            <span className="text-slate-400 block min-w-full text-xs mb-2">{message.timestamp}</span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Square;