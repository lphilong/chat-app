import React from 'react';
import Search from './Search';
import Navbar from './Navbar';
import Chats from './Chats';
import { useAuth } from '../Context/authContext';
function Sidebar() {
    const { active } = useAuth();
    return (
        <div className={`sidebar ${active && 'hide'}`}>
            <Navbar />
            <Search />
            <Chats />
        </div>
    );
}

export default Sidebar;
