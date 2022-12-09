import db from '../store';

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

function getWardName(req, res) {
    const data = req.body;
    const wardid = data.wardid;
    db.query(`SELECT * FROM WARD  WHERE wardId = '${wardid}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

const service = {
    getWardList,
    getWardName,
};

export default service;
