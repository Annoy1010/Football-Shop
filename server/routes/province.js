import express from 'express';
const router = express.Router();

import provinceController from '../controller/ProvinceController';

router.use('/', provinceController.getProvince);

export default router;
