'use client';
import React, { useState } from 'react';

const Square = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // To add the messages
  const handleAddMessage = () => {
    setMessages([...messages, inputValue]);
    setInputValue('');
  };

  // To input message by pressing enter on keyboard
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddMessage();
    }
  };

  return (
    <div className="p-3 text-50-slate">
      <input
        className="sm:w-96 mt-10 p-2 w-80 text-center rounded-l-full bg-slate-400"
        placeholder="Enter your message here"
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
      <div className="mt-4 h-96 overflow-y-auto text-300-slate border border-slate-50 rounded-md">
        {messages.map((message, index) => (
          <div key={index} className="p-2 border-b border-gray-300">{message}</div>
        ))}
      </div>
    </div>
  );
};

export default Square;