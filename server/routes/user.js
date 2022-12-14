import express from 'express';
const router = express.Router();

import userController from '../controller/UserController';

router.post('/signup', userController.postNewUser);
router.post('/signup/address', userController.postNewUserAddress);
router.post('/signup/cart', userController.postNewUserCart);
router.post('/userInfo', userController.getUserById);
router.post('/login', userController.postUserLogin);
router.post('/submit/currentpass', userController.postCurrentPass);
router.post('/password/newpass', userController.postNewPass);
router.post('/upload/image', userController.updateProfile);
router.post('/avatar', userController.getImage);
router.post('/profile/update', userController.updateProfile);
router.post('/cart/cartId', userController.getCartDetailByCartId);
router.post('/cart/remove', userController.removeProductInCart);
router.post('/cart/update', userController.updateCart);
router.post('/address', userController.getAddress);
router.post('/address/province', userController.getProvince);
router.post('/address/new', userController.postNewAddress);
router.post('/address/default', userController.updateDefaultAddress);
router.post('/order/new', userController.postNewOrder);
router.post('/order/new/detail', userController.postNewOrderDetail);
router.post('/order/orderId', userController.getOrderId);
router.post('/order/all', userController.getOrderListOfUser);
router.post('/order/all/shoes', userController.getShoesListOfOrder);
router.post('/order/remove', userController.removeOrder);
router.post('/order/cart/update', userController.updateCartAfterOrder);
router.post('/bank/default', userController.updateDefaultBank);

router.post('/cartId', userController.getCartId);
router.post('/cartId/quantity', userController.getCartQuantity);
router.post('/cart/add/product', userController.postNewCartDetail);
router.post('/employee/manage/update', userController.updateEmployee);
router.post('/employee/manage/new', userController.postNewEmployee);

router.get('/employee/all', userController.getEmployeeList);
router.get('/all', userController.getCustomerList);
router.use('/', userController.getUser);

export default router;
