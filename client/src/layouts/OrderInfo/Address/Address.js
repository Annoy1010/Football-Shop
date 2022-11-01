import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Address.module.scss';
import user from '../../../user';
import data from '../../../hardData';

const cx = classNames.bind(styles);

function Address() {
    const currentUser = data.user.filter((item) => item.id === user)[0];
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thông tin nhận hàng</h3>
            <Container className={cx('order-info')}>
                <Row>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Họ và tên</label>
                        <span>{currentUser.name}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Số điện thoại</label>
                        <span>{currentUser.phone}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Email</label>
                        <span>{currentUser.mail}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Địa chỉ</label>
                        <span>{currentUser.address.street}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Tỉnh thành</label>
                        <span>{currentUser.address.province}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Quận huyện</label>
                        <span>{currentUser.address.district}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Xã phường</label>
                        <span>{currentUser.address.ward}</span>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Address;
