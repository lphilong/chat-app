import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { RiImageAddFill } from 'react-icons/ri';
function Register() {
    const { createUser, useKey, user } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [passwordConfirm, setpasswordConfirm] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            return alert('Passwords do not match');
        }
        try {
            setLoading(true);
            await createUser(email, password);
            navigate('/login');
        } catch (e) {
            alert(e.message);
        }
        setLoading(false);
    };
    const keyPress = useKey('Enter', handleSubmit);
    if (user) {
        return <Navigate replace to="/chat" />;
    } else {
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
                                    required
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    required
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    required
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    required
                                    type="password"
                                    placeholder="Re-enter your password"
                                    value={passwordConfirm}
                                    onChange={(e) => setpasswordConfirm(e.target.value)}
                                    onKeyDown={keyPress}
                                />
                                <input required style={{ display: 'none' }} type="file" id="file" />
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
                            </div>

                            <button className="button" onClick={handleSubmit} disabled={loading} type="submit">
                                Sign Up
                            </button>
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
                                Already have an account?
                                <Link
                                    to="/"
                                    style={{ marginLeft: '10px', color: 'rgb(132, 58, 241)', textDecoration: 'none' }}
                                >
                                    Click here
                                </Link>
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
}

export default Register;
