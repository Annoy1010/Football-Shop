import db from '../store';

function getDistrictNameByIdInfo(req, res) {
    const data = req.body;
    const districtId = data.districtId;

    db.query(`SELECT * FROM DISTRICT WHERE districtId='${districtId}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getDistrictList(req, res) {
    const { provinceId } = req.query;
    db.query(`SELECT * FROM DISTRICT WHERE provinceId = '${provinceId}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

const service = {
    getDistrictNameByIdInfo,
    getDistrictList,
};

export default service;
