import React from 'react';
import { useChat } from '../Context/chatContext';
import { FaVideo, FaPhoneAlt } from 'react-icons/fa';
import Messages from './Messages';
import Input from './Input';
import { useAuth } from '../Context/authContext';
function ChatBox() {
    const { data } = useChat();
    const { active, toggleMobile } = useAuth();
    return (
        <div className={`chatBox ${active && 'show'}`}>
            <div className="chatInfo">
                <button onClick={toggleMobile} className="back__btn">
                    back
                </button>
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
