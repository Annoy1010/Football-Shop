import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Cart.module.scss';
import CartItem from './CartItem';
import LoadingSpinner from '../../components/LoadingSpinner';

const cx = classNames.bind(styles);

function Cart() {
    const pathArr = window.location.pathname.split('/');
    const userId = pathArr[pathArr.length - 2];

    const [cartId, setCartId] = useState(null);
    const [productListInCart, setProductListInCart] = useState([]);
    const [productList, setProductList] = useState();
    const [loading, setLoading] = useState(true);

    const currentCart = [];

    useEffect(() => {
        axios
            .get('/products/all')
            .then((res) => setProductList(res.data))
            .catch((err) => console.log(err));
        axios
            .post('/user/cartId', {
                userId: userId,
            })
            .then((res) => setCartId(res.data[0].cartId))
            .catch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (cartId) {
            axios
                .post('/user/cart/cartId', {
                    cartId: cartId,
                })
                .then((res) => setProductListInCart(res.data))
                .catch((err) => console.log(err));
            setLoading(false);
        }
    }, [cartId]);

    var totalPrice = 0;

    const [selectAllProducts, setSelectAllProducts] = useState(false);

    const handleUpdateCart = () => {
        axios
            .post('/user/cart/update', {
                cartId: cartId,
                currentCart: currentCart,
            })
            .then((res) => {
                if (res.data === 'success') {
                    alert('Cập nhật giỏ hàng thành công!!');
                    window.location.reload();
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Giỏ hàng</h2>
            {loading ? (
                <div className={cx('loading')}>
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    {productListInCart && productListInCart.length === 0 ? (
                        <h3>Không có sản phẩm nào trong giỏ hàng</h3>
                    ) : (
                        <>
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
                                        {productListInCart &&
                                            productListInCart.length > 0 &&
                                            productListInCart.map((product, index) => {
                                                const productInCart =
                                                    productList &&
                                                    productList.length > 0 &&
                                                    productList.filter(
                                                        (productItem) => productItem.shoesId === product.shoesId,
                                                    )[0];
                                                totalPrice += productInCart.price * product.shoesQuantity;

                                                currentCart.push(product);

                                                return (
                                                    <CartItem
                                                        product={productInCart}
                                                        quantity={product.shoesQuantity}
                                                        cartDetailId={product.detailId}
                                                        currentCart={currentCart}
                                                        key={index}
                                                        checked={selectAllProducts}
                                                    />
                                                );
                                            })}
                                    </Col>
                                </Row>
                            </Container>
                            {productListInCart && productListInCart.length > 0 && (
                                <>
                                    <div className={cx('products-total-price')}>
                                        <b>Tổng tiền:</b>
                                        <span> {totalPrice}đ</span>
                                    </div>
                                    <Link className={cx('order-btn')} to={`/user/id/${userId}/order/info`}>
                                        Mua hàng
                                    </Link>
                                </>
                            )}

                            {productListInCart && productListInCart.length > 0 && (
                                <button className={cx('update-cart-btn')} onClick={handleUpdateCart}>
                                    Cập nhật giỏ hàng
                                </button>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Cart;
