import express from 'express';
const router = express.Router();

import districtController from '../controller/DistrictController';

router.use('/province/:slug', districtController.getDistrict);
router.use('/', districtController.getDistrict);

export default router;
