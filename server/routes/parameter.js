import express from 'express';
const router = express.Router();

import parameterController from '../controller/ParameterController';

router.use('/', parameterController.getParameter);

export default router;
