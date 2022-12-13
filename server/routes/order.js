import express from 'express';
const router = express.Router();

import orderController from '../controller/OrderController';

router.post('/submit/active', orderController.updateSubmitStatus);
router.post('/ship/active', orderController.updateShipStatus);
router.post('/pay/active', orderController.updatePayStatus);

router.use('/', orderController.getOrder);

export default router;
