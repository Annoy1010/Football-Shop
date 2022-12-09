import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './UpdateProduct.module.scss';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import ProductItem from './ProductItem/ProductItem';

const cx = classNames.bind(styles);

function UpdateProduct() {
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios
            .get('/products/all')
            .then((res) => setProductList(res.data))
            .catch((err) => console.log(err));
        setLoading(false);
    }, []);

    const distinctAvailableProductList = [];

    return (
        <React.Fragment>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <React.Fragment>
                    {productList ? (
                        productList.length > 0 ? (
                            <div className={cx('wrapper')}>
                                <h3 className={cx('heading')}>DANH MỤC SẢN PHẨM HIỆN CÓ</h3>
                                <Container>
                                    <Row>
                                        {productList.map(
                                            (product, index) =>
                                                !distinctAvailableProductList.includes(product.shoesName) &&
                                                distinctAvailableProductList.push(product.shoesName) && (
                                                    <Col xs={12} xl={12} lg={12}>
                                                        <ProductItem product={product} index={index} />
                                                    </Col>
                                                ),
                                        )}
                                    </Row>
                                </Container>
                            </div>
                        ) : (
                            <h3 className={cx('heading')}>Không có sản phẩm nào trong Shop</h3>
                        )
                    ) : (
                        <h3 className={cx('heading')}>Không có sản phẩm nào trong Shop</h3>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default UpdateProduct;
