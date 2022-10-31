import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './ProductGeneral.module.scss';

const cx = classNames.bind(styles);

function ProductGeneral({ product }) {
    const [currentValue, setCurrentValue] = useState(0);
    return (
        <Container>
            <Row>
                <Col sm={12} lg={3} xl={4}>
                    <img className={cx('product-img')} src={product.src} alt="" width={'100%'} />
                </Col>
                <Col sm={12} lg={9} xl={8} className={cx('product-detail')}>
                    <div className={cx('product-name')}>Giày Bóng Đá {product.name}</div>
                    <div className={cx('product-id')}>
                        <b>Mã sản phẩm: </b>
                        {product.id}
                    </div>
                    <div className={cx('product-price')}>{product.price}đ</div>
                    <div className={cx('product-size-title')}>Chọn size:</div>
                    <div className={cx('product-size-list')}>
                        {product.size.map((sizeItem, index) => (
                            <div key={index} className={cx('product-size-item')}>
                                {sizeItem}
                            </div>
                        ))}
                    </div>
                    <Link to="/size" className={cx('product-size-direct-link')}>
                        Hướng dẫn chọn size
                    </Link>
                    <div className={cx('product-quanity-title')}>Số lượng:</div>
                    <div className={cx('quantity-options')}>
                        <button
                            className={cx('down-option')}
                            onClick={() => setCurrentValue((prev) => (prev > 0 ? prev - 1 : prev))}
                        >
                            -
                        </button>
                        <div className={cx('detail-option')}>{currentValue}</div>
                        <button className={cx('up-option')} onClick={() => setCurrentValue((prev) => prev + 1)}>
                            +
                        </button>
                    </div>
                    <div className={cx('product-order')}>
                        <button className={cx('add-cart-btn')}>Thêm vào giỏ hàng</button>
                        <button className={cx('buy-btn')}>Mua ngay</button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductGeneral;
