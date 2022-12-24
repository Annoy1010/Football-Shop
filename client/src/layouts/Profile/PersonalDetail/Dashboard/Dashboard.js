import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer } from 'react-toastify';
import parsePhoneNumber from 'libphonenumber-js';

import styles from './Dashboard.module.scss';
import Avatar from './Avatar';
import notify from '../../../../components/ToastMessage';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const username = user && Object.keys(user).length > 0 && user.userName;
const roleAccess = user && Object.keys(user).length > 0 && user.roleAccess.data[0];

function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function Dashboard() {
    const [fullName, setFullName] = useState(user && Object.keys(user).length > 0 && user.fullName);
    const [email, setEmail] = useState(user && Object.keys(user).length > 0 && user.email);
    const [phone, setPhone] = useState(user && Object.keys(user).length > 0 && user.phone);
    const [avatarDisplay, setAvatarDisplay] = useState(false);
    const [currentAvatar, setCurrentAvatar] = useState(() => {
        let current = null;
        axios
            .post(`/user/avatar`, {
                roleAccess: roleAccess.toString(),
                username,
            })
            .then((res) => {
                if (res.data[0].avatar !== null) {
                    current = res.data[0].avatar;
                } else {
                    current = 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png';
                }
            })
            .catch((err) => console.log(err));
        return current;
    });

    useEffect(() => {
        axios
            .post(`/user/avatar`, {
                roleAccess: roleAccess.toString(),
                username,
            })
            .then((res) => {
                if (res.data[0].avatar !== null) {
                    setCurrentAvatar(res.data[0].avatar);
                } else {
                    setCurrentAvatar(
                        'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png',
                    );
                }
            })
            .catch((err) => console.log(err));
    }, [avatarDisplay]);

    const handleSubmit = () => {
        if (fullName === '' || email === '' || phone === '') {
            notify('Vui lòng nhập đầy đủ thông tin', 'warn', 2000);
        } else {
            if (!isValidEmail(email)) {
                notify('Email không hợp lệ', 'error', 2000);
            } else {
                if (phone && !parsePhoneNumber(`+84${phone.slice(1, phone.length)}`, 'VN').isValid()) {
                    notify('Số điện thoại không hợp lệ', 'error', 2000);
                } else {
                    axios
                        .post('/user/profile/update', {
                            username,
                            roleAccess: roleAccess.toString(),
                            fullName,
                            phone,
                            email,
                        })
                        .then((res) => {
                            if (res.data.affectedRows > 0) {
                                notify('Cập nhật thông tin thành công', 'success', 1500);
                                setTimeout(() => window.location.reload(), 2000);
                            }
                        })
                        .catch((err) => console.log(err));
                }
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Hồ sơ</h3>
            <Container className={cx('personal-info')}>
                <Row>
                    <Col sm={12} lg={3} xl={4} className={cx('personal-avatar')}>
                        <img src={currentAvatar} alt="" />
                        <button className={cx('avatar-change-btn')} onClick={() => setAvatarDisplay(true)}>
                            Thay ảnh đại diện
                        </button>
                    </Col>
                    <Col sm={12} lg={9} xl={8} className={cx('personal-detail')}>
                        <div className={cx('personal-detail-item')}>
                            <label htmlFor="username">Tên đăng nhập</label>
                            <input id="username" className={cx('item-value')} value={user.userName} readOnly />
                        </div>
                        <div className={cx('personal-detail-item')}>
                            <label htmlFor="fullname">Họ và tên</label>
                            <input
                                id="fullname"
                                className={cx('item-value')}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className={cx('personal-detail-item')}>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                className={cx('item-value')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={cx('personal-detail-item')}>
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                id="phone"
                                className={cx('item-value')}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <button className={cx('save-btn')} onClick={handleSubmit}>
                            Lưu
                        </button>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
            {avatarDisplay && <Avatar setAvatarDisplay={setAvatarDisplay} />}
        </div>
    );
}

export default Dashboard;
