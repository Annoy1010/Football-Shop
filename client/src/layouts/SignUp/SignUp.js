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
            notify('Vui lòng điền đầy đủ thông tin', 'warn', 2000);
        } else {
            if (!isValidEmail(email)) {
                notify('Email không hợp lệ', 'error', 2000);
            } else {
                if (!parsePhoneNumber(`+84${phone.slice(1, phone.length)}`, 'VN').isValid()) {
                    notify('Số điện thoại không hợp lệ', 'error', 2000);
                } else {
                    axios
                        .post('/user/login', {
                            username,
                            password,
                        })
                        .then((res) => {
                            if (res.data.length > 0) {
                                notify('Tên đăng nhập đã tồn tại', 'error', 2000);
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
                                                                                'Đăng ký tài khoản thành công',
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
                        Tên đăng nhập
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
                        Mật khẩu
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
                        Họ và tên
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
                        Số điện thoại
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
                        Tỉnh
                    </label>
                    <select
                        className={cx('input-area')}
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
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="district" className={cx('label-item')}>
                        Huyện
                    </label>
                    <select
                        id="district"
                        className={cx('input-area')}
                        value={districtId}
                        onChange={(e) => e.target.value !== 0 && setDistrictId(e.target.value)}
                    >
                        <option className={cx('option-value')} value="0" selected>
                            Chọn Quận/Huyện
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
                        Xã
                    </label>
                    <select
                        id="ward"
                        className={cx('input-area')}
                        value={wardId}
                        onChange={(e) => e.target.value !== 0 && setWardId(e.target.value)}
                    >
                        <option className={cx('option-value')} value="0" selected>
                            Chọn Phường/Xã
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
                        Địa chỉ chi tiết
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
                Đăng ký
            </button>
            <ToastContainer />
        </div>
    );
}

export default SignUp;
