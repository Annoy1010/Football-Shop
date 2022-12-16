import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AOS from 'aos';
import 'aos/dist/aos.css';

import styles from './Position.module.scss';
import data from '../../../hardData';

const cx = classNames.bind(styles);

function Position() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
    return (
        <div className={cx('wrapper')} data-aos="fade-up">
            <h3 className={cx('heading')}>CHỌN GIÀY THEO VỊ TRÍ</h3>
            <Container>
                <div className={cx('position-list')}>
                    <Row>
                        {data.position.map((positionItem, index) => (
                            <Col sm={12} lg={12} xl={12} key={index} className={cx('position-item')} data-aos="fade-up">
                                <Link to={`/products/position/`}>
                                    <img className={cx('position-img')} src={positionItem.src} alt="" />
                                </Link>
                                <div className={cx('position-name')}>{positionItem.name}</div>
                                <button className={cx('view-btn')}>
                                    <Link
                                        to = '/products' state = {{trademark: null, field: null, position: positionItem.name}}
                                        >
                                            Xem ngay
                                    </Link>
                                </button>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default Position;
