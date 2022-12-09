import express from 'express';
import UserController from '../controller/UserController';
const router = express.Router();

import userController from '../controller/UserController';

router.post('/login', userController.postUserLogin);
router.post('/submit/currentpass', userController.postCurrentPass);
router.post('/password/newpass', userController.postNewPass);
router.post('/upload/image', userController.postImage);
router.post('/avatar', userController.getImage);
router.post('/cart/cartId', userController.getCartDetailByCartId);
router.post('/cart/remove', userController.removeProductInCart);
router.post('/cart/update', userController.updateCart);

router.post('/cartId', userController.getCartId);
router.post('/cartId/quantity', userController.getCartQuantity);
router.post('/cart/add/product', userController.postNewCartDetail);
router.post('/info/deliveryaddress', userController.getDeliveryAddress);
router.post('/cart/product/updatestatus', userController.updateStatusProductInCart);
router.post('/dashboard/update', userController.updateDashBoard);
router.post('/userinfo', userController.getUserInfoByUserName);
router.post('/address/list', userController.getAddressByUserId);
router.post('/address/delivery', userController.chooseDeliveryAddress);
router.post('/address/add', userController.postUserAddressAdd);
router.post('/signup', userController.postUserSignUpInfo);
router.post('/signup/cart', UserController.postUserCartSignUp);
router.post('/signup/username', userController.postUserNameSignUp);
router.post('/signup/address', UserController.postUserAddressSignUp);
router.post('/cart/cartid/order', userController.getCartDetailInfoByCartIdToOrder);
router.post('/order', userController.createOrder);
router.post('/order/detail', userController.orderDetailAdd);
router.post('/cart/detail/deleteproduct', userController.deleteProductInCartByDetailId);
router.use('/', userController.getUser);

export default router;
