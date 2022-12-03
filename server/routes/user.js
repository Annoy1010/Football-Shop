import express from 'express';
const router = express.Router();

import userController from '../controller/UserController';

router.post('/login', userController.postUserLogin);
router.post('/submit/currentpass', userController.postCurrentPass);
router.post('/password/newpass', userController.postNewPass);
router.post('/upload/image', userController.postImage);
router.post('/avatar', userController.getImage);
router.post('/cart/cartId', userController.getCartDetailByCartId);
router.post('/cartId', userController.getCartId);
router.post('/cartId/quantity', userController.getCartQuantity);
router.post('/cart/add/product', userController.postNewCartDetail);
router.use('/', userController.getUser);

export default router;
