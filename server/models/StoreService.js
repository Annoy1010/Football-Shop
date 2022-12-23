import db from '../store';

function updateStoreDetail(req, res) {
    const data = req.body;
    const storeId = data.storeId;
    const storeName = data.storeName;
    const provinceId = data.provinceId;
    const districtId = data.districtId;
    const wardId = data.wardId;
    const detailAddress = data.detailAddress;
    const facebook = data.facebook;
    const gmail = data.gmail;
    const zalo = data.zalo;
    const instagram = data.instagram;

    db.query(
        `UPDATE STORE SET storeName='${storeName}', provinceId='${provinceId}', districtId='${districtId}', wardId='${wardId}', detailAddress='${detailAddress}', facebookLink='${facebook}', gmailLink='${gmail}', zaloLink='${zalo}', instagramLink='${instagram}' WHERE storeId=${storeId}`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        },
    );
}

function getStoreInfo(req, res) {
    db.query(`SELECT * FROM STORE`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
}

const service = {
    updateStoreDetail,
    getStoreInfo,
};

export default service;
