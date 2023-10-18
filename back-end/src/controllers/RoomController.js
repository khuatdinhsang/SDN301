const RoomServices = require('../services/RoomServices');
const createRoom = async (data, socket, callback) => {
    try {
        const{username, isNotlogin} = data;
        const response = await RoomServices.createRoom(username);
        if(!isNotlogin) socket.username = username;
        socket.join(response.data.toString());
        callback(response.data);
    } catch (error) {
        console.log(error);
        return;
    }
}
module.exports = {createRoom};