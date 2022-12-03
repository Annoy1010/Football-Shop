import db from '../store';
import crypto from 'crypto';

function getEmailList(req, res) {
    const { email } = req.query;
    db.query(`SELECT * FROM CUSTOMER WHERE email = '${email}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length === 0) {
                db.query(`SELECT * FROM EMPLOYEE WHERE email = '${email}'`, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send(result);
                    }
                });
            } else {
                res.send(result);
            }
        }
    });
}

function setNewPassword(req, res) {
    function hash(pass) {
        var hash = crypto.createHash('sha256');
        return hash.update(pass).digest('hex');
    }

    const data = req.body;
    const email = req.body.resetEmail;
    const pass = data.rePassInput;

    db.query(`SELECT * FROM CUSTOMER WHERE email = '${email}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length === 0) {
                db.query(`UPDATE EMPLOYEE SET pass='${hash(pass)}' WHERE email = '${email}'`, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send(result);
                    }
                });
            } else {
                db.query(`UPDATE CUSTOMER SET pass='${hash(pass)}' WHERE email = '${email}'`, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send(result);
                    }
                });
            }
        }
    });
}

const service = {
    getEmailList,
    setNewPassword,
};

export default service;
