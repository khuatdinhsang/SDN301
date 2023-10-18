import { io } from "socket.io-client";

const socket = io("localhost:3000", {
    pingTimeout: 24 * 60 * 60 * 1000, // 1 ngày (như bạn đã đặt phía máy khách)
    pingInterval: 10000,    // 10 phút (để gửi ping/pong để duy trì kết nối)
});

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