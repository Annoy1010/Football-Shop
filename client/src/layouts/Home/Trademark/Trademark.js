import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Trademark.module.scss';
import data from '../../../hardData';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Trademark() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')} data-aos="fade-up">
                NHÃN HIỆU
            </h3>
            <Container className={cx('product-list')}>
                {data.trademarks.map((item, index) => (
                    <Row key={index} className={cx('product-item')} data-aos="fade-up">
                        <React.Fragment>
                            <Col sm={12} lg xl>
                                <img className={cx('product-image')} src={item.src} alt="" />
                            </Col>
                            <Col sm={12} lg xl className={cx('product-intro')}>
                                <div className={cx('product-desc')}>
                                    <h3 className={cx('product-title')}>{item.name}</h3>
                                    <span className={cx('product-slogan')}>{item.slogan}</span>
                                </div>
                                <button className={cx('product-view-btn')}>
                                <Link
                                    to = '/products' state = {{trademark: item.name, field: null, position: null}}
                                    >
                                        Xem ngay
                                </Link>
                                </button>
                            </Col>
                        </React.Fragment>
                    </Row>
                ))}
            </Container>
        </div>
    );
}

export default Trademark;
