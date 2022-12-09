import db from '../store';

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

function getDistrictName(req, res) {
    const data = req.body;
    const districtid = data.districtid;
    db.query(`SELECT * FROM DISTRICT WHERE districtId = '${districtid}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}
const service = {
    getDistrictList,
    getDistrictName,
};

export default service;
