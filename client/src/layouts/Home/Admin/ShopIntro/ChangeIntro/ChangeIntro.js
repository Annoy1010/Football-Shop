import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import parsePhoneNumber from 'libphonenumber-js';
import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import styles from './ChangeIntro.module.scss';
import notify from '../../../../../components/ToastMessage';

const cx = classNames.bind(styles);

function ChangeIntro({ store, setShowChangeShop }) {
    const [provinceList, setProvinceList] = useState([]);
    const [provinceId, setProvinceId] = useState(null);

    const [districtList, setDistrictList] = useState([]);
    const [districtId, setDistrictId] = useState(null);

    const [wardList, setWardList] = useState([]);
    const [wardId, setWardId] = useState(null);

    const [storeName, setStoreName] = useState(store.storeName);
    const [detailAddress, setDetailAddress] = useState(store.detailAddress || '');
    const [phone, setPhone] = useState(store.phone);
    const [facebook, setFacebook] = useState(store.facebookLink);
    const [zalo, setZalo] = useState(store.zaloLink);
    const [twitter, setTwitter] = useState(store.twitterLink);
    const [instagram, setInstagram] = useState(store.instagramLink);
    useEffect(() => {
        axios
            .get('/province')
            .then((res) => setProvinceList(res.data))
            .catch((err) => console.log(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (provinceId !== null) {
            axios
                .get(`/district/province?provinceId=${provinceId}`)
                .then((res) => setDistrictList(res.data))
                .catch((err) => console.log(err));
        }
    }, [provinceId]);

    useEffect(() => {
        if (districtId !== null) {
            axios
                .get(`/ward/district?districtId=${districtId}`)
                .then((res) => setWardList(res.data))
                .catch((err) => console.log(err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [districtId]);

    const handeSubmit = () => {
        if (
            provinceId === null ||
            districtId === null ||
            wardId === null ||
            storeName === '' ||
            detailAddress === '' ||
            facebook === '' ||
            zalo === '' ||
            twitter === '' ||
            instagram === ''
        ) {
            notify('Vui lòng điền đầy đủ thông tin', 'warn', 2000);
        } else {
            if (!parsePhoneNumber(`+84${phone.slice(1, phone.length)}`, 'VN').isValid()) {
                notify('Số điện thoại không hợp lệ', 'error', 2000);
            } else {
                axios
                    .post('/store/update', {
                        storeId: store.storeId,
                        storeName,
                        provinceId,
                        districtId,
                        wardId,
                        detailAddress,
                        facebook,
                        zalo,
                        twitter,
                        instagram,
                    })
                    .then(
                        (res) =>
                            res.data.affectedRows > 0 &&
                            notify('Cập nhật thông tin cửa hàng thành công', 'success', 2000) &&
                            setTimeout(() => window.location.reload, 2100),
                    )
                    .catch((err) => console.log(err));
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thông tin cửa hàng</h3>
            <div className={cx('shop-detail')}>
                <h3 className={cx('heading-shop')}>
                    <span>Chi tiết</span>
                </h3>
            </div>
            <Container>
                <Row>
                    <Col sm={12} xl={6} lg={6}>
                        <input
                            className={cx('shop-input-item')}
                            value={'Mã cửa hàng: ' + store.storeId}
                            placeholder="Mã cửa hàng"
                            readOnly={true}
                        />
                    </Col>
                    <Col sm={12} xl={6} lg={6}>
                        <input
                            className={cx('shop-input-item')}
                            value={storeName}
                            placeholder="Tên cửa hàng"
                            onChange={(e) => setStoreName(e.target.value)}
                        />
                    </Col>
                    <Col sm={12} xl={6} lg={6}>
                        <select
                            className={cx('shop-input-item')}
                            onChange={(e) => e.target.value !== 0 && setProvinceId(e.target.value)}
                        >
                            <option value="0">Chọn Tỉnh/Thành phố</option>
                            {provinceList.map((province) => (
                                <option
                                    key={province.provinceId}
                                    value={province.provinceId}
                                    className={cx('option-value')}
                                >
                                    {province.provinceName}
                                </option>
                            ))}
                        </select>
                    </Col>
                    <Col sm={12} xl={6} lg={6}>
                        <select
                            className={cx('shop-input-item')}
                            onChange={(e) => e.target.value !== 0 && setDistrictId(e.target.value)}
                        >
                            <option value="0">Chọn Quận/Huyện</option>
                            {districtList.map((district) => (
                                <option
                                    key={district.districtId}
                                    value={district.districtId}
                                    className={cx('option-value')}
                                >
                                    {district.districtName}
                                </option>
                            ))}
                        </select>
                    </Col>
                    <Col sm={12} xl={6} lg={6}>
                        <select
                            className={cx('shop-input-item')}
                            onChange={(e) => e.target.value !== 0 && setWardId(e.target.value)}
                        >
                            <option value="0">Chọn Xã/Phường</option>
                            {wardList.map((ward) => (
                                <option key={ward.wardId} value={ward.wardId} className={cx('option-value')}>
                                    {ward.wardName}
                                </option>
                            ))}
                        </select>
                    </Col>
                    <Col sm={12} xl={6} lg={6}>
                        <input
                            className={cx('shop-input-item')}
                            value={detailAddress}
                            placeholder="Địa chỉ cụ thể"
                            onChange={(e) => setDetailAddress(e.target.value)}
                        />
                    </Col>
                    <Col sm={12} xl={6} lg={6}>
                        <input
                            className={cx('shop-input-item')}
                            value={phone}
                            placeholder="Số điện thoại"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Col>
                    <Col sm={12} xl={6} lg={6}>
                        <input
                            className={cx('shop-input-item')}
                            value={facebook}
                            placeholder="Facebook"
                            onChange={(e) => setFacebook(e.target.value)}
                        />
                    </Col>
                    <Col sm={12} xl={6} lg={6}>
                        <input
                            className={cx('shop-input-item')}
                            value={twitter}
                            placeholder="Twitter"
                            onChange={(e) => setTwitter(e.target.value)}
                        />
                    </Col>
                    <Col sm={12} xl={6} lg={6}>
                        <input
                            className={cx('shop-input-item')}
                            value={instagram}
                            placeholder="Instagram"
                            onChange={(e) => setInstagram(e.target.value)}
                        />
                    </Col>
                    <Col sm={12} xl={6} lg={6}>
                        <input
                            className={cx('shop-input-item')}
                            value={zalo}
                            placeholder="Zalo"
                            onChange={(e) => setZalo(e.target.value)}
                        />
                    </Col>
                </Row>
            </Container>
            <div className={cx('shop-input')}></div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={handeSubmit}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={() => setShowChangeShop(false)}>
                    Đóng
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ChangeIntro;
