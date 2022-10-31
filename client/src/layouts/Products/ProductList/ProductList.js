import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import styles from './ProductList.module.scss';
import ProductItem from './ProductItem';

import data from '../../../hardData';

const cx = classNames.bind(styles);

function ProductList() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>DANH MỤC SẢN PHẨM</h3>
            <div className={cx('filter-options')}>
                <span className={cx('filter-heading')}>Sắp xếp theo: </span>
                <select className={cx('option-list')}>
                    <option className={cx('option-item')} value="default">
                        Mặc định
                    </option>
                    <option className={cx('option-item')} value="keyIncrease">{`A -> Z`}</option>
                    <option className={cx('option-item')} value="keyDecrease">{`Z -> A`}</option>
                    <option className={cx('option-item')} value="priceIncrease">
                        Giá tăng dần
                    </option>
                    <option className={cx('option-item')} value="priceDecrease">
                        Giá giảm dần
                    </option>
                </select>
            </div>
            <div className={cx('product-list')}>
                <Container>
                    <Row>
                        {data.products.map((product, index) => (
                            <Col sm={6} md={4} lg={4} xl={3}>
                                <Link
                                    key={index}
                                    className={cx('product-item')}
                                    to={`/products/shoes/id/${product.id}`}
                                >
                                    <ProductItem product={product} />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default ProductList;
