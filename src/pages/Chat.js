import React from 'react';
import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';

function Chat() {
    return (
        <div className="home">
            <div className="chat__container">
                <Sidebar />
                <ChatBox />
            </div>
        </div>
    );
}

export default Chat;
