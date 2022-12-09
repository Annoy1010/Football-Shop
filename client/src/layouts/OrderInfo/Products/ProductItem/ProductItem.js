import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem({ product, index, quantity }) {

    return (
        <div key={index} className={cx('wrapper')}>
            <Container className={cx('product-info')}>
                <Row>
                    <Col xl={3} className={cx('product-img')}>
                        <Link to={`/products/shoes/id/${product.productId}`}>
                            <img src={product.mainImage} alt="" />
                        </Link>
                    </Col>
                    <Col xl={6} className={cx('product-desc')}>
                        <span className={cx('product-name')}>{product.shoesName}</span>
                        <span className={cx('product-size')}>{product.size}</span>
                    </Col>
                    <Col xl={3} className={cx('product-quantity')}>
                        <span>{quantity}</span>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

ProductItem.propTypes = {
    product: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default ProductItem;
