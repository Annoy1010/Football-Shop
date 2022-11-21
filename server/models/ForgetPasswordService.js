import db from '../store';

function getEmailList(req, res) {
    const { email } = req.query;
    db.query(`SELECT * FROM CUSTOMER WHERE email = '${email}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

const service = {
    getEmailList,
};

export default service;
