import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

function Login() {
    const { login, useKey, user, isActive } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login(email, password);
            navigate('/');
        } catch (e) {
            alert('Your email or password is not correct!');
        }
        setLoading(false);
    };
    const keyPress = useKey('Enter', handleSubmit);
    if (user) {
        return <Navigate replace to="/chat" />;
    } else {
        return (
            <div className={isActive ? 'visible' : 'invisible'}>
                <div className="container">
                    <div className="left">
                        <div className="form">
                            <div className="form__header">
                                <span>Welcome back</span>
                            </div>
                            <div className="form__mid">
                                <div className="form__input">
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
                                        onKeyDown={keyPress}
                                    />
                                </div>
                                <div className="form__span">
                                    <div>
                                        <input type="checkbox" />{' '}
                                        <span style={{ color: 'rgb(149,163,183)' }}>Remember Me</span>
                                    </div>
                                    <span>Forgot password?</span>
                                </div>

                                <button className="button" onClick={handleSubmit} disabled={loading} type="submit">
                                    Login
                                </button>
                            </div>
                            <div>
                                <hr style={{ borderTop: '2px dashed rgb(132, 58, 241)', marginTop: '1.25rem' }} />

                                <span
                                    style={{
                                        width: '2.4rem',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: 'white',
                                        transform: 'translate(6.6rem, -.9rem)',
                                    }}
                                >
                                    Or
                                </span>
                            </div>

                            <div className="form__footer">
                                <div className="footer__button" style={{ border: '1px solid rgb(92,152,249)' }}>
                                    <FcGoogle />
                                    <span style={{ color: 'rgb(92,152,249)', marginLeft: '5px' }}>
                                        Login with Google
                                    </span>
                                </div>
                                <div className="footer__button" style={{ border: '1px solid rgb(55,87,156)' }}>
                                    <AiFillFacebook style={{ color: 'rgb(55,87,156)' }} />
                                    <span style={{ color: 'rgb(55,87,156)', marginLeft: '5px' }}>
                                        Login with Facebook
                                    </span>
                                </div>
                                <div
                                    style={{
                                        color: 'rgb(149,163,183)',
                                        marginTop: '50px',
                                        justifyContent: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    Don't have an account?
                                    <Link
                                        to="/register"
                                        style={{
                                            marginLeft: '10px',
                                            color: 'rgb(132, 58, 241)',
                                            textDecoration: 'none',
                                        }}
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
            </div>
        );
    }
}
export default Login;
