import db from '../store';

function getProvinceList(req, res) {
    db.query('SELECT * FROM PROVINCE', (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getProvinceName(req, res){
    const data = req.body;
    const provinceid = data.provinceid;
    db.query(`SELECT * FROM PROVINCE WHERE provinceId = '${provinceid}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

const service = {
    getProvinceList,
    getProvinceName,
};

export default service;
