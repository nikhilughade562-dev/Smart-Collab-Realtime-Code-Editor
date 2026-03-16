const ACTIONS=require('../Actions.js')
const {getParticipantsKey} = require('../Utils/redisKeys.js');

function initializeSocket(io,redisClient) {

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    //Join room
    socket.on(ACTIONS.JOIN,async ({roomId,userName})=>{
        try {
            const participantsKey = getParticipantsKey(roomId);
            //added new user
            await redisClient.hSet(participantsKey,socket.id,userName);
            //added to room
            socket.join(roomId);

            //getting code from redis
           const codes = await redisClient.get(`room:${roomId}:roomcode`);

            // get all participant
            const participants =await redisClient.hGetAll(participantsKey);
            const clients = Object.entries(participants).map(
                ([socketId, userName]) => ({
                socketId,
                userName,
                })
            );
            io.to(roomId).emit(ACTIONS.JOINED, {
                clients,
                userName,
                socketId: socket.id,
                code:codes || "//Start Coding",
            });

        } catch (error) {
            console.error("JOIN error:", error);
        }
    });


    //code syncing
    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    //saving in db
    socket.on(ACTIONS.CODE_SAVE, async ({ roomId, code }) => {
        await redisClient.set(`room:${roomId}:roomcode`, code);
    });

    // disconnecting
    socket.on('disconnecting',async()=>{
        try {
        const rooms = [...socket.rooms];
        for (const roomId of rooms) {
          
            if (roomId === socket.id) continue;

            const participantsKey =getParticipantsKey(roomId);

            // Get username before deleting
            const userName =await redisClient.hGet(
              participantsKey,
              socket.id
            );

            // Remove from Redis
            await redisClient.hDel(
                participantsKey,
                socket.id
            );
            //fetching new clients
            const participants =await redisClient.hGetAll(participantsKey);
            const clients = Object.entries(participants).map(
                ([socketId, userName]) => ({
                socketId,
                userName,
                })
            );
            //last participant
            if (clients.length === 0) {
                await redisClient.del(participantsKey);
                console.log(`Room ${roomId} deleted (empty)`);
            }
            else{
            // Notify others
            socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
              clients,
              socketId: socket.id,
              userName,
            });
            }
        }

      } catch (error) {
        console.error("DISCONNECT error:", error);
      }
   })

});

}

module.exports = initializeSocket;