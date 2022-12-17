import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import styles from './NewAddress.module.scss';
import notify from '../../../../../components/ToastMessage';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));

function NewAddress({ setAddButtonClicked }) {
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [provinceId, setProvinceId] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [wardId, setWardId] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    useEffect(() => {
        axios
            .get('/province')
            .then((res) => setProvinceList(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleOnChangeProvince = (e) => {
        provinceList.forEach((province) => {
            if (province.provinceName === e.target.value) {
                setProvinceId(province.provinceId);
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
                setDistrictId(district.districtId);
                axios
                    .get(`/ward/district?districtId=${district.districtId}`)
                    .then((res) => setWardList(res.data))
                    .catch((err) => console.log(err));
            }
        });
    };

    const handleAddNewAddress = () => {
        if (detailAddress === '') {
            notify('Vui lòng nhập địa chỉ chi tiết', 'warn', 2000);
        } else {
            console.log(`Tỉnh: ${provinceId}, Huyện: ${districtId}, Xã: ${wardId}, Chi tiết: ${detailAddress}`);
            axios
                .post('/user/address/new', {
                    provinceId,
                    districtId,
                    wardId,
                    detailAddress,
                    userId: user.userId,
                })
                .then((res) => {
                    if (res.data.affectedRows > 0) {
                        notify('Thêm địa chỉ mới thành công', 'success', 2000);
                        setAddButtonClicked(false);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thêm địa chỉ</h3>

            <div className={cx('address-register')}>
                <h3 className={cx('heading-address')}>Chi tiết địa chỉ</h3>
                <div className={cx('address-input')}>
                    <select
                        id="province"
                        className={cx('address-input-item')}
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
                    <select
                        id="district"
                        className={cx('address-input-item')}
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
                    <select
                        id="ward"
                        className={cx('address-input-item')}
                        required
                        onChange={(e) => setWardId(e.target.value)}
                    >
                        <option className={cx('option-value')} selected>
                            Chọn Phường/Xã
                        </option>
                        {wardList.map((ward) => (
                            <option key={ward.wardId} value={ward.wardId} className={cx('option-value')}>
                                {ward.wardName}
                            </option>
                        ))}
                    </select>
                    <input
                        className={cx('address-input-item')}
                        value={detailAddress}
                        placeholder="Địa chỉ chi tiết"
                        onChange={(e) => setDetailAddress(e.target.value)}
                    />
                </div>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={handleAddNewAddress}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={() => setAddButtonClicked(false)}>
                    Đóng
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default NewAddress;
