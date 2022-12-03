import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import styles from './ProductList.module.scss';
import ProductItem from './ProductItem';
import LoadingSpinner from '../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

function ProductList() {
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);

    const distinctAvailableProductList = [];

    useEffect(() => {
        axios
            .get('/products/all')
            .then((res) => setProductList(res.data))
            .catch((err) => console.log(err));
        setLoading(false);
    }, []);

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
            {loading ? (
                <div className={cx('loading')}>
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    <div className={cx('product-list')}>
                        <Container>
                            <Row>
                                {productList &&
                                    productList.length > 0 &&
                                    productList.map(
                                        (product, index) =>
                                            !distinctAvailableProductList.includes(product.shoesName) &&
                                            distinctAvailableProductList.push(product.shoesName) && (
                                                <Col sm={6} md={4} lg={4} xl={3}>
                                                    <Link
                                                        key={index}
                                                        className={cx('product-item')}
                                                        to={`/products/shoes/id/${product.shoesId}`}
                                                    >
                                                        <ProductItem product={product} />
                                                    </Link>
                                                </Col>
                                            ),
                                    )}
                            </Row>
                        </Container>
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductList;
