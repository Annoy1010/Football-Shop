import db from '../store';

function getBankList(req, res) {
    db.query('SELECT * FROM BANK', (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getBankListDetailtOfUser(req, res) {
    const data = req.body;
    const userId = data.userId;

    db.query(`SELECT * FROM BANK_CARD WHERE userId=${userId} ORDER BY defaultBank DESC`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getBankNameByIdInfo(req, res) {
    const data = req.body;
    const bankId = data.bankId;

    db.query(`SELECT * FROM BANK WHERE bankId=${bankId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getDefaultBankInfo(req, res) {
    const data = req.body;
    const userId = data.userId;

    db.query(`SELECT * FROM BANK_CARD WHERE userId=${userId} AND defaultBank=1`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function postNewBankCardDetail(req, res) {
    const data = req.body;
    const bankId = data.bankId;
    const cardNumber = data.cardNumber;
    const expriDate = data.expriDate;
    const cvv = data.cvv;
    const proprietorName = data.proprietorName;
    const provinceId = data.provinceId;
    const districtId = data.districtId;
    const userId = data.userId;
    const defaultBank = data.defaultBank;

    db.query(
        `INSERT INTO BANK_CARD (cardNumber, expirationDate, CVV, bankId, provinceId, districtId, userId, proprietorName, defaultBank) VALUES ('${cardNumber}', '${expriDate}', '${cvv}', '${bankId}', '${provinceId}', '${districtId}', ${userId}, '${proprietorName}', ${defaultBank})`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

const service = {
    getBankList,
    getBankListDetailtOfUser,
    getBankNameByIdInfo,
    getDefaultBankInfo,
    postNewBankCardDetail,
};

export default service;
