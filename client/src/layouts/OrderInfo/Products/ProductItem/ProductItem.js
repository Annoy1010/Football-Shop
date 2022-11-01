import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './ProductItem.module.scss';
import data from '../../../../hardData';

const cx = classNames.bind(styles);

function ProductItem({ product, index }) {
    const productInOrder = data.products.filter((item) => item.id === product.productId)[0];
    return (
        <div key={index} className={cx('wrapper')}>
            <Container className={cx('product-info')}>
                <Row>
                    <Col xl={3} className={cx('product-img')}>
                        <Link to={`/products/shoes/id/${product.productId}`}>
                            <img src={productInOrder.src} alt="" />
                        </Link>
                    </Col>
                    <Col xl={6} className={cx('product-desc')}>
                        <span className={cx('product-name')}>{productInOrder.name}</span>
                        <span className={cx('product-size')}>{product.size}</span>
                    </Col>
                    <Col xl={3} className={cx('product-quantity')}>
                        <span>{product.quantity}</span>
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
