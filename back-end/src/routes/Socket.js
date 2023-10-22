const { SOCKET } = require('../const');
const RoomController = require('../controllers/RoomController');
const MessageController = require('../controllers/MessageController');
const { socketAuthMiddleware } = require('../middlewares/AdminMiddleware');
const socket = {
  connect: (socket, io) => {
    io.use(socketAuthMiddleware);
  
    socket.on(SOCKET.joinRoom, (data, callback) => {
       RoomController.createRoom(data, socket, callback);
    });
    socket.on(SOCKET.getChatHistory, (data, callback) => {
      MessageController.getMessageHistory(data, socket, callback);
    })
    socket.on(SOCKET.chatMessage, (data) => {
       MessageController.createMessage(data, io, socket);
    });
    socket.on('disconnect', () => {
      if(!socket.username) console.log("hello");
      console.log(`User disconnected`);
    });
  },
};


module.exports = socket;
