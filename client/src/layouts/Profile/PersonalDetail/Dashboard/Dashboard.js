import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Hồ sơ</h3>
            <Container className={cx('personal-info')}>
                <Row>
                    <Col sm={12} lg={3} xl={4} className={cx('personal-avatar')}>
                        <img
                            src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                            alt=""
                        />
                        <button className={cx('avatar-change-btn')}>Thay ảnh đại diện</button>
                        {/* <input type="file" accept="image/*" /> */}
                    </Col>
                    <Col sm={12} lg={9} xl={8} className={cx('personal-detail')}>
                        <div className={cx('personal-detail-item')}>
                            <label htmlFor="username">Tên đăng nhập</label>
                            <input id="username" className={cx('item-value')} value={'annoy'} readOnly />
                        </div>
                        <div className={cx('personal-detail-item')}>
                            <label htmlFor="fullname">Họ và tên</label>
                            <input id="fullname" className={cx('item-value')} value={'Lê Thế Phúc'} readOnly />
                        </div>
                        <div className={cx('personal-detail-item')}>
                            <label htmlFor="email">Email</label>
                            <input id="email" className={cx('item-value')} value={'lethephuc2002@gmail.com'} readOnly />
                        </div>
                        <div className={cx('personal-detail-item')}>
                            <label htmlFor="phone">Số điện thoại</label>
                            <input id="phone" className={cx('item-value')} value={'0368341595'} readOnly />
                        </div>
                        <button className={cx('save-btn')}>Lưu</button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;
