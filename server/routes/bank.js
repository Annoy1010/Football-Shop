import express from 'express';
const router = express.Router();

import bankController from '../controller/BankController';

router.post('/user', bankController.getBankListOfUser);
router.post('/name', bankController.getBankNameById);
router.post('/card/default/existed', bankController.getDefaultBank);
router.post('/card/new', bankController.postNewBankCard);

router.use('/', bankController.getBank);

export default router;
