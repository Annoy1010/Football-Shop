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

const service = {
    getWardList,
};

export default service;
