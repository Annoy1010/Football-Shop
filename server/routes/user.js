import express from 'express';
const router = express.Router();

import userController from '../controller/UserController';

router.use('/login', userController.getUser);
router.use('/', userController.getUser);

export default router;
