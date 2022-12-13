import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './Address.module.scss';
import AddressItem from './AddressItem';
import NewAddress from './NewAddress';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));

function Address() {
    const [addressDetail, setAddressDetail] = useState([]);
    const [provinceName, setProvinceName] = useState('');
    const [addButtonClicked, setAddButtonClicked] = useState(false);

    useEffect(() => {
        if (user.roleAccess.data[0] === 0) {
            axios
                .post('/user/address', {
                    userId: user.userId,
                })
                .then((res) => {
                    setAddressDetail(res.data);
                })
                .catch((err) => console.error(err));
        } else {
            axios
                .post('/user/address/province', {
                    provinceId: user.provinceId,
                })
                .then((res) => {
                    setProvinceName(res.data[0].provinceName);
                })
                .catch((err) => console.error(err));
        }
    }, []);
    console.log(addressDetail);
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Địa chỉ</h3>
            {user.roleAccess.data[0] === 0 ? (
                addressDetail &&
                addressDetail.length > 0 &&
                addressDetail.map((item, index) => {
                    return (
                        <AddressItem
                            index={index}
                            user={user}
                            addressDetail={item.detailAddress}
                            ward={item.wardName}
                            district={item.districtName}
                            province={item.provinceName}
                            defaultAddress={item.defaultAddress.data[0]}
                        />
                    );
                })
            ) : (
                <AddressItem
                    index={1}
                    user={user}
                    addressDetail={''}
                    ward={''}
                    district={''}
                    province={provinceName}
                    defaultAddress={''}
                />
            )}

            {user.roleAccess.data[0] === 0 && (
                <button className={cx('add-address-btn')} onClick={() => setAddButtonClicked(true)}>
                    + Thêm địa chỉ mới
                </button>
            )}

            {addButtonClicked && <NewAddress setAddButtonClicked={setAddButtonClicked} />}
        </div>
    );
}

export default Address;
