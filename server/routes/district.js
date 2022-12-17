import express from 'express';
const router = express.Router();

import districtController from '../controller/DistrictController';

router.post('/name', districtController.getDistrictNameById);

router.use('/province/:slug', districtController.getDistrict);
router.use('/', districtController.getDistrict);

export default router;
