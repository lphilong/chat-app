import React from 'react';
import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';

function Chat() {
    return (
        <div className="chat__container">
            <Sidebar />
            <ChatBox />
        </div>
    );
}

export default Chat;
