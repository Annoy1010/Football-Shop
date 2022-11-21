import crypto from 'crypto';
import db from '../store';

function postUserLoginInfo(req, res) {
    function hash(pass) {
        var hash = crypto.createHash('sha256');
        return hash.update(pass).digest('hex');
    }
    const data = req.body;
    const username = data.username;
    const password = data.password;
    db.query(`SELECT * FROM CUSTOMER WHERE userName='${username}' AND pass='${hash(password)}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getUserInfo(req, res) {
    db.query(`SELECT * FROM CUSTOMER`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

const service = {
    getUserInfo,
    postUserLoginInfo,
};

export default service;
