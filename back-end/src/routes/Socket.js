const { SOCKET } = require('../const');
const RoomController = require('../controllers/RoomController');
const MessageController = require('../controllers/MessageController');
const socket = {
  connect: (socket, io) => {
    socket.on(SOCKET.joinRoom, (data, callback) => {
       RoomController.createRoom(data, socket, callback);
    });
  
    socket.on(SOCKET.chatMessage, (data) => {
      MessageController.createMessage(data, io);
    });
    socket.on('disconnect', () => {
      if(!socket.username) console.log("hello");
      console.log(`User disconnected`);
    });
  },
};


module.exports = socket;
