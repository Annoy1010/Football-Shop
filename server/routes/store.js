import express from 'express';
const router = express.Router();

import storeController from '../controller/StoreController';

router.post('/update', storeController.updateStore);

router.use('/', storeController.getStore);

export default router;
