const dotenv=require('dotenv').config();
const express=require('express');
const http=require('http');
const {Server} = require('socket.io');
const {redisClient,connectRedis}=require('./Config/redis.js');
const initializeSocket =require('./Socket/socket.js');
const cors = require("cors");
const executeRoutes = require("./Routes/executeRoutes");

connectRedis();
const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/code", executeRoutes);
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


const PORT = process.env.PORT; 
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));