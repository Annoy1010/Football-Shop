import express from 'express';
const router = express.Router();

import provinceController from '../controller/ProvinceController';

router.post('/name', provinceController.getProvinceNameById);

router.get('/', provinceController.getProvince);

export default router;
