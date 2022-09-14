import Chat from '../pages/Chat';
import Home from '../pages/Home';
import Auth from '../pages/Auth';

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
