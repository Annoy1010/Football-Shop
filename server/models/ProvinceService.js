import db from '../store';

function getProvinceNameByIdInfo(req, res) {
    const data = req.body;
    const provinceId = data.provinceId;

    db.query(`SELECT * FROM PROVINCE WHERE provinceId='${provinceId}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getProvinceList(req, res) {
    db.query('SELECT * FROM PROVINCE', (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

const service = {
    getProvinceNameByIdInfo,
    getProvinceList,
};

export default service;
