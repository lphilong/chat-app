import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import Clock from '../Design/Clock/Clock';
import StarFall from '../Design/StarFall/StarFall';

function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = () => (user ? navigate('/chat') : navigate('/auth'));
    return (
        <div className="s">
            <div className="home">
                <button type="submit" onClick={handleSubmit} className="decoration">
                    Chat App
                </button>
                <Clock />
                <StarFall />
            </div>
        </div>
    );
}

export default Home;
