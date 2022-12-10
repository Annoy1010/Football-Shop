import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Products.module.scss';
import ProductItem from './ProductItem';
import user from '../../../user';
import data from '../../../hardData';
import configs from '../../../config';

const cx = classNames.bind(styles);

function Products({ productList, setTotal }) {
    /// productList là danh sách sản phẩm chọn mua
    let totalPrice = 0;
    const [productDataAllList, setProductDataAllList] = useState();
    /// productDataAllList là danh sách toàn bộ sản phẩm hiện có trong shop
    const [shoesImageList, setShoesImageList] = useState([]);

    useEffect(() => {
        axios
            .get('/products/all')
            .then((res) => setProductDataAllList(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/products/image/all')
            .then((res) => setShoesImageList(res.data))
            .catch((err) => console.log(err));
    }, []);

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
                            {productList &&
                                productList.length > 0 &&
                                productList.map((product, index) => {
                                    totalPrice += product.price * product.shoesQuantity;
                                    const shoesName =
                                        productDataAllList &&
                                        productDataAllList.length > 0 &&
                                        productDataAllList.filter((item) => item.shoesId === product.shoesId)[0]
                                            .shoesName;
                                    const shoesImage =
                                        shoesImageList &&
                                        shoesImageList.length > 0 &&
                                        shoesImageList.filter((item) => item.shoesId === product.shoesId)[0].mainImage;
                                    product = { ...product, shoesName, shoesImage };
                                    return <ProductItem product={product} index={index} />;
                                })}
                            {setTotal(totalPrice)}
                        </Col>
                    </Row>
                    <Row className={cx('option-btn-list')}>
                        <Col xl={6}>
                            <Link className={cx('option-btn')} to={`/user/id/${user}/cart`}>
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
