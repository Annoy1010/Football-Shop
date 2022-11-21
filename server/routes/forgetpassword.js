import express from 'express';
const router = express.Router();

import forgetPasswordController from '../controller/ForgetPasswordController';

router.use('/email', forgetPasswordController.getEmail);
router.use('/', forgetPasswordController.getEmail);

export default router;
