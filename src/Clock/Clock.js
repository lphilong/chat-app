import React, { useEffect, useRef } from 'react';
import { useAuth } from '../Context/authContext';
import './Clock.scss';
function Clock() {
    const { isActive } = useAuth();
    const secondHandle = useRef(null);
    const minuteHandle = useRef(null);
    const hourHandle = useRef(null);
    useEffect(() => {
        setInterval(() => {
            let date = new Date();
            let ss = date.getSeconds();
            let mm = date.getMinutes();
            let hh = date.getHours();
            secondHandle.current.style.transform = `rotateZ(${ss * 6}deg)`;
            minuteHandle.current.style.transform = `rotateZ(${mm * 6}deg)`;
            hourHandle.current.style.transform = `rotateZ(${hh * 30}deg)`;
        }, 1000);
    }, []);
    return (
        <div>
            <article class={isActive ? 'invisible' : 'clock'}>
                <div class="hours-container">
                    <div class="hours" ref={hourHandle}></div>
                </div>
                <div class="minutes-container">
                    <div class="minutes" ref={minuteHandle}></div>
                </div>
                <div class="seconds-container">
                    <div class="seconds" ref={secondHandle}></div>
                </div>
            </article>
        </div>
    );
}

export default Clock;
