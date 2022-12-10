import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Order.module.scss';
import OrderItem from './OrderItem';
import user from '../../user';
import data from '../../hardData';

const cx = classNames.bind(styles);

function Order() {
    const location = useLocation();
    const { productList } = location.state;
    console.log(productList);
    const ordersOfUser = data.order.filter(
        (orderItem, index) => orderItem.userId === user && !orderItem.receivedStatus && <OrderItem index={index} />,
    );

    const currentUser = data.user.filter((userItem) => userItem.id === user)[0];
    const currentAddress = currentUser.address;

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Đơn hàng</h2>
            <Container>
                {ordersOfUser.map((orderItem) => {
                    var total = 0;
                    return (
                        <Row className={cx('order')}>
                            <Col xs lg={4} xl={5} className={cx('order-product')}>
                                <span className={cx('order-id')}>
                                    <b>Mã đơn hàng:</b> {orderItem.orderId}
                                </span>
                                <div className={cx('product-list')}>
                                    {orderItem.products.map((product, index) => {
                                        total +=
                                            product.quantity *
                                            data.products.filter((pro) => pro.id === product.productId)[0].price;
                                        return <OrderItem product={product} index={index} />;
                                    })}
                                </div>
                            </Col>
                            <Col xs lg={8} xl={7} className={cx('order-user')}>
                                <span className={cx('address-id')}>
                                    <b>Địa chỉ nhận hàng</b>
                                </span>
                                <div className={cx('user-info')}>
                                    <span className={cx('user-fullname')}>{currentUser.name}</span>
                                    <span className={cx('user-phone')}>{currentUser.phone}</span>
                                    <span
                                        className={cx('user-address')}
                                    >{`${currentAddress.street}, ${currentAddress.ward}, ${currentAddress.district}, ${currentAddress.province}`}</span>
                                </div>
                                <div className={cx('price')}>
                                    <div className={cx('order-price')}>
                                        <label>Tổng tiền hàng:</label>
                                        <span>{total}đ</span>
                                    </div>
                                    <div className={cx('ship-price')}>
                                        <label>Phí vận chuyển:</label>
                                        <span>{orderItem.ship}đ</span>
                                    </div>
                                    <div className={cx('total-price')}>
                                        <label>Tổng số tiền:</label>
                                        <span>{total + orderItem.ship}đ</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    );
                })}
            </Container>
        </div>
    );
}

export default Order;
