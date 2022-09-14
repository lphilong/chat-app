import React, { useState } from 'react';
import { useAuth } from '../Context/authContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
function Search() {
    const { useKey, user } = useAuth();
    const [username, setUserName] = useState('');
    const [err, setErr] = useState(false);
    const [curUser, setCurUser] = useState(null);

    const handleSearch = async () => {
        const q = query(collection(db, 'users'), where('displayName', '==', username));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setCurUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };
    const keyPress = useKey('Enter', handleSearch);
    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId = user.uid > curUser.uid ? user.uid + curUser.uid : curUser.uid + user.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: curUser.uid,
                        displayName: curUser.displayName,
                        photoURL: curUser.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', curUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (err) {}

        setCurUser(null);
        setUserName('');
    };
    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"
                    onKeyDown={keyPress}
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                />
            </div>
            {err && <span>User not found!</span>}
            {curUser && (
                <div className="userChat" onClick={handleSelect}>
                    <img src={curUser.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{curUser.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
