import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Feedback.module.scss';

const cx = classNames.bind(styles);
const user = JSON.parse(localStorage.getItem('user'));

function Feedback() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    const handleOnChangeTitle = (e) => {
        setTitle(e.target.value);
        setErrorMessage(false);
    };

    const handleOnChangeContent = (e) => {
        setContent(e.target.value);
        setErrorMessage(false);
    };

    const handleSubmit = () => {
        // if (!user || Object.keys(user).length === 0) {
        //     alert('Vui lòng đăng nhập trước khi gửi phản hồi');
        // } else {

        // }
        if (title && content) {
            axios
                .post('/feedback', {
                    title,
                    content,
                })
                .then((res) => {
                    console.log(res.data);
                    setTitle('');
                    setContent('');
                })
                .catch((err) => console.log(err));
        } else {
            setErrorMessage(true);
        }
    };

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
                                <Col sm={12} lg={12} xl={12} className={cx('input-item')}>
                                    <label htmlFor="title" className={cx('label-item')}>
                                        Tiêu đề
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        className={cx('input-area')}
                                        onChange={(e) => handleOnChangeTitle(e)}
                                        required
                                    />
                                </Col>
                                <Col sm={12} lg={12} xl={12} className={cx('input-item')}>
                                    <label htmlFor="content" className={cx('label-item')}>
                                        Nội dung
                                    </label>
                                    <textarea
                                        id="content"
                                        value={content}
                                        className={cx('input-area')}
                                        rows="4"
                                        onChange={(e) => handleOnChangeContent(e)}
                                        required
                                    />
                                    {errorMessage && (
                                        <span className={cx('error-message')}>Vui lòng điền đầy đủ thông tin</span>
                                    )}
                                </Col>
                                <Col sm={12} lg={12} xl={12} className={cx('submit-area')}>
                                    <input
                                        type="button"
                                        className={cx('submit-btn')}
                                        value="Gửi phản hồi"
                                        onClick={handleSubmit}
                                    />
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
