import express from 'express';
const router = express.Router();

import wardController from '../controller/WardController';

router.post('/wardname', wardController.getWardName);
router.use('/', wardController.getWard);

export default router;
