import React, { useEffect, useRef } from 'react';
import { useAuth } from '../Context/authContext';
import { useChat } from '../Context/chatContext';

const Message = ({ message }) => {
    const { user } = useAuth();
    const { data } = useChat();

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    return (
        <div ref={ref} className={`message ${message.senderId === user.uid && 'owner'}`}>
            <div className="messageInfo">
                <img src={message.senderId === user.uid ? user.photoURL : data.user.photoURL} alt="" />
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
};

export default Message;
