import crypto from 'crypto';
import fs from 'fs';
import db from '../store';

function hash(pass) {
    var hash = crypto.createHash('sha256');
    return hash.update(pass).digest('hex');
}

function postUserLoginInfo(req, res) {
    const data = req.body;
    const username = data.username;
    const password = data.password;

    db.query(`SELECT * FROM CUSTOMER WHERE userName='${username}' AND pass='${hash(password)}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length === 0) {
                db.query(
                    `SELECT * FROM EMPLOYEE WHERE userName='${username}' AND pass='${hash(password)}'`,
                    (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            res.send(result);
                        }
                    },
                );
            } else {
                res.send(result);
            }
        }
    });
}

function getUserInfo(req, res) {
    db.query(`SELECT * FROM CUSTOMER`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function postCurrentPassword(req, res) {
    const data = req.body;
    const email = data.email;
    const currentPass = data.currentPass;
    db.query(`SELECT * FROM CUSTOMER WHERE email='${email}' AND pass='${hash(currentPass)}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length === 0) {
                db.query(
                    `SELECT * FROM EMPLOYEE WHERE email='${email}' AND pass='${hash(currentPass)}'`,
                    (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            res.send(result);
                        }
                    },
                );
            } else {
                res.send(result);
            }
        }
    });
}

function postNewPassword(req, res) {
    const data = req.body;
    const email = data.email;
    const newPass = data.newPass;
    db.query(`UPDATE CUSTOMER SET pass='${hash(newPass)}' WHERE email='${email}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.affectedRows === 0) {
                db.query(`UPDATE EMPLOYEE SET pass='${hash(newPass)}' WHERE email='${email}'`, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send(result);
                    }
                });
            } else {
                res.send(result);
            }
        }
    });
}

function postAvatar(req, res) {
    const data = req.body;
    const avatar = data.avatar;
    const username = data.username;
    const role = data.role;
    if (role === '0') {
        db.query(`UPDATE CUSTOMER SET avatar='${avatar}' WHERE userName='${username}'`, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        });
    } else {
        db.query(`UPDATE EMPLOYEE SET avatar='${avatar}' WHERE userName='${username}'`, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        });
    }
}

function getAvatar(req, res) {
    const data = req.body;
    const role = data.roleAccess;
    const username = data.username;
    if (role === '0') {
        db.query(`SELECT avatar FROM CUSTOMER WHERE username='${username}'`, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        });
    } else {
        db.query(`SELECT avatar FROM EMPLOYEE WHERE username='${username}'`, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        });
    }
}

function getCartIdInfo(req, res) {
    const data = req.body;
    const userId = data.userId;
    db.query(`SELECT cartId FROM CART WHERE userId=${userId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getCartQuantityInfo(req, res) {
    const data = req.body;
    const cartId = data.cartId;
    db.query(`SELECT * FROM CART_DETAIL WHERE cartId=${cartId} `, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function postNewCartDetailInfo(req, res) {
    const data = req.body;
    const cartId = data.cartId;
    const shoesId = data.shoesId;
    const quantity = data.quantity;

    db.query(
        `INSERT INTO CART_DETAIL (shoesId, shoesQuantity, cartId) VALUES (${shoesId}, ${quantity}, ${cartId}) `,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getCartDetailInfoByCartId(req, res) {
    const data = req.body;
    const cartId = data.cartId;
    db.query(`SELECT * FROM CART_DETAIL WHERE cartId=${cartId} `, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

const service = {
    getUserInfo,
    postUserLoginInfo,
    postCurrentPassword,
    postNewPassword,
    postAvatar,
    getAvatar,
    getCartIdInfo,
    getCartQuantityInfo,
    postNewCartDetailInfo,
    getCartDetailInfoByCartId,
};

export default service;
