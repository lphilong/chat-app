import React from 'react';
import { useChat } from '../Context/chatContext';
import { FaVideo, FaPhoneAlt } from 'react-icons/fa';
import Messages from './Messages';
import Input from './Input';
function ChatBox() {
    const { data } = useChat();
    return (
        <div className="chatBox">
            <div className="chatInfo">
                <div className="userInfo">
                    <img src={data.user?.photoURL} alt="" />
                    <span>{data.user?.displayName}</span>
                </div>
                <div className="icons">
                    <div className="icon">
                        <FaPhoneAlt />
                    </div>
                    <div className="icon">
                        <FaVideo />
                    </div>
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
}

export default ChatBox;
