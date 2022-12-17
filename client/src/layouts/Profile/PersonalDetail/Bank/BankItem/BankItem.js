import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import styles from './BankItem.module.scss';
import notify from '../../../../../components/ToastMessage';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const userIsExisted = user && Object.keys(user).length > 0;

function BankItem({ index, bank }) {
    const [bankName, setBankName] = useState('');
    const [provinceName, setProvinceName] = useState('');
    const [districtName, setDistrictName] = useState('');

    const handleChangeDefaultBank = () => {
        axios
            .post('/user/bank/default', {
                userId: bank.userId,
                cardId: bank.cardId,
            })
            .then((res) => {
                if (res.data.affectedRows > 0) {
                    notify('Cập nhật ngân hàng mặc định thành công', 'success', 1000)
                    setTimeout(() => {window.location.reload()}, 1100)
                    
                }
            });
    };

    useEffect(() => {
        axios
            .post('/bank/name', {
                bankId: bank.bankId.toString(),
            })
            .then((res) => setBankName(res.data[0].bankName))
            .catch((err) => console.log(err));
        axios
            .post('/province/name', {
                provinceId: bank.provinceId,
            })
            .then((res) => setProvinceName(res.data[0].provinceName))
            .catch((err) => console.log(err));
        axios
            .post('/district/name', {
                districtId: bank.districtId,
            })
            .then((res) => setDistrictName(res.data[0].districtName))
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div key={index} className={cx('wrapper')}>
            <div className={cx('bank-img')}>
                <img src="https://cdn-icons-png.flaticon.com/512/195/195488.png" alt="" />
            </div>
            <div className={cx('bank-info')}>
                <div className={cx('bank-name')}>{bankName}</div>
                <div className={cx('bank-owner')}>
                    <b>Họ và tên: </b>
                    {bank.proprietorName}
                </div>
                <div className={cx('bank-area')}>
                    <span className={cx('bank-area-name')}>
                        <b>Khu vực: </b>
                        {provinceName}
                    </span>
                    <span className={cx('bank-area-branch')}>
                        <b>Chi nhánh: </b>
                        {districtName}
                    </span>
                </div>
            </div>
            {bank.defaultBank.data[0] === 1 ? <span className={cx('bank-default')}>Mặc định</span> : <></>}
            {userIsExisted && user.roleAccess.data[0] === 0 && bank.defaultBank.data[0] === 0 && (
                <button className={cx('btn-set-bank-default')} onClick={handleChangeDefaultBank}>
                    Cài mặc định
                </button>
            )}
            <ToastContainer />
        </div>
    );
}

BankItem.prototype = {
    defaultItem: PropTypes.bool,
};

export default BankItem;
