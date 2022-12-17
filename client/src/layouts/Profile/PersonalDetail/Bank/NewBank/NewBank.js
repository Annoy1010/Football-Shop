import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './NewBank.module.scss';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const userIsExisted = user && Object.keys(user).length > 0;

function NewBank({ setAddButtonClicked }) {
    const [bankList, setBankList] = useState([]);
    const [bankId, setBankId] = useState(null);
    const [provinceList, setProvinceList] = useState([]);
    const [provinceId, setProvinceId] = useState(null);
    const [districtList, setDistrictList] = useState([]);
    const [districtId, setDistrictId] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [expriDate, setExpriDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [proprietorName, setProprietorName] = useState('');

    useEffect(() => {
        axios
            .get('/bank')
            .then((res) => setBankList(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/province')
            .then((res) => setProvinceList(res.data))
            .catch((err) => console.log(err));
    }, []);
    console.log(provinceList);
    useEffect(() => {
        if (provinceId !== null) {
            axios
                .get(`/district/province?provinceId=${provinceId}`)
                .then((res) => setDistrictList(res.data))
                .catch((err) => console.log(err));
        }
    }, [provinceId]);

    const handleSubmit = () => {
        if (
            !bankId ||
            !cardNumber ||
            !expriDate ||
            !cvv ||
            !proprietorName ||
            provinceId === '0' ||
            districtId === '0'
        ) {
            alert('Vui lòng nhập đầy đủ thông tin');
        } else {
            axios
                .post('/bank/card/default/existed', {
                    userId: userIsExisted && user.userId,
                })
                .then((res) => {
                    if (res.data.length > 0) {
                        axios
                            .post('/bank/card/new', {
                                bankId,
                                cardNumber,
                                expriDate,
                                cvv,
                                proprietorName,
                                provinceId,
                                districtId,
                                userId: userIsExisted && user.userId,
                                defaultBank: '0',
                            })
                            .then((res) => {
                                if (res.data.affectedRows > 0) {
                                    alert('Thêm tài khoản ngân hàng thành công');
                                    setAddButtonClicked(false);
                                    window.location.reload();
                                }
                            })
                            .catch((err) => console.log(err));
                    } else {
                        axios
                            .post('/bank/card/new', {
                                bankId,
                                cardNumber,
                                expriDate,
                                cvv,
                                proprietorName,
                                provinceId,
                                districtId,
                                userId: userIsExisted && user.userId,
                                defaultBank: '1',
                            })
                            .then((res) => {
                                if (res.data.affectedRows > 0) {
                                    alert('Thêm tài khoản ngân hàng thành công');
                                    setAddButtonClicked(false);
                                    window.location.reload();
                                }
                            })
                            .catch((err) => console.log(err));
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thêm thẻ</h3>
            <div className={cx('card-detail')}>
                <h3 className={cx('heading-card')}>
                    <span>Chi tiết thẻ</span>
                    <img src="https://cdn-icons-png.flaticon.com/512/5787/5787904.png" alt="" />
                </h3>
                <div className={cx('card-input')}>
                    <select
                        className={cx('card-input-item')}
                        onChange={(e) => e.target.value !== 0 && setBankId(e.target.value)}
                    >
                        <option values="0" className={cx('card-input-item')} selected>
                            Chọn Ngân hàng
                        </option>
                        {bankList.map((bank) => (
                            <option key={bank.bankId} value={bank.bankId} className={cx('option-value')}>
                                {bank.bankName}
                            </option>
                        ))}
                    </select>
                    <input
                        className={cx('card-input-item')}
                        placeholder="Số thẻ"
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <div className={cx('card-input-expiration')} placeholder="Ngày hết hạn">
                        <div className={cx('card-input-date-item')}>
                            <label>Ngày hết hạn</label>
                            <input
                                type="date"
                                className={cx('card-input-item')}
                                onChange={(e) => setExpriDate(e.target.value)}
                            />
                        </div>
                        <input
                            placeholder="CVV"
                            className={cx('card-input-item')}
                            maxlength="3"
                            onChange={(e) => setCVV(e.target.value)}
                        />
                    </div>
                    <input
                        className={cx('card-input-item')}
                        placeholder="Họ và tên chủ thẻ"
                        onChange={(e) => setProprietorName(e.target.value)}
                    />
                </div>
            </div>
            <div className={cx('address-register')}>
                <h3 className={cx('heading-address')}>Địa chỉ đăng ký</h3>
                <div className={cx('address-input')}>
                    <select
                        className={cx('address-input-item')}
                        onChange={(e) => e.target.value !== 0 && setProvinceId(e.target.value)}
                    >
                        <option value="0">Chọn Khu vực</option>
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
                    <select
                        className={cx('address-input-item')}
                        onChange={(e) => e.target.value !== 0 && setDistrictId(e.target.value)}
                    >
                        <option value="0">Chọn Chi nhánh</option>
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
                </div>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={handleSubmit}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={() => setAddButtonClicked(false)}>
                    Đóng
                </button>
            </div>
        </div>
    );
}

export default NewBank;
