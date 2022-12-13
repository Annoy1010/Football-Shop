import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './OrderItem.module.scss';

const cx = classNames.bind(styles);

function OrderItem({ product, index }) {
    return (
        <div key={index} className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col xl={4} className={cx('product-img')}>
                        <img src={product.mainImage} alt="" />
                    </Col>
                    <Col xl={6} className={cx('product-desc')}>
                        <span className={cx('product-name')}>{product.shoesName}</span>
                        <span className={cx('product-size')}>{`Size: ${product.sizeName}`}</span>
                    </Col>
                    <Col xl={2} className={cx('product-quantity')}>
                        <span>{`Số lượng: ${product.shoesQuantity}`}</span>
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
