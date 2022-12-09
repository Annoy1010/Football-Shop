import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './Address.module.scss';
import AddressItem from './AddressItem';
import NewAddress from './NewAddress';
import user from '../../../../localStorage';

const cx = classNames.bind(styles);

function Address() {
    const [addButtonClicked, setAddButtonClicked] = useState(false);

    const userId = user.userId;
    const [addresslist, setAddressList] = useState([]);
    useEffect(() => {
        if (userId) {
            axios
                .post('/user/address/list', {
                    userId: userId,
                })
                .then((res) => setAddressList(res.data))
                .catch((err) => console.log(err));
        }
    }, [userId]);
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Địa chỉ</h3>
            {addresslist.map((address, index) => (
                <AddressItem address={address} />
            ))}
            <button className={cx('add-address-btn')} onClick={() => setAddButtonClicked(true)}>
                + Thêm địa chỉ mới
            </button>
            {addButtonClicked && <NewAddress onClick={() => setAddButtonClicked(false)} />}
        </div>
    );
}

export default Address;
