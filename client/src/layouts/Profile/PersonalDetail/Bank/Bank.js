import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './Bank.module.scss';
import BankItem from './BankItem';
import NewBank from './NewBank';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const userIsExisted = user && Object.keys(user).length > 0;

function Bank() {
    const [addButtonClicked, setAddButtonClicked] = useState(false);
    const [bankList, setBankList] = useState([]);

    useEffect(() => {
        axios
            .post('/bank/user', {
                userId: userIsExisted && user.userId,
            })
            .then((res) => setBankList(res.data))
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Ngân hàng</h3>
            {bankList && bankList.length > 0 ? (
                bankList.map((bank, index) => <BankItem index={index} bank={bank} />)
            ) : (
                <h3>Chưa có liên kết tài khoản ngân hàng</h3>
            )}

            <button className={cx('add-bank-btn')} onClick={() => setAddButtonClicked(true)}>
                + Thêm thẻ mới
            </button>
            {addButtonClicked && <NewBank setAddButtonClicked={setAddButtonClicked} />}
        </div>
    );
}

export default Bank;
