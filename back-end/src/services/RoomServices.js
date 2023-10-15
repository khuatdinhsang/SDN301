const Room = require("../models/RoomModel");
const createRoom = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            const room = await Room.findOne({
                    name: username
                })
                resolve({
                    status: 'OK',
                    message: 'Find Room successfully',
                    data: room
                })

            const createRoom = await Room.create({
                name: username
            })
            resolve({
                status: 'OK',
                message: 'Room associated successfully',
                data: createRoom
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {createRoom};