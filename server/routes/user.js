import express from 'express';
const router = express.Router();

import userController from '../controller/UserController';

router.post('/login', userController.postUserLogin);
router.use('/', userController.getUser);

export default router;
