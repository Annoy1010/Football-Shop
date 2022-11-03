import db from '../store';

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
};

export default service;
