import './style.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/index';
import { useAuth } from './Context/authContext';
import Clock from './Clock/Clock';
function App() {
    const { toggleClass, isActive } = useAuth();
    return (
        <Router>
            <div className="App">
                <div className="home">
                    <button onClick={toggleClass} className={isActive ? 'invisible' : 'decoration'}>
                        Welcome
                    </button>
                    <Clock />
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.element;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
