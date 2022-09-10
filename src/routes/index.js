import Login from '../pages/Login';
import Register from '../pages/Register';

const publicRoutes = [
    {
        path: '/',
        element: Login,
    },
    {
        path: '/register',
        element: Register,
    },
];

const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
