import config from '../config';
import Home from '../layouts/Home';
import Products from '../layouts/Products';
import Size from '../layouts/Size';
import Contact from '../layouts/Contact';
import About from '../layouts/About';
import Sale from '../layouts/Sale';
import Cart from '../layouts/Cart';
import Order from '../layouts/Order';
import OrderInfo from '../layouts/OrderInfo';
import SignUp from '../layouts/SignUp';
import SignIn from '../layouts/SignIn';
import ForgetPassword from '../layouts/ForgetPassword';
import Profile from '../layouts/Profile/Profile';
import ShoesProductDetail from '../components/ShoesProductDetail/ShoesProductDetail';
import ManageOrder from '../layouts/ManageOrder';
import ManageProduct from '../layouts/ManageProduct';
import ManageEmployee from '../layouts/ManageEmployee';
import Report from '../layouts/Report';
import Attend from '../layouts/Attend';

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
        path: config.routes.cart,
        component: Cart,
    },
    {
        path: config.routes.order,
        component: Order,
    },
    {
        path: config.routes.manageOrders,
        component: ManageOrder,
    },
    {
        path: config.routes.manageProducts,
        component: ManageProduct,
    },
    {
        path: config.routes.manageEmployees,
        component: ManageEmployee,
    },
    {
        path: config.routes.report,
        component: Report,
    },
    {
        path: config.routes.attend,
        component: Attend,
    },
    {
        path: config.routes.signup,
        component: SignUp,
    },
    {
        path: config.routes.signin,
        component: SignIn,
    },
    {
        path: config.routes.orderInfo,
        component: OrderInfo,
    },
    {
        path: config.routes.forgetPassword,
        component: ForgetPassword,
    },
    {
        path: config.routes.profile,
        component: Profile,
    },
    {
        path: config.routes.shoesProductDetail,
        component: ShoesProductDetail,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
