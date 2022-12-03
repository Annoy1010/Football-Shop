import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './ShoesProductDetail.module.scss';
import ProductGeneral from './ProductGeneral';
import ProductDescription from './ProductDescription';
import Comment from './Comment';
import LoadingSpinner from '../LoadingSpinner';

const cx = classNames.bind(styles);

function ShoesProductDetail() {
    const path = window.location.pathname;
    const pathElements = path.split('/');
    const id = pathElements[pathElements.length - 1];

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/products/all')
            .then((res) => {
                const productList = res.data;
                setProduct(productList.filter((item) => item.shoesId === Number.parseInt(id))[0]);
            })
            .catch((err) => console.log(err));
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <div className={cx('loading')}>
                    <LoadingSpinner />
                </div>
            ) : (
                <Container>
                    <Row className={cx('product-info')}>
                        <ProductGeneral product={product}></ProductGeneral>
                    </Row>
                    <Row>
                        <Col>
                            <ProductDescription product={product} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Comment productId={product.shoesId} />
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
}

export default ShoesProductDetail;
