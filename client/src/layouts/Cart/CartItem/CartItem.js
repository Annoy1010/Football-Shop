import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';

import styles from './CartItem.module.scss';
import data from '../../../hardData';

const cx = classNames.bind(styles);

function CartItem({ product, key, checked }) {
    const allProducts = data.products;
    const productInCart = allProducts.filter((productItem) => productItem.id === product.productId)[0];

    const [currentQuantity, setCurrentQuantity] = useState(product.quantity);
    const [selectedProduct, setSelectedProduct] = useState(false);

    useEffect(() => {
        if (checked) {
            setSelectedProduct(true);
        } else {
            setSelectedProduct(false);
        }
    }, [checked]);

    return (
        <div key={key} className={cx('wrapper')}>
            <Container>
                <Row className={cx('product')}>
                    <Col className={cx('product-info-item')} xl={4}>
                        <input
                            type="checkbox"
                            className={cx('select-product')}
                            checked={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.checked)}
                        />
                        <div className={cx('product-info')}>
                            <div className={cx('product-img')}>
                                <img src={productInCart.src} alt="" />
                            </div>
                            <div className={cx('product-desc')}>
                                <span className={cx('product-name')}>{productInCart.name}</span>
                                <span className={cx('product-size')}>{product.size}</span>
                            </div>
                        </div>
                    </Col>
                    <Col className={cx('product-info-item')} xl={2}>
                        <span className={cx('product-price')}>{productInCart.price}đ</span>
                    </Col>
                    <Col className={cx('product-info-item')} xl={2}>
                        <div
                            className={cx('product-quantity-down')}
                            onClick={() => setCurrentQuantity((prev) => (prev > 0 ? prev - 1 : 0))}
                        >
                            -
                        </div>
                        <span className={cx('product-quantity')}>{currentQuantity}</span>
                        <div
                            className={cx('product-quantity-up')}
                            onClick={() => setCurrentQuantity((prev) => prev + 1)}
                        >
                            +
                        </div>
                    </Col>
                    <Col className={cx('product-info-item')} xl={2}>
                        <span className={cx('product-price-total')}>{productInCart.price * currentQuantity}đ</span>
                    </Col>
                    <Col className={cx('product-info-item')} xl={2}>
                        <span className={cx('remove-btn')}>Xóa</span>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

CartItem.prototype = {
    product: PropTypes.object.isRequired,
    key: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
};

export default CartItem;
