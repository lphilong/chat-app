import React, { useEffect, useRef } from 'react';
import './Clock.scss';
function Clock() {
    const secondHandle = useRef(null);
    const minuteHandle = useRef(null);
    const hourHandle = useRef(null);
    useEffect(() => {
        const interval = setInterval(() => {
            let date = new Date();
            let ss = date.getSeconds();
            let mm = date.getMinutes();
            let hh = date.getHours();
            secondHandle.current.style.transform = `rotateZ(${ss * 6}deg)`;
            minuteHandle.current.style.transform = `rotateZ(${mm * 6}deg)`;
            hourHandle.current.style.transform = `rotateZ(${hh * 30}deg)`;
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <article className="clock">
                <div className="hours-container">
                    <div className="hours" ref={hourHandle}></div>
                </div>
                <div className="minutes-container">
                    <div className="minutes" ref={minuteHandle}></div>
                </div>
                <div className="seconds-container">
                    <div className="seconds" ref={secondHandle}></div>
                </div>
            </article>
        </div>
    );
}

export default Clock;
