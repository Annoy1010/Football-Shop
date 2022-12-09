import express from 'express';
const router = express.Router();

import provinceController from '../controller/ProvinceController';

router.post('/provincename', provinceController.getProvinceName);
router.use('/', provinceController.getProvince);

export default router;
