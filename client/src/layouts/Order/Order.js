import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Order.module.scss';
import ViewOrderStatus from './ViewOrderStatus';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const userIsExisted = user && Object.keys(user).length > 0;

function Order() {
    const [userAddress, setUserAddress] = useState([]);
    const [orderOfUser, setOrderOfUser] = useState([]);

    const [order, setOrder] = useState({});

    const ship = 0;

    useEffect(() => {
        axios
            .post('/user/address', {
                userId: userIsExisted && user.userId,
            })
            .then((res) => {
                setUserAddress(res.data);
            })
            .catch((err) => console.error(err));
        axios
            .post('/user/order/all', {
                userId: userIsExisted && user.userId,
            })
            .then((res) => {
                setOrderOfUser(res.data);
            })
            .catch((err) => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Đơn hàng</h2>
            {orderOfUser &&
                orderOfUser.length > 0 &&
                orderOfUser.map((orderItem, index) => {
                    return (
                        <Container>
                            <Row className={cx('order')}>
                                <Col xs lg={12} xl={12} className={cx('order-product')}>
                                    <span className={cx('order-id')}>
                                        <b>Mã đơn hàng:</b> {orderItem.orderId}
                                    </span>
                                </Col>
                                <Col xs lg={12} xl={12} className={cx('order-user')}>
                                    <span className={cx('address-id')}>
                                        <b>Địa chỉ nhận hàng</b>
                                    </span>
                                    <div className={cx('user-info')}>
                                        <span className={cx('user-fullname')}>{userIsExisted && user.fullName}</span>
                                        <span className={cx('user-phone')}>{userIsExisted && user.phone}</span>
                                        <span
                                            className={cx('user-address')}
                                        >{`${userAddress[index].detailAddress}, ${userAddress[index].wardName}, ${userAddress[index].districtName}, ${userAddress[index].provinceName}`}</span>
                                    </div>
                                    <div className={cx('price')}>
                                        <div className={cx('order-price')}>
                                            <label>Tổng tiền hàng:</label>
                                            <span>
                                                {orderOfUser[index].totalCost.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </span>
                                        </div>
                                        <div className={cx('ship-price')}>
                                            <label>Phí vận chuyển:</label>
                                            <span>
                                                {ship.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </span>
                                        </div>
                                        <div className={cx('total-price')}>
                                            <label>Tổng số tiền:</label>
                                            <span>
                                                {(orderOfUser[index].totalCost + ship).toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <button className={cx('btn-view-order-status')} onClick={() => setOrder(orderItem)}>
                                        Xem trạng thái đơn hàng
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    );
                })}
            {Object.keys(order).length > 0 && <ViewOrderStatus setOrder={setOrder} order={order} />}
        </div>
    );
}

export default Order;
