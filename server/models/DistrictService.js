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

const service = {
    getDistrictList,
};

export default service;
