const RoomServices = require('../services/RoomServices');
const createRoom = async (username, socket, callback) => {
    try {
        const response = await RoomServices.createRoom(username);
        socket.join(response.data._id.toString());
        callback(response.data)
    } catch (error) {
        console.log(error);
        return;
    }
}
module.exports = {createRoom};