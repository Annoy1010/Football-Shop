import db from '../store';

function getProductsList(req, res) {
    db.query(
        `SELECT * FROM SHOES s, SHOES_IMAGE si, SHOES_SIZE ss WHERE s.shoesId = si.shoesId and s.shoesId = ss.shoesId`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getProductListDetail(req, res) {
    db.query(`SELECT * FROM SHOES `, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getSaleProductsList(req, res) {
    db.query(
        `SELECT * FROM SHOES s, SHOES_IMAGE si, SHOES_SIZE ss WHERE s.shoesId = si.shoesId AND s.shoesId = ss.shoesId AND s.sale != 0`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getImportIDInfo(req, res) {
    db.query(`SELECT * FROM SHOES_IMPORT`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function postNewImport(req, res) {
    const data = req.body;
    const employeeId = data.employeeId;
    const totalPrice = data.totalPrice;
    const date = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '/' + mm + '/' + dd;
        return today;
    };

    db.query(
        `INSERT INTO SHOES_IMPORT (employeeId, totalPrice, importDate) VALUES ('${employeeId}', ${totalPrice}, '${date()}')`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                if (result.affectedRows > 0) {
                    db.query(`SELECT * FROM SHOES_IMPORT`, (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            res.send(result);
                        }
                    });
                }
            }
        },
    );
}

function getShoesIDInfo(req, res) {
    db.query(`SELECT * FROM SHOES`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getDescriptionIDInfo(req, res) {
    db.query(`SELECT * FROM DESCRIPTION_PRODUCT`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function postDescriptionlIdInfo(req, res) {
    db.query(`INSERT INTO DESCRIPTION_PRODUCT (content) VALUES ('')`, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.affectedRows > 0) {
                db.query(`SELECT * FROM DESCRIPTION_PRODUCT`, (err, result) => {
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

function postNewProduct(req, res) {
    const data = req.body;
    const descriptionId = data.descriptionId;
    const product = data.item;

    db.query(
        `INSERT INTO SHOES (shoesName, typeId, grassId, trademarkId, playPositionId, originNationalId, descriptionId, price, sale, importPrice) VALUES ('${
            product.productName
        }', '${product.typeNameId}', '${product.grassTypeId}', '${product.trademarkId}', '${product.positionId}', '${
            product.originalNationId
        }', ${descriptionId}, ${Number.parseInt(product.price) + 150000}, ${product.sale}, ${product.importPrice})`,
        (err, importShoesResult) => {
            if (err) {
                throw err;
            } else {
                if (importShoesResult.affectedRows > 0) {
                    db.query(`SELECT * FROM SHOES`, (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            res.send(result);
                        }
                    });
                }
            }
        },
    );
}

function postImportDetailInfo(req, res) {
    const data = req.body;
    const importId = data.importId;
    const shoesId = data.shoesId;
    const quantity = data.quantity;

    db.query(
        `INSERT INTO SHOES_IMPORT_DETAIL (importId, shoesId, importQuantity) VALUES (${importId}, ${shoesId}, ${quantity})`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function postNewImportDetailAndSize(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    const importId = data.importId;
    const sizeId = data.sizeId;
    const importQuantity = data.importQuantity;

    db.query(`INSERT INTO SHOES_IMAGE (shoesId) VALUES (${shoesId})`, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.affectedRows > 0) {
                db.query(
                    `INSERT INTO SHOES_IMPORT_DETAIL (importId, shoesId, importQuantity) VALUES (${importId}, ${shoesId}, ${importQuantity})`,
                    (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            if (result.affectedRows > 0) {
                                db.query(
                                    `INSERT INTO SHOES_SIZE (shoesId, sizeId, quantity) VALUES (${shoesId}, '${sizeId}', ${importQuantity})`,
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
                    },
                );
            }
        }
    });
}

function postFrontImageDetail(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    const frontImage = data.frontImage;
    db.query(`UPDATE SHOES_IMAGE SET frontImage = '${frontImage}' WHERE shoesId = ${shoesId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function postMainImageDetail(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    const mainImage = data.mainImage;
    db.query(`UPDATE SHOES_IMAGE SET mainImage = '${mainImage}' WHERE shoesId = ${shoesId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function postBackImageDetail(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    const backImage = data.backImage;
    db.query(`UPDATE SHOES_IMAGE SET backImage = '${backImage}' WHERE shoesId = ${shoesId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function postImageDetail(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    const product = data.product;
    const frontImage = product.frontImage;
    const mainImage = product.mainImage;
    const backImage = product.backImage;
    db.query(
        `UPDATE SHOES_IMAGE SET frontImage = '${frontImage}', mainImage = '${mainImage}', backImage = '${backImage}' WHERE shoesId = ${shoesId}`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getAvailableQuantityWithSizeInfo(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    const sizeId = data.sizeId;

    db.query(`SELECT * FROM SHOES_SIZE WHERE shoesId=${shoesId} AND sizeId='${sizeId}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getProductsWithSizeAndIdInfo(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    const sizeId = data.sizeId;
    const quantity = data.quantity;

    db.query(`SELECT * FROM SHOES_SIZE WHERE shoesId = ${shoesId} AND sizeId = '${sizeId}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                if (result[0].quantity === 0) {
                    db.query(
                        `UPDATE SHOES_SIZE SET quantity = ${quantity} WHERE shoesId=${shoesId} AND sizeId = '${sizeId}'`,
                        (err, result) => {
                            if (err) {
                                throw err;
                            } else {
                                res.send(result);
                            }
                        },
                    );
                } else {
                    db.query(
                        `UPDATE SHOES_SIZE SET quantity = quantity + ${quantity} WHERE shoesId = ${shoesId} AND sizeId = '${sizeId}'`,
                        (err, result) => {
                            if (err) {
                                throw err;
                            } else {
                                res.send(result);
                            }
                        },
                    );
                }
            } else {
                db.query(
                    `INSERT INTO SHOES_SIZE (shoesId, sizeId, quantity) VALUES (${shoesId}, '${sizeId}', ${quantity})`,
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
    });
}

function getProductByIdInfo(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    db.query(
        `SELECT * FROM SHOES s, SHOES_IMAGE si WHERE s.shoesId=${shoesId} AND s.shoesId = si.shoesId`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getProductsListShoesNameAsc(req, res) {
    db.query(
        `SELECT * FROM SHOES s, SHOES_IMAGE si, SHOES_SIZE ss WHERE s.shoesId = si.shoesId and s.shoesId = ss.shoesId ORDER BY shoesName ASC`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getProductsListShoesNameDesc(req, res) {
    db.query(
        `SELECT * FROM SHOES s, SHOES_IMAGE si, SHOES_SIZE ss WHERE s.shoesId = si.shoesId and s.shoesId = ss.shoesId ORDER BY shoesName DESC`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getProductsListPriceAsc(req, res) {
    db.query(
        `SELECT * FROM SHOES s, SHOES_IMAGE si, SHOES_SIZE ss WHERE s.shoesId = si.shoesId and s.shoesId = ss.shoesId ORDER BY price ASC`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getProductsListPriceDesc(req, res) {
    db.query(
        `SELECT * FROM SHOES s, SHOES_IMAGE si, SHOES_SIZE ss WHERE s.shoesId = si.shoesId and s.shoesId = ss.shoesId ORDER BY price DESC`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getProductByTradeMark(req, res) {
    const data = req.body;
    const trademark = data.trademark;
    db.query(
        `SELECT * FROM SHOES s, SHOES_IMAGE si, SHOES_SIZE ss, trademark tm WHERE s.shoesId = si.shoesId and s.shoesId = ss.shoesId and s.trademarkId = tm.trademarkId and trademarkName = '${trademark}'`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function searchProductByShoesName(req, res) {
    const data = req.body;
    const shoesName = data.shoesName;
    db.query(
        `SELECT * FROM SHOES s, SHOES_IMAGE si WHERE s.shoesId = si.shoesId AND s.shoesName Like '${shoesName}%'  `,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function updatePriceInfo(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    const price = data.price;

    db.query(`UPDATE SHOES SET price=${price} WHERE shoesId=${shoesId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function updateSaleInfo(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    const sale = data.sale;

    db.query(`UPDATE SHOES SET sale=${sale} WHERE shoesId=${shoesId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function updateDescInfo(req, res) {
    const data = req.body;
    const descriptionId = data.descriptionId;
    const desc = data.desc;

    db.query(`UPDATE DESCRIPTION_PRODUCT SET content='${desc}' WHERE descriptionId=${descriptionId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getTrademarkInfo(req, res) {
    db.query(`SELECT * FROM TRADEMARK `, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getAvailableQuantityDetailWithTrademark(req, res) {
    db.query(
        `SELECT DISTINCT s.trademarkId, sum(ss.quantity) AS sumQuantity FROM SHOES s, SHOES_SIZE ss, SIZE sz WHERE s.shoesId=ss.shoesId AND sz.sizeId=ss.sizeId GROUP BY s.trademarkId ORDER BY s.trademarkId ASC
    `,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getImportQuantityTotalDetailWithTrademark(req, res) {
    db.query(
        `SELECT DISTINCT s.trademarkId, sum(sid.importQuantity) AS importQuantityTotal FROM SHOES_IMPORT_DETAIL sid, SHOES s WHERE sid.shoesId = s.shoesId GROUP BY s.trademarkId ORDER BY s.trademarkId ASC`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getImportHistoryDetail(req, res) {
    db.query(`SELECT * FROM SHOES_IMPORT `, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getGrassInfo(req, res) {
    db.query(`SELECT * FROM GRASS `, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getPositionInfo(req, res) {
    db.query(`SELECT * FROM PLAY_POSITION `, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getSizeInfo(req, res) {
    db.query(`SELECT * FROM SIZE `, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getAvailableQuantityOfSizeInfo(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    db.query(`SELECT * FROM SHOES_SIZE WHERE shoesId = ${shoesId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getTypeInfo(req, res) {
    const { trademarkId } = req.query;
    db.query(`SELECT * FROM SHOES_TYPE WHERE trademarkId = '${trademarkId}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getTypeInfoByTrademark(req, res) {
    const { trademarkId } = req.query;
    db.query(`SELECT * FROM SHOES_TYPE WHERE trademarkId = '${trademarkId}'`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getNationalInfo(req, res) {
    db.query(`SELECT * FROM ORIGIN_NATIONAL`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getDescInfo(req, res) {
    db.query(`SELECT * FROM DESCRIPTION_PRODUCT`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function postCommentDetail(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    const userId = data.userId;
    const content = data.commentContent;

    const date = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '/' + mm + '/' + dd;
        return today;
    };

    db.query(
        `INSERT INTO COMMENT_PRODUCT (userId, shoesId, content, commentDate) VALUES (${userId}, ${shoesId}, '${content}', '${date()}')`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                if (result.affectedRows > 0) {
                    db.query(`SELECT * FROM COMMENT_PRODUCT WHERE shoesId=${shoesId}`, (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            res.send(result);
                        }
                    });
                }
            }
        },
    );
}

function getCommentList(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    db.query(`SELECT * FROM COMMENT_PRODUCT WHERE shoesId=${shoesId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function removeCommentDetail(req, res) {
    const data = req.body;
    const commentId = data.commentId;
    db.query(`DELETE FROM COMMENT_PRODUCT WHERE commentId=${commentId}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function getAllImageList(req, res) {
    db.query(`SELECT * FROM SHOES_IMAGE`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

function updateAvailableQuantityDetailAfterOrder(req, res) {
    const data = req.body;
    const shoesId = data.shoesId;
    const sizeId = data.chosedSize;
    const shoesQuantity = data.shoesQuantity;

    db.query(
        `UPDATE SHOES_SIZE SET quantity = quantity - ${shoesQuantity} WHERE shoesId=${shoesId} AND sizeId='${sizeId}'`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

const service = {
    getTrademarkInfo,
    getAvailableQuantityDetailWithTrademark,
    getImportQuantityTotalDetailWithTrademark,
    getImportHistoryDetail,
    getGrassInfo,
    getPositionInfo,
    getSizeInfo,
    getTypeInfo,
    getTypeInfoByTrademark,
    getNationalInfo,
    getDescInfo,
    getProductsList,
    getProductListDetail,
    getSaleProductsList,
    getImportIDInfo,
    postNewImport,
    postNewProduct,
    getShoesIDInfo,
    postImportDetailInfo,
    postFrontImageDetail,
    postMainImageDetail,
    postBackImageDetail,
    postImageDetail,
    postNewImportDetailAndSize,
    getDescriptionIDInfo,
    postDescriptionlIdInfo,
    getAvailableQuantityWithSizeInfo,
    getProductsWithSizeAndIdInfo,
    getSizeInfo,
    getAvailableQuantityOfSizeInfo,
    getProductByIdInfo,
    getProductsListShoesNameAsc,
    getProductsListShoesNameDesc,
    getProductsListPriceAsc,
    getProductsListPriceDesc,
    getProductByTradeMark,
    searchProductByShoesName,
    updatePriceInfo,
    updateSaleInfo,
    updateDescInfo,
    postCommentDetail,
    getCommentList,
    removeCommentDetail,
    getAllImageList,
    updateAvailableQuantityDetailAfterOrder,
};

export default service;
