import { NextApiRequest, NextApiResponse } from 'next';

// Store messages in memory 
let messages: Message[] = [];

// Defines the Message interface i.e. whats in it 
interface Message {
  text: string;
  timestamp: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle POST request to add a new message
    const { text, timestamp } = req.body;
    if (!text || !timestamp) {
      return res.status(400).json({ error: 'Invalid message format' });
    }
    const newMessage: Message = { text, timestamp };
    messages.push(newMessage);
    return res.status(201).json(newMessage);
  } else if (req.method === 'GET') {
    // Handle GET request to retrieve all messages
    return res.status(200).json(messages);
  } else {
    // Return a 404 error for other request methods
    return res.status(404).json({ error: 'Not found' });
  }
}
