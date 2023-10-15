const { SOCKET } = require('../const');
const RoomController = require('../controllers/RoomController');
const MessageController = require('../controllers/MessageController');
const socket = {
  connect: (socket, io) => {
    socket.on(SOCKET.createRoom, (username, callback) => {
      console.log(callback);
       RoomController.createRoom(username, socket, callback);
    });
  
    socket.on(SOCKET.chatMessage, (data) => {
      MessageController.createMessage(data, io);
    });
  },
};


module.exports = socket;
