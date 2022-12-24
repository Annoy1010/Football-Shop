import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './ProductList.module.scss';
import ProductItem from './ProductItem';
import LoadingSpinner from '../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const sortProduct = [
    { index: `Mặc định` },
    { index: `A -> Z` },
    { index: `Z -> A` },
    { index: `Giá tăng dần` },
    { index: `Giá giảm dần` },
];

function ProductList({ trademark, setTradeMark }) {
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    let trademark_state = null;
    let field_state = null;
    let position_state = null;

    const distinctAvailableProductList = [];

    useEffect(() => {
        if (location.state === null) {
            axios
                .get('/products/all')
                .then((res) => setProductList(res.data))
                .catch((err) => console.log(err));
        } else {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            trademark_state = location.state.trademark;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            field_state = location.state.field;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            position_state = location.state.position;
        }
        setLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (trademark !== null) {
            axios
                .post('/products/trademark', {
                    trademark: trademark_state,
                })
                .then((res) => setProductList(res.data))
                .catch((err) => console.log(err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trademark]);

    useEffect(() => {
        if (trademark_state !== null) {
            axios
                .post('/products/trademark', {
                    trademark: trademark_state.trademark,
                })
                .then((res) => setProductList(res.data))
                .catch((err) => console.log(err));
        }
    }, [trademark_state]);

    useEffect(() => {
        axios
            .post('/products/grassid', {
                grassid: field_state,
            })
            .then((res) => setProductList(res.data))
            .catch((err) => console.log(err));
    }, [field_state]);

    useEffect(() => {
        if (position_state !== null) {
            axios
                .post('/products/position', {
                    positionName: position_state,
                })
                .then((res) => setProductList(res.data))
                .catch((err) => console.log(err));
        }
    }, [position_state]);

    const handleOnChangeSort = (e) => {
        switch (e.target.value) {
            case `Mặc định`:
                axios
                    .get('/products/all')
                    .then((res) => setProductList(res.data))
                    .catch((err) => console.log(err));
                break;
            case `A -> Z`:
                axios
                    .get('/products/all/sort/az')
                    .then((res) => setProductList(res.data))
                    .catch((err) => console.log(err));
                break;
            case `Z -> A`:
                axios
                    .get('/products/all/sort/za')
                    .then((res) => setProductList(res.data))
                    .catch((err) => console.log(err));
                break;
            case `Giá tăng dần`:
                axios
                    .get('/products/all/sort/priceincrease')
                    .then((res) => setProductList(res.data))
                    .catch((err) => console.log(err));
                break;
            case `Giá giảm dần`:
                axios
                    .get('/products/all/sort/pricedecrease')
                    .then((res) => setProductList(res.data))
                    .catch((err) => console.log(err));
                break;
            default:
                break;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>DANH MỤC SẢN PHẨM</h3>
            <div className={cx('filter-options')}>
                <span className={cx('filter-heading')}>Sắp xếp theo: </span>
                <select className={cx('option-list')} onChange={(e) => handleOnChangeSort(e)}>
                    {sortProduct.map((sortName) => (
                        <option key={sortName.index} className={cx('option-value')}>
                            {sortName.index}
                        </option>
                    ))}
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
