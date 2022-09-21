import React from 'react';
import { useNavigate } from 'react-router-dom';
import Clock from '../Design/Clock/Clock';
import StarFall from '../Design/StarFall/StarFall';

function Home() {
    const navigate = useNavigate();
    const handleSubmit = () => navigate('/auth');
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
