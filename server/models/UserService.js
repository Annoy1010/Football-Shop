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

    // if (nSuccessRows === currentCart.length) {
    //     res.send('success');
    // }
    // res.send('fail');
    res.send('success');
}

function getDeliveryAddressByUserId(req, res){
    const data = req.body;
    const userid = data.userid;
    db.query(`SELECT * FROM CUSTOMER_ADDRESS WHERE userId = ${userid} and statusAddress = 1`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function updateStatusProductInCart(req, res){
    const data = req.body;
    const statusShoesInCart = data.statusShoesInCart;
    const detailId = data.cartDetailId;
    db.query(`UPDATE CART_DETAIL SET statusShoesinCart = ${statusShoesInCart} WHERE detailId = ${detailId}`, (err, result) => {
        if (err) {
            throw err;
        }else{
            res.send(result);
        }
    });
}

function updateDashBoard(req, res){
    const data = req.body;
    const username = data.username;
    const fullname = data.fullname;
    const email = data.email;
    const phone = data.phone;
    db.query(`UPDATE CUSTOMER SET fullName = '${fullname}', email = '${email}', phone = '${phone}' WHERE userName = '${username}'`, (err, result) => {
        if (err) {
            throw err;
        } else{
            res.send(result);
        }
    });
}

function getUserInfoByUserName(req, res) {
    const data = req.body;
    const username = data.username;
    db.query(`SELECT * FROM CUSTOMER WHERE userName = '${username}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getAddressByUserId(req, res){
    const data = req.body;
    const userId = data.userId;
    db.query(`SELECT * FROM customer_address WHERE userId = '${userId}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
};

function chooseDeliveryAddress(req, res){
    const data = req.body;
    const userid = data.userid;
    const provinceid = data.provinceid;
    db.query(`update customer_address set statusAddress = ${0} where userId = ${userid}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            db.query(`update customer_address set statusAddress = ${1} where userId = '${userid}'and provinceId = '${provinceid}'`, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send(result);
                }
            });
        }
    });

}

function postUserAddressAdd(req, res){
    const data = req.body;
    const userId = data.userId; 
    const provinceid = data.provinceid;
    const districtid = data.districtid;
    const wardid = data.wardid;
    const detailaddress = data.detailaddress;
    db.query(`INSERT INTO CUSTOMER_ADDRESS (userId, provinceId, districtId, wardId, detail_Address, statusAddress) VALUES ('${userId}', '${provinceid}', '${districtid}', '${wardid}', '${detailaddress}', 0) `, (err, result) => {
        if (err) {
            throw err;
        }else{
            res.send(result);
        }
    });
}

//
function postUserSignUpInfo(req, res){
    function hash(pass) {
        var hash = crypto.createHash('sha256');
        return hash.update(pass).digest('hex');
    }
    const data = req.body;
    const username = data.username;
    const password = data.password;
    const fullname= data.fullname;
    const email = data.email;
    const phone = data.phone;
    const roleaccress = 0;
    
    db.query(`INSERT INTO CUSTOMER (userName, pass, fullName, email, phone, roleAccess) VALUES ('${username}', '${hash(password)}', '${fullname}', '${email}', '${phone}', ${roleaccress}) `, (err, result) => {
        if (err) {
            throw err;
        } else{
            res.send(result);
        }
    });
}

function postUserNameSignUp(req, res){
    const data = req.body;
    const userName = data.username;
    db.query(`SELECT * FROM CUSTOMER where userName = '${userName}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function postUserCartSignUp(req, res){
    const data = req.body;
    const userId = data.userId;
    db.query(`INSERT INTO CART (userId) VALUES ('${userId}') `, (err, result) => {
        if (err) {
            throw err;
        }else{
            res.send(result);
        }
    });
}

function postUserAddressSignUp(req, res){
    const data = req.body;
    const userId = data.userId; 
    const provinceid = data.provinceid;
    const districtid = data.districtid;
    const wardid = data.wardid;
    const detailaddress = data.detailaddress;
    const statusAddress = data.statusAddress;
    db.query(`INSERT INTO CUSTOMER_ADDRESS (userId, provinceId, districtId, wardId, detail_Address, statusAddress) VALUES ('${userId}', '${provinceid}', '${districtid}', '${wardid}', '${detailaddress}', ${statusAddress}) `, (err, result) => {
        if (err) {
            throw err;
        }else{
            res.send(result);
        }
    });
}

function getCartDetailInfoByCartIdToOrder(req, res) {
    const data = req.body;
    const cartId = data.cartId;
    db.query(`SELECT * FROM CART_DETAIL WHERE cartId=${cartId} and statusShoesInCart = 1`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function createOrder(req, res){
    const data = req.body;
    const userId = data.userId;
    const orderDate = data.orderDate;
    const totalCost = data.totalCost;
    const paymentStatus = data.paymentStatus;
    db.query(`INSERT INTO ORDER_PRODUCT (userId, orderDate, totalCost, paymentStatus) VALUES(${userId}, '${orderDate}', ${totalCost}, ${paymentStatus})`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function orderDetailAdd(req, res){
    const data = req.body;
    const orderId = data.orderId;
    const shoesId = data.shoesId;
    const shoesQuantity = data.shoesQuantity;
    //const sizeId = data.sizeId; !!!! thieu sizeId trong query
    db.query(`INSERT INTO ORDER_DETAIL (orderId, shoesId, shoesQuantity) VALUES(${orderId}, '${shoesId}', ${shoesQuantity})`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function deleteProductInCartByDetailId(req, res){
    const data = req.body;
    const detailId = data.detailId;
    db.query(`DELETE FROM CART_DETAIL WHERE detailId = ${detailId}`, (err, result) => {
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
    removeProductInCartDetail,
    updateCartDetail,
    getDeliveryAddressByUserId,
    updateStatusProductInCart,
    updateDashBoard,
    getUserInfoByUserName,
    getAddressByUserId,
    chooseDeliveryAddress,
    postUserAddressAdd,
    postUserSignUpInfo,
    postUserNameSignUp,
    postUserCartSignUp,
    postUserAddressSignUp,
    getCartDetailInfoByCartIdToOrder,
    createOrder,
    orderDetailAdd,
    deleteProductInCartByDetailId,
};

export default service;
