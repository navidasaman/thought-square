import * as express from 'express';
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
require('dotenv');
const { Server } = require('socket.io');

const messagesEndpointAPI = process.env.MESSAGES_ENDPOINT_API || '/api/messages';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://thought-square.vercel.app', // Allow requests from this origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['*'],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

// Stores messages in memory
let messages: Message[] = [];

// Defines the Message interface i.e. what it should contain
interface Message {
  text: string;
  timestamp: string;
}

// On connect and disconnect
io.on('connection', (socket: any) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Endpoint to post a message
app.post(messagesEndpointAPI, (req: express.Request, res: express.Response) => {
  const { text, timestamp } = req.body;
  if (!text || !timestamp) {
    return res.status(400).json({ error: 'Invalid message format' });
  }
  const newMessage: Message = { text, timestamp };
  messages.push(newMessage);
  io.emit('receive-message', newMessage);
  console.log('Message emitted:', newMessage);
  res.status(201).json(newMessage);
});

// Endpoint to get all messages
app.get(messagesEndpointAPI, (req: express.Request, res: express.Response) => {
  res.status(200).json(messages);
});

server.listen(() => {
  console.log('Server is running on Vercel');
});
