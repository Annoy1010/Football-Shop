import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './OrderItem.module.scss';
import data from '../../../hardData';

const cx = classNames.bind(styles);

function OrderItem({ product, index }) {
    const productOrder = data.products.filter((productItem) => productItem.id === product.productId)[0];

    return (
        <div key={index} className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col xl={4} className={cx('product-img')}>
                        <img src={productOrder.src} alt="" />
                    </Col>
                    <Col xl={6} className={cx('product-desc')}>
                        <span className={cx('product-name')}>{productOrder.name}</span>
                        <span className={cx('product-size')}>{product.size}</span>
                    </Col>
                    <Col xl={2} className={cx('product-quantity')}>
                        <span>{product.quantity}</span>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

OrderItem.proptype = {
    product: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default OrderItem;
