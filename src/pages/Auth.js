import React from 'react';
import { useAuth } from '../Context/authContext';
import Login from '../components/Login';
import Register from '../components/Register';
import Chat from './Chat';
function Auth() {
    const { active, user } = useAuth();
    return (
        <div className="home">
            {!user ? (
                <>
                    <div className={active ? 'invisible' : 'visible'}>
                        <Login />
                    </div>
                    <div className={active ? 'visible' : 'invisible'}>
                        <Register />
                    </div>
                </>
            ) : (
                <Chat />
            )}
        </div>
    );
}

export default Auth;
