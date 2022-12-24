import classNames from 'classnames/bind';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AOS from 'aos';
import 'aos/dist/aos.css';

import styles from './TrendProducts.module.scss';
import data from '../../../hardData';

const cx = classNames.bind(styles);

function TrendProducts() {
    const [index, setIndex] = useState(0);
    const [trendProducts, setTrendProducts] = useState([]);

    const [products, setProducts] = useState([]);

    const tempProducts = [];

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
        axios
            .get('/products/trend')
            .then((res) => setTrendProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (trendProducts.length > 0) {
            trendProducts.forEach((item) => {
                axios
                    .post('/products/id', {
                        shoesId: item.shoesId,
                    })
                    .then((res) => tempProducts.push(res.data[0]))
                    .catch((err) => console.error(err));
            });
            setTimeout(() => {
                setProducts(tempProducts);
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trendProducts]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className={cx('wrapper')} data-aos="fade-up">
            <h3 className={cx('heading')}>SẢN PHẨM HOT</h3>
            <Container>
                <Carousel fade activeIndex={index} onSelect={handleSelect}>
                    {products.length > 0 &&
                        products.map((product, index) => (
                            <Carousel.Item key={index} className={cx('product-item')}>
                                <Row>
                                    <Col sm={12} lg={6} xl={7} className={cx('product-img')}>
                                        <div className={cx('product-img-container')}>
                                            <img src={product.mainImage} alt="" />
                                            {product.sale > 0 && (
                                                <div className={cx('product-sale')}>{product.sale}%</div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col sm={12} lg={6} xl={5} className={cx('product-desc')}>
                                        <div className={cx('product-name')}>{product.shoesName}</div>
                                        <div className={cx('product-price')}>
                                            <span
                                                className={cx('product-price-origin', {
                                                    saled: product.sale > 0 ? true : false,
                                                })}
                                            >
                                                {product.price.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </span>
                                            {product.sale > 0 ? (
                                                <span className={cx('product-price-sale')}>
                                                    {(product.price * (1 - product.sale / 100)).toLocaleString(
                                                        'vi-VN',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        },
                                                    )}
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <Link
                                            key={index}
                                            className={cx('buy-btn')}
                                            to={`/products/shoes/id/${product.shoesId}`}
                                        >
                                            Mua ngay
                                        </Link>
                                    </Col>
                                </Row>
                            </Carousel.Item>
                        ))}
                </Carousel>
            </Container>
        </div>
    );
}

export default TrendProducts;
