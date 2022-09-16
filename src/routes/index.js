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
];

const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
