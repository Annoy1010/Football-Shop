import express from 'express';
const router = express.Router();

import wardController from '../controller/WardController';

router.post('/name', wardController.getWardNameById);

router.use('/district/:slug', wardController.getWard);
router.use('/', wardController.getWard);

export default router;
