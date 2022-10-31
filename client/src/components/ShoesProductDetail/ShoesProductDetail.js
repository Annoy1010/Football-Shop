import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './ShoesProductDetail.module.scss';
import data from '../../hardData';
import ProductGeneral from './ProductGeneral';
import ProductDescription from './ProductDescription';
import Comment from './Comment';

const cx = classNames.bind(styles);

function ShoesProductDetail() {
    const path = window.location.pathname;
    const pathElements = path.split('/');
    const id = pathElements[pathElements.length - 1];
    const product = data.products.filter((item) => item.id === id)[0];

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row className={cx('product-info')}>
                    <ProductGeneral product={product} />
                </Row>
                <Row>
                    <Col>
                        <ProductDescription product={product} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Comment productId={product.id} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ShoesProductDetail;
