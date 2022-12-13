import crypto from 'crypto';
import fs from 'fs';
import db from '../store';

function hash(pass) {
    var hash = crypto.createHash('sha256');
    return hash.update(pass).digest('hex');
}

function getUserInfoById(req, res) {
    const data = req.body;
    const userId = data.userId;

    db.query(`SELECT * FROM CUSTOMER WHERE userId=${userId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
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
    const sizeId = data.sizeId;

    db.query(
        `INSERT INTO CART_DETAIL (shoesId, shoesQuantity, cartId, sizeId) VALUES (${shoesId}, ${quantity}, ${cartId}, '${sizeId}') `,
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

function removeProductInCartDetail(req, res) {
    const data = req.body;
    const detailId = data.detailId;
    db.query(`DELETE FROM CART_DETAIL WHERE detailId=${detailId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function updateCartDetail(req, res) {
    const data = req.body;
    const cartId = data.cartId;
    const currentCart = data.currentCart;

    var nSuccessRows = 0;

    currentCart.map((item) => {
        db.query(
            `UPDATE CART_DETAIL SET shoesQuantity=${item.shoesQuantity} WHERE detailId=${item.detailId} AND cartId=${cartId}`,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                }
            },
        );
    });
    res.send('success');
}

function getEmployeeListDetail(req, res) {
    db.query(`SELECT * FROM EMPLOYEE`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function updateEmployeeInfo(req, res) {
    const data = req.body;
    const employeeId = data.employeeId;
    const position = data.position;
    const workShift = data.workShift;
    const workStatus = data.workStatus;

    db.query(
        `UPDATE EMPLOYEE SET isAdmin=${position}, workShift=${workShift}, workStatus=${workStatus} WHERE employeeId=${employeeId}`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function postNewEmployeeInfo(req, res) {
    const data = req.body;
    const storeId = data.storeId;
    const userName = data.userName;
    const name = data.name;
    const phone = data.phone;
    const email = data.email;
    const position = data.position;
    const workShift = data.workShift;
    const province = data.province;

    const date = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '/' + mm + '/' + dd;
        return today;
    };

    db.query(
        `INSERT INTO EMPLOYEE (userName, pass, fullName, email, phone, storeId, startDate, workShift, workStatus, isAdmin, provinceId)
        VALUES ('${userName}', '${hash(
            '123456',
        )}', '${name}', '${email}', '${phone}', '${storeId}', '${date()}', '${workShift}', 1, ${position}, '${province}')`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                if (result.affectedRows > 0) {
                }
            }
        },
    );
}

function getAddressInfo(req, res) {
    const data = req.body;
    const userId = data.userId;
    db.query(
        `SELECT * FROM CUSTOMER_ADDRESS ca, PROVINCE p, DISTRICT d, WARD w WHERE ca.userId=${userId} AND ca.provinceId=p.provinceId AND ca.districtId = d.districtId AND ca.wardId = w.wardId`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getProvinceInfo(req, res) {
    const data = req.body;
    const provinceId = data.provinceId;
    db.query(`SELECT provinceName FROM PROVINCE WHERE provinceId='${provinceId}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function postNewAddressInfo(req, res) {
    const data = req.body;
    const provinceId = data.provinceId;
    const districtId = data.districtId;
    const wardId = data.wardId;
    const detailAddress = data.detailAddress;
    const userId = data.userId;

    db.query(
        `INSERT INTO CUSTOMER_ADDRESS (provinceId, districtId, wardId, detailAddress, userId, defaultAddress) VALUES ('${provinceId}', '${districtId}', '${wardId}', '${detailAddress}', ${userId} , 0)`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function postNewOrderInfo(req, res) {
    const data = req.body;
    const userId = data.userId;
    const total = data.total;
    const addressId = data.addressId;
    const paymentId = data.paymentId;

    const date = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '/' + mm + '/' + dd;
        return today;
    };

    if (paymentId === '1') {
        db.query(
            `INSERT INTO ORDER_PRODUCT (userId, orderDate, totalCost, shipStatus, submitStatus, paymentStatus, addressId, paymentId) VALUES (${userId}, '${date()}', ${total}, 0, 0, 0, ${addressId}, '${paymentId}')`,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send(result);
                }
            },
        );
    } else if (paymentId === '2') {
        db.query(
            `INSERT INTO ORDER_PRODUCT (userId, orderDate, totalCost, shipStatus, submitStatus, paymentStatus, addressId, paymentId) VALUES (${userId}, '${date()}', ${total}, 0, 0, 1, ${addressId}, '${paymentId}')`,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send(result);
                }
            },
        );
    }
}

function getOrderIdInfo(req, res) {
    const data = req.body;
    const userId = data.userId;
    db.query(`SELECT * FROM ORDER_PRODUCT WHERE userId=${userId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function postNewOrderDetailInfo(req, res) {
    const data = req.body;
    const orderId = data.orderId;
    const product = data.product;
    db.query(
        `INSERT INTO ORDER_DETAIL (orderId, shoesId, shoesQuantity, sizeId) VALUES (${orderId}, ${product.shoesId}, ${product.shoesQuantity}, '${product.chosedSize}')`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getOrderDetailListOfUser(req, res) {
    const data = req.body;
    const userId = data.userId;

    db.query(
        `SELECT * FROM ORDER_PRODUCT WHERE userId=${userId} AND NOT EXISTS (SELECT * FROM ORDER_PRODUCT WHERE userId=${userId} AND shipStatus=1 AND submitStatus=1 AND paymentStatus=1)`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getShoesDetailListOfOrder(req, res) {
    const data = req.body;
    const orderId = data.orderId;

    db.query(
        `SELECT * FROM ORDER_DETAIL od, SHOES s, SHOES_IMAGE si, SIZE sz WHERE orderId=${orderId} AND od.shoesId= s.shoesId AND s.shoesId=si.shoesId AND od.sizeId=sz.sizeId`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function removeOrderDetail(req, res) {
    const data = req.body;
    const orderId = data.orderId;

    db.query(`DELETE FROM ORDER_DETAIL WHERE orderId=${orderId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.affectedRows > 0) {
                db.query(`DELETE FROM ORDER_PRODUCT WHERE orderId=${orderId}`, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.send(result);
                    }
                });
            }
        }
    });
}

const service = {
    getUserInfoById,
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
    removeProductInCartDetail,
    updateCartDetail,
    getEmployeeListDetail,
    updateEmployeeInfo,
    postNewEmployeeInfo,
    getAddressInfo,
    getProvinceInfo,
    postNewAddressInfo,
    postNewOrderInfo,
    postNewOrderDetailInfo,
    getOrderIdInfo,
    getOrderDetailListOfUser,
    getShoesDetailListOfOrder,
    removeOrderDetail,
};

export default service;
