const dotenv=require('dotenv').config();
const express=require('express');
const http=require('http');
const {Server} = require('socket.io');
const {redisClient,connectRedis}=require('./Config/redis.js');
const initializeSocket =require('./Socket/socket.js');

connectRedis();
const app=express();
const server = http.createServer(app);


const io = new Server(server,{
  cors: {
    origin: "*"
  },
});

initializeSocket(io,redisClient);


app.get('/', (req, res) => {
  res.send('Hello World! This is a GET request response.');
});


const PORT = process.env.PORT || 5000; 
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));