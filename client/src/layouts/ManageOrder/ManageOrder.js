import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './ManageOrder.module.scss';
import OrderItem from './OrderItem';
import LoadingSpinner from '../../components/LoadingSpinner';

const cx = classNames.bind(styles);

function ManageOrder() {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        axios
            .get('/order')
            .then((res) => setOrderList(res.data))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>DANH SÁCH ĐƠN HÀNG</h3>
            <Container className={cx('header-wrapper')}>
                <Row className={cx('header-row')}>
                    <Col xl lg className={cx('header-data')}>
                        <span className={cx('header-item')}>Mã đơn hàng</span>
                    </Col>
                    <Col xl lg className={cx('header-data')}>
                        <span className={cx('header-item')}>Mã khách hàng</span>
                    </Col>
                    <Col xl lg className={cx('header-data')}>
                        <span className={cx('header-item')}>Tên khách hàng</span>
                    </Col>
                    <Col xl lg className={cx('header-data')}>
                        <span className={cx('header-item')}>Tổng tiền</span>
                    </Col>
                    <Col xl lg className={cx('header-data')}>
                        <span className={cx('header-item')}>Trạng thái xác nhận</span>
                    </Col>
                    <Col xl lg className={cx('header-data')}>
                        <span className={cx('header-item')}>Trạng thái vận chuyển</span>
                    </Col>
                    <Col xl lg className={cx('header-data')}>
                        <span className={cx('header-item')}>Trạng thái thanh toán</span>
                    </Col>
                </Row>
                {orderList &&
                    orderList.length > 0 &&
                    orderList.map((order, index) => <OrderItem order={order} index={index} />)}
            </Container>
        </div>
    );
}

export default ManageOrder;
