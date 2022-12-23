import db from '../store';

function getParameterInfo(req, res) {
    db.query(`SELECT * FROM PARAMETER`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

const service = {
    getParameterInfo,
};

export default service;
