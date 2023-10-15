const { SOCKET } = require("../const");
const MessageService = require('../services/MessageService');
const createMessage = async (data, io) => {
    try {
        io.to(data.roomId).emit(SOCKET.chatMessage, data.message);
        const response = await MessageService.createMessage(data);
    } catch (error) {
        console.log(error);
        return;
    }
}
  module.exports = {createMessage};