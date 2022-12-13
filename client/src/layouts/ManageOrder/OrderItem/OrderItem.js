import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './OrderItem.module.scss';
const cx = classNames.bind(styles);

function OrderItem({ order, index }) {
    const [name, setName] = useState('');

    useEffect(() => {
        axios
            .post('/user/userInfo', {
                userId: order.userId,
            })
            .then((res) => setName(res.data[0].fullName))
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (type) => {
        switch (type) {
            case 'submit':
                axios
                    .post('/order/submit/active', {
                        orderId: order.orderId,
                    })
                    .then((res) => {
                        if (res.data.affectedRows > 0) {
                            alert('Đơn hàng đã được xác nhận thành công');
                            window.location.reload();
                        }
                    })
                    .catch((err) => console.log(err));
                break;
            case 'ship':
                axios
                    .post('/order/ship/active', {
                        orderId: order.orderId,
                    })
                    .then((res) => {
                        if (res.data.affectedRows > 0) {
                            alert('Đơn hàng đã được xác nhận vận chuyển');
                            window.location.reload();
                        }
                    })
                    .catch((err) => console.log(err));
                break;
            case 'pay':
                axios
                    .post('/order/pay/active', {
                        orderId: order.orderId,
                    })
                    .then((res) => {
                        if (res.data.affectedRows > 0) {
                            alert('Đơn hàng đã được xác nhận thanh toán');
                            window.location.reload();
                        }
                    })
                    .catch((err) => console.log(err));
                break;
            default:
                break;
        }
    };

    return (
        <Container key={index} className={cx('wrapper')}>
            <Row>
                <Col xl lg className={cx('header-data')}>
                    <span className={cx('header-item')}>{order.orderId}</span>
                </Col>
                <Col xl lg className={cx('header-data')}>
                    <span className={cx('header-item')}>{order.userId}</span>
                </Col>
                <Col xl lg className={cx('header-data')}>
                    <span className={cx('header-item')}>{name}</span>
                </Col>
                <Col xl lg className={cx('header-data')}>
                    <span className={cx('header-item')}>
                        {order.totalCost.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </span>
                </Col>
                <Col xl lg className={cx('header-data')}>
                    {order.submitStatus.data[0] === 1 ? (
                        <span className={cx('header-item', 'active')}>Đã xác nhận</span>
                    ) : (
                        <button className={cx('btn-submit')} onClick={() => handleSubmit('submit')}>
                            Xác nhận
                        </button>
                    )}
                </Col>
                <Col xl lg className={cx('header-data')}>
                    {order.shipStatus.data[0] === 1 ? (
                        <span className={cx('header-item', 'active')}>Đã vận chuyển</span>
                    ) : (
                        <button className={cx('btn-submit')} onClick={() => handleSubmit('ship')}>
                            Xác nhận
                        </button>
                    )}
                </Col>
                <Col xl lg className={cx('header-data')}>
                    {order.paymentStatus.data[0] === 1 ? (
                        <span className={cx('header-item', 'active')}>Đã thanh toán</span>
                    ) : (
                        <button className={cx('btn-submit')} onClick={() => handleSubmit('pay')}>
                            Xác nhận
                        </button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default OrderItem;
