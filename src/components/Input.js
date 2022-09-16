import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/authContext';
import { useChat } from '../Context/chatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { IoMdSend } from 'react-icons/io';
import { ImImages } from 'react-icons/im';
function Input() {
    const { user, useKey } = useAuth();
    const { data } = useChat();
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);
    const [preview, setPreview] = useState();

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    //TODO:Handle Error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, 'chats', data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: user.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                },
            );
        } else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: user.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, 'userChats', user.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        });

        setText('');
        setImg(null);
    };
    const keyPress = useKey('Enter', handleSend);
    const enabled = text.length !== 0 || img !== null ? 1 : 0;
    useEffect(() => {
        if (!img) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(img);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [img]);
    return (
        <div className="input">
            <div className={`input__content ${img && 'justify'}`}>
                <input required type="text" placeholder="Aa " onChange={(e) => setText(e.target.value)} value={text} />
                <input type="file" style={{ display: 'none' }} id="file" onChange={(e) => setImg(e.target.files[0])} />
                {!img ? (
                    <label htmlFor="file">
                        <ImImages style={{ cursor: 'pointer', color: 'red' }} />
                    </label>
                ) : (
                    <div style={{ marginBottom: '5px', width: '100%' }}>
                        <img src={preview} alt="" style={{ width: '50px', height: '50px', borderRadius: '12px' }} />
                    </div>
                )}
            </div>
            <div className="send">
                <button disabled={!enabled} onKeyDown={keyPress} onClick={handleSend}>
                    <IoMdSend style={{ color: 'red', fontSize: '20px' }} />
                </button>
            </div>
        </div>
    );
}

export default Input;
