import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/authContext';
import { useChat } from '../Context/chatContext';
import { db } from '../firebase';

function Chats() {
    const [chats, setChats] = useState([]);
    const { user, toggleMobile } = useAuth();
    const { dispatch } = useChat();

    useEffect(() => {
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(db, 'userChats', user.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsubscribe();
            };
        };

        user.uid && getChats();
    }, [user.uid]);

    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u });
        toggleMobile();
    };
    return (
        <div className="chats">
            {Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                    <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                        <img src={chat[1].userInfo.photoURL} alt="" />
                        <div className="userChatInfo">
                            <span>{chat[1].userInfo.displayName}</span>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Chats;
