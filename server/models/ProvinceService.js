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

const service = {
    getProvinceList,
};
export default service;
