import db from '../store';

function getOrderList(req, res) {
    db.query('SELECT * FROM ORDER_PRODUCT', (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function updateSubmitStatusDetail(req, res) {
    const data = req.body;
    const orderId = data.orderId;

    db.query(`UPDATE ORDER_PRODUCT SET submitStatus = 1 WHERE orderId=${orderId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function updateShipStatusDetail(req, res) {
    const data = req.body;
    const orderId = data.orderId;

    db.query(`UPDATE ORDER_PRODUCT SET shipStatus = 1 WHERE orderId=${orderId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function updatePayStatusDetail(req, res) {
    const data = req.body;
    const orderId = data.orderId;

    db.query(`UPDATE ORDER_PRODUCT SET paymentStatus = 1 WHERE orderId=${orderId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

const service = {
    getOrderList,
    updateSubmitStatusDetail,
    updateShipStatusDetail,
    updatePayStatusDetail,
};

export default service;
