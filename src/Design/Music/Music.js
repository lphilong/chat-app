import React, { useMemo, useState, useEffect } from 'react';
import { VscUnmute, VscMute } from 'react-icons/vsc';
const useAudio = (url) => {
    const audio = useMemo(() => new Audio(url), [url]);
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing, audio]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(true));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(true));
        };
    }, [audio]);

    return [playing, toggle];
};

const Music = ({ url }) => {
    const [playing, toggle] = useAudio(url);

    return (
        <div className="music" style={{ right: 0, top: 0, margin: '20px', position: 'fixed', zIndex: '2001' }}>
            <button
                onClick={toggle}
                style={{ border: 'none', fontSize: '30px', cursor: 'pointer', background: 'none' }}
            >
                {playing ? <VscUnmute style={{ color: 'white' }} /> : <VscMute style={{ color: 'white' }} />}
            </button>
        </div>
    );
};

export default Music;
