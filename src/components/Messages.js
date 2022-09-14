import React, { useState, useEffect } from 'react';
import { useChat } from '../Context/chatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Message from './Message';

function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useChat();
    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    console.log(messages);

    return (
        <div className="messages">
            {messages.map((i) => (
                <Message message={i} key={i.id} />
            ))}
        </div>
    );
}

export default Messages;
