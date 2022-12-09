import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Products.module.scss';
import ProductItem from './ProductItem';
import configs from '../../../config';

import { useState, useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Products({ total, setTotal }) {

    const pathArr = window.location.pathname.split('/');
    const userId = pathArr[pathArr.length - 3];

    const [cartId, setCartId] = useState(null);
    const [productListInCart, setProductListInCart] = useState([]);
    const [productList, setProductList] = useState();

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
                .post('/user/cart/cartid/order', {
                    cartId: cartId,
                })
                .then((res) => setProductListInCart(res.data))
                .catch((err) => console.log(err));
        }
    }, [cartId]);

    var totalPrice = 0;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('order')}>
                <h3 className={cx('heading')}>Thông tin sản phẩm</h3>
                <Container className={cx('menu')}>
                    <Row>
                        <Col>
                            <Container>
                                <Row className={cx('menu-option')}>
                                    <Col xl={9} className={cx('menu-option-item')}>
                                        Sản phẩm
                                    </Col>
                                    <Col xl={3} className={cx('menu-option-item')}>
                                        Số lượng
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Container className={cx('product-order-info')}>
                    <Row>
                        <Col className={cx('product-order-list')}>
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
                                    setTotal(totalPrice);
                                    currentCart.push(product);
                                    return <ProductItem product={productInCart} index={index} quantity={product.shoesQuantity}/>;
                                })}
                        </Col>
                    </Row>
                    <Row className={cx('option-btn-list')}>
                        <Col xl={6}>
                            <Link className={cx('option-btn')} to={`/user/id/${userId}/cart`}>
                                Quay lại giỏ hàng
                            </Link>
                        </Col>
                        <Col xl={5}>
                            <Link className={cx('option-btn', 'continue-btn')} to={configs.routes.products}>
                                Tiếp tục mua hàng
                            </Link>
                        </Col>
                        <Col xl={1}></Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Products;
