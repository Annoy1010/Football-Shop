import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './ShopIntro.module.scss';
import ChangeIntro from './ChangeIntro';

const cx = classNames.bind(styles);

function ShopIntro() {
    const [store, setStore] = useState({});
    const [showChangeShop, setShowChangeShop] = useState(false);
    const [provinceName, setProvinceName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [wardName, setWardName] = useState('');

    useEffect(() => {
        axios
            .get('/store')
            .then((res) => setStore(res.data[0]))
            .catch((err) => console.log(err));
        axios
            .post('/province/name', {
                provinceId: store.provinceId,
            })
            .then((res) => setProvinceName(res.data[0].provinceName))
            .catch((err) => console.log(err));
        axios
            .post('/district/name', {
                districtId: store.districtId,
            })
            .then((res) => setDistrictName(res.data[0].districtName))
            .catch((err) => console.log(err));
        axios
            .post('/ward/name', {
                wardId: store.wardId,
            })
            .then((res) => setWardName(res.data[0].wardName))
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('shop-img')}>
                <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/shop-icon.png" alt="" />
            </div>
            <div className={cx('shop-desc')}>
                <h1 className={cx('shop-heading')}>Thông tin về cửa hàng</h1>
                <div className={cx('info-item')}>
                    <span className={cx('item-title')}>
                        <b>Mã cửa hàng:</b>
                    </span>
                    <span className={cx('item-content')}>{Object.keys(store).length > 0 && store.storeId}</span>
                </div>
                <div className={cx('info-item')}>
                    <span className={cx('item-title')}>
                        <b>Tên cửa hàng:</b>
                    </span>
                    <span className={cx('item-content')}>{Object.keys(store).length > 0 && store.storeName}</span>
                </div>
                <div className={cx('info-item')}>
                    <span className={cx('item-title')}>
                        <b>Địa chỉ:</b>
                    </span>
                    <span className={cx('item-content')}>
                        {Object.keys(store).length > 0 &&
                            wardName &&
                            districtName &&
                            provinceName &&
                            `${store.detailAddress}, ${wardName}, ${districtName}, ${provinceName}`}
                    </span>
                </div>
                <div className={cx('info-item')}>
                    <span className={cx('item-title')}>
                        <b>Hotline: </b>
                    </span>
                    <span className={cx('item-content')}>{store.phone}</span>
                </div>
                <div className={cx('info-item')}>
                    <span className={cx('item-title')}>
                        <b>Facebook: </b>
                    </span>
                    <span className={cx('item-content')}>{store.facebookLink}</span>
                </div>
                <div className={cx('info-item')}>
                    <span className={cx('item-title')}>
                        <b>Twitter: </b>
                    </span>
                    <span className={cx('item-content')}>{store.twitterLink}</span>
                </div>
                <div className={cx('info-item')}>
                    <span className={cx('item-title')}>
                        <b>Instagram: </b>
                    </span>
                    <span className={cx('item-content')}>{store.instagramLink}</span>
                </div>
                <div className={cx('info-item')}>
                    <span className={cx('item-title')}>
                        <b>Zalo: </b>
                    </span>
                    <span className={cx('item-content')}>{store.zaloLink}</span>
                </div>
                <button className={cx('btn-change')} onClick={() => setShowChangeShop(true)}>
                    Chỉnh sửa
                </button>
            </div>
            {showChangeShop && Object.keys(store) && (
                <ChangeIntro store={store} setShowChangeShop={setShowChangeShop} />
            )}
        </div>
    );
}

export default ShopIntro;
