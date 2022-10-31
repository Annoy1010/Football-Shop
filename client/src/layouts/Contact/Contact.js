import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import styles from './Contact.module.scss';
import data from '../../hardData';

const cx = classNames.bind(styles);

function Contact() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')} data-aos="fade-up">
                LIÊN HỆ
            </h2>
            <Container className={cx('contact-info')} data-aos="fade-up">
                <Row>
                    <Col xm={12} lg xl>
                        <div className={cx('contact-map')}>
                            <div className={cx('contact-img')}></div>
                        </div>
                    </Col>
                    <Col xm={12} lg xl>
                        <div className={cx('contact-detail')}>
                            {data.contacts.map((contact, index) => (
                                <div key={index} className={cx('contact-detail-item')}>
                                    <div className={cx('contact-detail-heading')}>{contact.title}</div>
                                    <div className={cx('contact-detail-content')}>{contact.desc}</div>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Contact;
