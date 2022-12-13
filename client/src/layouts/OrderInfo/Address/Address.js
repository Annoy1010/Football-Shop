import classNames from 'classnames/bind';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Address.module.scss';
import ChangeAddress from './ChangeAddress';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const userIsExisted = user && Object.keys(user).length > 0;

function Address({ userId, setAddressId, userAddress, addressId }) {
    const [changeButtonClicked, setChangeButtonClicked] = useState(false);
    const defaultAddress = userAddress.filter((item) => item.addressId === addressId)[0];

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
                        <span>{defaultAddress.detailAddress}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Tỉnh thành</label>
                        <span>{defaultAddress.provinceName}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Quận huyện</label>
                        <span>{defaultAddress.districtName}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Xã phường</label>
                        <span>{defaultAddress.wardName}</span>
                    </Col>
                </Row>
            </Container>
            <button className={cx('btn-change-address')} onClick={() => setChangeButtonClicked(true)}>
                Thay đổi địa chỉ
            </button>
            {changeButtonClicked && (
                <ChangeAddress
                    setChangeButtonClicked={setChangeButtonClicked}
                    setAddressId={setAddressId}
                    userAddress={userAddress}
                    addressId={addressId}
                    userId={userId}
                />
            )}
        </div>
    );
}

export default Address;
