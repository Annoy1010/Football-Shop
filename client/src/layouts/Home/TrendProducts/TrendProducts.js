import Carousel from 'react-bootstrap/Carousel';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
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

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className={cx('wrapper')} data-aos="fade-up">
            <h3 className={cx('heading')}>SẢN PHẨM HOT</h3>
            <Container>
                <Carousel fade activeIndex={index} onSelect={handleSelect}>
                    {data.products.map((product, index) => (
                        <Carousel.Item key={index} className={cx('product-item')}>
                            <Row>
                                <Col sm={12} lg={6} xl={7} className={cx('product-img')}>
                                    <div className={cx('product-img-container')}>
                                        <img src={product.src} alt="" />
                                        {product.sale && <div className={cx('product-sale')}>{product.sale}%</div>}
                                    </div>
                                </Col>
                                <Col sm={12} lg={6} xl={5} className={cx('product-desc')}>
                                    <div className={cx('product-name')}>{product.name}</div>
                                    <div className={cx('product-price')}>
                                        <span
                                            className={cx('product-price-origin', {
                                                saled: product.sale ? true : false,
                                            })}
                                        >
                                            {product.price}đ
                                        </span>
                                        {product.sale ? (
                                            <span className={cx('product-price-sale')}>
                                                {product.price * (1 - product.sale / 100)}đ
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <button className={cx('buy-btn')}>Mua ngay</button>
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
