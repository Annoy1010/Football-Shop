import db from '../store';

function getWardNameById(req, res) {
    const data = req.body;
    const wardId = data.wardId;
    db.query(`SELECT * FROM WARD WHERE wardId='${wardId}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getWardList(req, res) {
    const { districtId } = req.query;
    db.query(`SELECT * FROM WARD WHERE districtId = '${districtId}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

const service = {
    getWardList,
    getWardNameById,
};

export default service;
