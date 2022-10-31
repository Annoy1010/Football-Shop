import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Products.module.scss';
import Navigation from './Navigation';
import ProductList from './ProductList';

const cx = classNames.bind(styles);

function Products() {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col xm={0} sm={0} md={4} lg={3} xl={3}>
                        <Navigation />
                    </Col>
                    <Col xm={12} sm={12} md={8} lg={9} xl={9}>
                        <ProductList />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Products;
