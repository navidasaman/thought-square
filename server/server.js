"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require('http');
var cors = require('cors');
var socketIo = require('socket.io');
require('dotenv');
var messagesEndpointAPI = process.env.MESSAGES_ENDPOINT_API || '/api/messages';
var app = express();
var server = http.createServer(app);
var io = socketIo(server, {
    cors: {
        origin: 'https://thought-square.vercel.app', // Allow connections from this origin
        methods: ['GET', 'POST'], // Allow only GET and POST requests
        allowedHeaders: ['*'],
        credentials: true // Allow credentials (cookies, authorization headers, etc.)
    }
});
app.use(cors());
app.use(express.json());
// Stores messages in memory
var messages = [];
// Endpoint to post a message
app.post(messagesEndpointAPI, function (req, res) {
    var _a = req.body, text = _a.text, timestamp = _a.timestamp;
    if (!text || !timestamp) {
        return res.status(400).json({ error: 'Invalid message format' });
    }
    var newMessage = { text: text, timestamp: timestamp };
    messages.push(newMessage);
    io.emit('receive-message', newMessage);
    console.log('Message emitted:', newMessage);
    res.status(201).json(newMessage);
});
// Endpoint to get all messages
app.get(messagesEndpointAPI, function (req, res) {
    res.status(200).json(messages);
});
server.listen(function () {
    console.log('Server is running on Vercel');
});
