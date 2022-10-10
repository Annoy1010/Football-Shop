import config from '../config';
import Content from '../layouts/Content';
import Home from '../layouts/Home';
import Products from '../layouts/Products';
import Size from '../layouts/Size';
import Contact from '../layouts/Contact';
import About from '../layouts/About';
import Sale from '../layouts/Sale';
import SignUp from '../layouts/SignUp';
import SignIn from '../layouts/SignIn';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.products,
        component: Products,
    },
    {
        path: config.routes.size,
        component: Size,
    },
    {
        path: config.routes.contact,
        component: Contact,
    },
    {
        path: config.routes.about,
        component: About,
    },
    {
        path: config.routes.sale,
        component: Sale,
    },
    {
        path: config.routes.signup,
        component: SignUp,
    },
    {
        path: config.routes.signin,
        component: SignIn,
    },
];

const privateRoutes = [
    {
        path: config.routes.profile,
        component: Content,
    },
    {
        path: config.routes.order,
        component: Content,
    },
    {
        path: config.routes.password,
        component: Content,
    },
];

export { publicRoutes, privateRoutes };
