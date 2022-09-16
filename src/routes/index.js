import Home from '../pages/Home';
import Auth from '../pages/Auth';
import TestPage from '../TestPage';

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
        path: '/test',
        element: TestPage,
    },
];

const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
