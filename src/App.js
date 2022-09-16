import './style.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/index';
import Music from './Design/Music/Music';
import Theme from './images/Double-Take-Violin-1-Hour-Kurt-Cover-Chill-Meme-Sound-Tik-Tok-Bn-Pht-Li-Mt-M-Hn.mp3';
function App() {
    return (
        <Router basename="/chat-app">
            <div className="App">
                <Music url={Theme} />
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.element;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
