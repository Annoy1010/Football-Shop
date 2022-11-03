import db from '../store';

function getStoreInfo(req, res) {
    db.query(`SELECT * FROM STORE`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

const service = {
    getStoreInfo,
};

export default service;
