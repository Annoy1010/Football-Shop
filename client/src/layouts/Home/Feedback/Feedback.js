import classNames from 'classnames/bind';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Feedback.module.scss';

const cx = classNames.bind(styles);

function Feedback() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')} data-aos="fade-up">
                PHẢN HỒI
            </h3>
            <form className={cx('feedback-form')} data-aos="fade-up">
                <Container>
                    <Row>
                        <Col sm={0} lg={1} xl={1}></Col>
                        <Col sm={12} lg={10} xl={10}>
                            <Row>
                                <Col sm={12} lg={6} xl={6} className={cx('input-item')}>
                                    <label htmlFor="email" className={cx('label-item')}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={cx('input-area')}
                                        placeholder="abc@gmail.com"
                                        required
                                    />
                                </Col>
                                <Col sm={12} lg={6} xl={6} className={cx('input-item')}>
                                    <label htmlFor="title" className={cx('label-item')}>
                                        Tiêu đề
                                    </label>
                                    <input type="text" id="title" className={cx('input-area')} required />
                                </Col>
                                <Col sm={12} lg={12} xl={12} className={cx('input-item')}>
                                    <label htmlFor="content" className={cx('label-item')}>
                                        Nội dung
                                    </label>
                                    <textarea id="content" className={cx('input-area')} rows="4" required />
                                </Col>
                                <Col sm={12} lg={12} xl={12} className={cx('submit-area')}>
                                    <input type="submit" className={cx('submit-btn')} value="Gửi phản hồi" />
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={0} lg={1} xl={1}></Col>
                    </Row>
                </Container>
            </form>
        </div>
    );
}

export default Feedback;
