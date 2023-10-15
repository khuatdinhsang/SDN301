import { io } from "socket.io-client";

const socket = io("localhost:3000");

socket.on("connect", () => {
  console.log(socket.id);
});

export const on = (eventName, callback) => {
    socket.on(eventName, (data) => {
        callback(data);
    });
}

export const emit = (eventName, data, callback) => {
    socket.emit(eventName, data, callback);
}

export default socket;