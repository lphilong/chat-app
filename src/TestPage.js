import React from 'react';
import Music from './Design/Music/Music';
import Theme from './images/Double-Take-Violin-1-Hour-Kurt-Cover-Chill-Meme-Sound-Tik-Tok-Bn-Pht-Li-Mt-M-Hn.mp3';
function TestPage() {
    return (
        <div>
            <Music url={Theme} />
        </div>
    );
}

export default TestPage;
