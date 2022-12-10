import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Address.module.scss';

const cx = classNames.bind(styles);
const user = JSON.parse(localStorage.getItem('user'));
const userIsExisted = user && Object.keys(user).length > 0;

function Address({ userId }) {
    const [userAddress, setUserAddress] = useState({});
    const [addressId, setAddressId] = useState('');

    useEffect(() => {
        axios
            .post('/user/address', {
                userId,
            })
            .then((res) => {
                setUserAddress(res.data[0]);
            })
            .catch((err) => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (Object.keys(userAddress).length > 0) {
            setAddressId(userAddress.addressId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress]);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thông tin nhận hàng</h3>
            <Container className={cx('order-info')}>
                <Row>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Họ và tên</label>
                        <span>{userIsExisted && user.fullName}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Số điện thoại</label>
                        <span>{userIsExisted && user.phone}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Email</label>
                        <span>{userIsExisted && user.email}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Địa chỉ</label>
                        <span>{Object.keys(userAddress).length > 0 && userAddress.detailAddress}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Tỉnh thành</label>
                        <span>{Object.keys(userAddress).length > 0 && userAddress.provinceName}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Quận huyện</label>
                        <span>{Object.keys(userAddress).length > 0 && userAddress.districtName}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Xã phường</label>
                        <span>{Object.keys(userAddress).length > 0 && userAddress.wardName}</span>
                    </Col>
                </Row>
            </Container>
            <button className={cx('btn-change-address')}>Thay đổi địa chỉ</button>
        </div>
    );
}

export default Address;
