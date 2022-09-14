import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
function Navbar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const Logout = async () => {
        try {
            await logout();
            navigate('/');
            alert('You are logged out');
        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <div className="nav">
            <span>Chat</span>
            <div className="user">
                <img src={user.photoURL} alt="" />
                <span>{user.displayName}</span>
            </div>
            <button onClick={Logout}>logout</button>
        </div>
    );
}

export default Navbar;
