import express from 'express';
const router = express.Router();

import storeController from '../controller/StoreController';

router.use('/', storeController.getStore);

export default router;
