import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios'
import styles from './AddressItem.module.scss';
import user from '../../../../../localStorage';

const cx = classNames.bind(styles);

function AddressItem({ address }) {
    const [provincename, setProvinceName] = useState('');
    const [districtname, setDistrictName] = useState('');
    const [wardname, setWardName] = useState('');

    const [userid, setUserId] = useState(address.userId);
    const [provinceid, setProvinceId] = useState(address.provinceId);
    const [statusaddress, setStatusAddress] = useState(address.statusAddress.data[0])

    useEffect(() => {
        if (address.provinceId) {
            axios
                .post('/province/provincename', {
                    provinceid: address.provinceId,
                })
                .then((res) => setProvinceName(res.data[0].provinceName))
                .catch((err) => console.log(err));
        }
    }, [address.provinceId]);

    useEffect(() => {
        if (address.districtid) {
            axios
                .post('/district/districtname', {
                    districtid: address.districtid,
                })
                .then((res) => setDistrictName(res.data[0].districtName))
                .catch((err) => console.log(err));
        }
    }, [address.districtid]);

    useEffect(() => {
        if (address.wardId) {
            axios
                .post('/ward/wardname', {
                    wardid: address.wardId,
                })
                .then((res) => setWardName(res.data[0].wardName))
                .catch((err) => console.log(err));
        }
    }, [address.wardId]);
    const handleOnChangeDeliveryAddress = (e) => {
        axios.post('/user/address/delivery', {
            userid,
            provinceid,
        })
        .then((res) => {
            if (res.data.affectedRows > 0) {
                alert('thay đổi địa chỉ nhận hàng thành công');
                window.location.reload(false);
            }
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('personal-info')}>
                <span className={cx('personal-name')}>{user.fullName}</span>
                <span className={cx('personal-phone')}>{user.phone}</span>
            </div>
            <div className={cx('address-detail')}>
                <span>{`${address.detail_address}, ${wardname}`}</span>
            </div>
            <div className={cx('address-detail')}>
                <span>{`${districtname}, ${provincename}`}</span>
            </div>
            {statusaddress === 1 ? <span className={cx('address-default')}>Mặc định</span> : <></>}
            <div>
                <input type = "radio" value = "address" checked = {statusaddress} onChange = {(e) => handleOnChangeDeliveryAddress(e)} ></input>
            </div>
        </div>
    );
}

AddressItem.prototype = {
    defaultItem: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};

export default AddressItem;
