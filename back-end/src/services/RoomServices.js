const Room = require("../models/RoomModel");
const createRoom = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            const room = await Room.findOne({
                    name: username
                })
                if(room)
                resolve({
                    status: 'OK',
                    message: 'Find Room successfully',
                    data: room._id
                })

            const createRoom = await Room.create({
                name: username
            })
            resolve({
                status: 'OK',
                message: 'Room created successfully',
                data: createRoom._id
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {createRoom};