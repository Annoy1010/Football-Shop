import BankService from '../models/BankService';

class BankRouter {
    getBank(req, res) {
        BankService.getBankList(req, res);
    }

    getBankListOfUser(req, res) {
        BankService.getBankListDetailtOfUser(req, res);
    }

    getBankNameById(req, res) {
        BankService.getBankNameByIdInfo(req, res);
    }

    getDefaultBank(req, res) {
        BankService.getDefaultBankInfo(req, res);
    }

    postNewBankCard(req, res) {
        BankService.postNewBankCardDetail(req, res);
    }
}

export default new BankRouter();
