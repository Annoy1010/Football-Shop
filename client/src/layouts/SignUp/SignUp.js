import classNames from 'classnames/bind';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import parsePhoneNumber from 'libphonenumber-js';

import styles from './SignUp.module.scss';
import notify from '../../components/ToastMessage';

const cx = classNames.bind(styles);

function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function SignUp() {
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);

    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [provinceId, setProvinceId] = useState(null);
    const [districtId, setDistrictId] = useState(null);
    const [wardId, setWardId] = useState(null);

    const [detailAddress, setDetailAddress] = useState('');

    useEffect(() => {
        axios
            .get('/province')
            .then((res) => setProvinceList(res.data))
            .catch((err) => console.log(err));
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

    const handleOnSubmit = () => {
        if (
            !username ||
            !password ||
            !fullname ||
            !email ||
            !phone ||
            !provinceId ||
            !districtId ||
            !wardId ||
            !detailAddress
        ) {
            notify('Vui l??ng ??i???n ?????y ????? th??ng tin', 'warn', 2000);
        } else {
            if (!isValidEmail(email)) {
                notify('Email kh??ng h???p l???', 'error', 2000);
            } else {
                if (!parsePhoneNumber(`+84${phone.slice(1, phone.length)}`, 'VN').isValid()) {
                    notify('S??? ??i???n tho???i kh??ng h???p l???', 'error', 2000);
                } else {
                    axios
                        .post('/user/login', {
                            username,
                            password,
                        })
                        .then((res) => {
                            if (res.data.length > 0) {
                                notify('T??n ????ng nh???p ???? t???n t???i', 'error', 2000);
                            } else {
                                axios
                                    .post('/user/signup', {
                                        username,
                                        password,
                                        fullname,
                                        email,
                                        phone,
                                    })
                                    .then((res) => {
                                        if (res.data.affectedRows > 0) {
                                            axios
                                                .get('/user/all')
                                                .then((res) => {
                                                    const userId = res.data[res.data.length - 1].userId;
                                                    axios
                                                        .post('/user/signup/address', {
                                                            userId,
                                                            provinceId,
                                                            districtId,
                                                            wardId,
                                                            detailAddress,
                                                        })
                                                        .then((res) => {
                                                            if (res.data.affectedRows > 0) {
                                                                axios
                                                                    .post('/user/signup/cart', {
                                                                        userId,
                                                                    })
                                                                    .then((res) => {
                                                                        if (res.data.affectedRows > 0) {
                                                                            notify(
                                                                                '????ng k?? t??i kho???n th??nh c??ng',
                                                                                'success',
                                                                                1500,
                                                                            );

                                                                            setTimeout(
                                                                                () => window.location.reload(),
                                                                                2000,
                                                                            );
                                                                        }
                                                                    })
                                                                    .catch((err) => console.log(err));
                                                            }
                                                        })
                                                        .catch((err) => console.log(err));
                                                })
                                                .catch((err) => console.log(err));
                                        }
                                    })
                                    .catch((err) => console.log(err));
                            }
                        })
                        .catch((err) => console.log(err));
                }
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <div className={cx('input-item')}>
                    <label htmlFor="username" className={cx('label-item')}>
                        T??n ????ng nh???p
                    </label>
                    <input
                        type="text"
                        id="username"
                        className={cx('input-area')}
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="password" className={cx('label-item')}>
                        M???t kh???u
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={cx('input-area')}
                        value={password}
                        onChange={(e) => setPassWord(e.target.value)}
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="fullname" className={cx('label-item')}>
                        H??? v?? t??n
                    </label>
                    <input
                        type="text"
                        id="fullname"
                        className={cx('input-area')}
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="email" className={cx('label-item')}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={cx('input-area')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="phone" className={cx('label-item')}>
                        S??? ??i???n tho???i
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className={cx('input-area')}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="province" className={cx('label-item')}>
                        T???nh
                    </label>
                    <select
                        className={cx('input-area')}
                        onChange={(e) => e.target.value !== 0 && setProvinceId(e.target.value)}
                    >
                        <option value="0">Ch???n T???nh/Th??nh ph???</option>
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
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="district" className={cx('label-item')}>
                        Huy???n
                    </label>
                    <select
                        id="district"
                        className={cx('input-area')}
                        value={districtId}
                        onChange={(e) => e.target.value !== 0 && setDistrictId(e.target.value)}
                    >
                        <option className={cx('option-value')} value="0" selected>
                            Ch???n Qu???n/Huy???n
                        </option>
                        {districtList.map((district) => (
                            <option
                                key={district.districtId}
                                className={cx('option-value')}
                                value={district.districtId}
                            >
                                {district.districtName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="ward" className={cx('label-item')}>
                        X??
                    </label>
                    <select
                        id="ward"
                        className={cx('input-area')}
                        value={wardId}
                        onChange={(e) => e.target.value !== 0 && setWardId(e.target.value)}
                    >
                        <option className={cx('option-value')} value="0" selected>
                            Ch???n Ph?????ng/X??
                        </option>
                        {wardList.map((ward) => (
                            <option key={ward.wardId} value={ward.wardId} className={cx('option-value')}>
                                {ward.wardName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="detail-address" className={cx('label-item')}>
                        ?????a ch??? chi ti???t
                    </label>
                    <input
                        type="text"
                        id="detail-address"
                        className={cx('input-area')}
                        onChange={(e) => setDetailAddress(e.target.value)}
                    />
                </div>
            </div>
            <button className={cx('submit-btn')} onClick={handleOnSubmit}>
                ????ng k??
            </button>
            <ToastContainer />
        </div>
    );
}

export default SignUp;
