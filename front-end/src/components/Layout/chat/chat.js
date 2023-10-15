import React, { useState, useEffect } from 'react';
import icons from "../../../services/IconService";
import { emit, on } from "../../../services/SocketService";
import { useSelector } from 'react-redux';
import { SOCKET } from '../../../const';

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);
  const [username, setUsername] = useState(null);
  const account = useSelector(state => state.account);

  useEffect(() => {
    console.log("hello");
    if(!account?.username) return;
    setUsername(account?.username);
    joinRoom(account?.username);
    // socket.emit('getChatHistory',  account?.username );
  
    // socket.on('chatHistory', (chatHistory) => {
    //   // Xử lý lịch sử tin nhắn ở đây
    //   // ...
    // });
  
    
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const joinRoom = (username = account?.username) => {
    emit(SOCKET.createRoom, username, (createRoom) => {
      console.log(createRoom);
      setRoom(createRoom);
    });
  };

  const sendMessage = () => {
    console.log(message,room,username);
    if (message && room && username) {
      emit(SOCKET.chatMessage, {roomId: room._id, sender: username, message: message});
      setMessage('');
    }
  };

  useEffect(() => {
      on(SOCKET.chatMessage, (msg) => {
        console.log(message);
        setMessages([...messages, msg]);
      });
  }, [messages]);

 

  return (
    <div className="chat">
      {!isChatOpen && (
        <div className="chat-logo-container" onClick={toggleChat}>
          <div className="chat-logo">
            <icons.chat className="chat-logo" />
            <span className="chat-logo-text">
              <span>C</span>
              <span>h</span>
              <span>a</span>
              <span>t</span>
            </span>
          </div>
        </div>
      )}
      {isChatOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Chat với chúng tôi</h3>
            <button className="close-button" onClick={toggleChat}>
              &times;
            </button>
          </div>
          <div className="chat-box">
            {
            messages.map((msg, index) => (
              <>
              <span> {account?.username}</span>
              <div key={index}>{msg}</div>
            </>
            ))}
          </div>
          <div className="message-input-container">
            <input
              type="text"
              className="message-input"
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-button" onClick={sendMessage}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
