import classNames from 'classnames/bind';
import axios from 'axios';
import { useState, useEffect } from 'react';

import styles from './SignUp.module.scss';

const cx = classNames.bind(styles);

function SignUp() {
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);
    useEffect(() => {
        axios
            .get('/province')
            .then((res) => setProvinceList(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleOnChangeProvince = (e) => {
        provinceList.forEach((province) => {
            if (province.provinceName === e.target.value) {
                axios
                    .get(`/district/province?provinceId=${province.provinceId}`)
                    .then((res) => setDistrictList(res.data))
                    .catch((err) => console.log(err));
            }
        });
    };

    const handleOnChangeDistrict = (e) => {
        districtList.forEach((district) => {
            if (district.districtName === e.target.value) {
                axios
                    .get(`/ward/district?districtId=${district.districtId}`)
                    .then((res) => setWardList(res.data))
                    .catch((err) => console.log(err));
            }
        });
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')} method="POST">
                <div className={cx('input-item')}>
                    <label htmlFor="username" className={cx('label-item')}>
                        Tên đăng nhập
                    </label>
                    <input type="text" id="username" className={cx('input-area')} required />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="password" className={cx('label-item')}>
                        Mật khẩu
                    </label>
                    <input type="password" id="password" className={cx('input-area')} required />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="fullname" className={cx('label-item')}>
                        Họ và tên
                    </label>
                    <input type="text" id="fullname" className={cx('input-area')} required />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="email" className={cx('label-item')}>
                        Email
                    </label>
                    <input type="email" id="email" className={cx('input-area')} required />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="phone" className={cx('label-item')}>
                        Số điện thoại
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className={cx('input-area')}
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        required
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="province" className={cx('label-item')}>
                        Tỉnh
                    </label>
                    <select
                        id="province"
                        className={cx('input-area')}
                        required
                        onChange={(e) => handleOnChangeProvince(e)}
                    >
                        <option className={cx('option-value')} selected>
                            Chọn Tỉnh/Thành phố
                        </option>
                        {provinceList.map((province) => (
                            <option key={province.provinceId} className={cx('option-value')}>
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
                        required
                        onChange={(e) => handleOnChangeDistrict(e)}
                    >
                        <option className={cx('option-value')} selected>
                            Chọn Quận/Huyện
                        </option>
                        {districtList.map((district) => (
                            <option key={district.districtId} className={cx('option-value')}>
                                {district.districtName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="ward" className={cx('label-item')}>
                        Xã
                    </label>
                    <select id="ward" className={cx('input-area')} required>
                        <option className={cx('option-value')} selected>
                            Chọn Phường/Xã
                        </option>
                        {wardList.map((ward) => (
                            <option key={ward.districtId} className={cx('option-value')}>
                                {ward.wardName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="detail-address" className={cx('label-item')}>
                        Địa chỉ chi tiết
                    </label>
                    <input type="text" id="detail-address" className={cx('input-area')} required />
                </div>
            </form>
            <button className={cx('submit-btn')}>Đăng ký</button>
        </div>
    );
}

export default SignUp;
