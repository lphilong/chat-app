import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Chat from '../pages/Chat';

const publicRoutes = [
    {
        path: '/',
        element: Home,
    },
    {
        path: '/auth',
        element: Auth,
    },
    {
        path: '/chat',
        element: Chat,
    },
];

const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
