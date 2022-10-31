import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Cart.module.scss';
import data from '../../hardData';
import CartItem from './CartItem';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Cart() {
    const pathArr = window.location.pathname.split('/');
    const userId = pathArr[pathArr.length - 2];
    const productsOfUser = data.cart.filter((user) => user.userId === userId)[0].products;

    var totalPrice = 0;

    const allProducts = data.products;

    const [selectAllProducts, setSelectAllProducts] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Giỏ hàng</h2>
            <Container>
                <Row className={cx('menu')}>
                    <Col className={cx('menu-item')} xl={4}>
                        <input
                            type="checkbox"
                            className={cx('filter-all')}
                            onChange={(e) => setSelectAllProducts(e.target.checked)}
                        />
                        <span>Sản phẩm</span>
                    </Col>
                    <Col className={cx('menu-item')} xl={2}>
                        Đơn giá
                    </Col>
                    <Col className={cx('menu-item')} xl={2}>
                        Số lượng
                    </Col>
                    <Col className={cx('menu-item')} xl={2}>
                        Thành tiền
                    </Col>
                    <Col className={cx('menu-item')} xl={2}>
                        Thao tác
                    </Col>
                </Row>
                <Row>
                    <Col className={cx('product')}>
                        {productsOfUser.map((product, index) => {
                            const productInCart = allProducts.filter(
                                (productItem) => productItem.id === product.productId,
                            )[0];
                            totalPrice += productInCart.price * product.quantity;
                            return <CartItem product={product} key={index} checked={selectAllProducts} />;
                        })}
                    </Col>
                </Row>
            </Container>
            {productsOfUser.length > 0 && (
                <>
                    <div className={cx('products-total-price')}>
                        <b>Tổng tiền:</b>
                        <span> {totalPrice}đ</span>
                    </div>
                    <button className={cx('order-btn')}>Đặt hàng</button>
                </>
            )}
        </div>
    );
}

export default Cart;
