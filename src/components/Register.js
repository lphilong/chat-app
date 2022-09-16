import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/authContext';
import { RiImageAddFill } from 'react-icons/ri';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
function Register() {
    const { createUser, useKey, toggle } = useAuth();
    const [email, setEmail] = useState();
    const [displayName, setDisplayName] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [password, setPassword] = useState();
    const [preview, setPreview] = useState();
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        if (password !== passwordConfirm) {
            return alert('Passwords do not match');
        }
        try {
            const res = await createUser(email, password);
            alert('register success');
            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update <profile></profile>
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, 'userChats', res.user.uid), {});
                        navigate('/auth');
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };
    const keyPress = useKey('Enter', handleSubmit);
    // review avatar
    useEffect(() => {
        if (!file) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return (
        <div className="container">
            <div className="left">
                <div className="form">
                    <div className="form__header">
                        <span>Register</span>
                    </div>
                    <div className="form__mid">
                        <div className="form__input">
                            <input
                                type="text"
                                placeholder="Username"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Re-enter your password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                onKeyDown={keyPress}
                            />
                            <input
                                type="file"
                                id="file"
                                style={{ display: 'none' }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            {!file ? (
                                <label htmlFor="file">
                                    <RiImageAddFill
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            opacity: '0.7',
                                            cursor: 'pointer',
                                            marginRight: '10px',
                                        }}
                                    />
                                    <span>Add an avatar</span>
                                </label>
                            ) : (
                                <div style={{ marginBottom: '5px' }}>
                                    <img src={preview} alt="Your Avatar" style={{ width: '50px', height: '50px' }} />
                                </div>
                            )}
                        </div>

                        <button className="button" onClick={handleSubmit} disabled={loading} type="submit">
                            Sign Up
                        </button>
                        {err && <span>Something went wrong</span>}
                    </div>
                    <div className="form__footer">
                        <div
                            style={{
                                color: 'rgb(149,163,183)',
                                marginTop: '50px',
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                        >
                            Already have account?
                            <button onClick={toggle} className="navigate__btn">
                                Click here
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="img"></div>
            </div>
        </div>
    );
}

export default Register;
