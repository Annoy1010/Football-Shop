import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Dashboard.module.scss';
import Avatar from './Avatar';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const username = user && Object.keys(user).length > 0 && user.userName;
const roleAccess = user && Object.keys(user).length > 0 && user.roleAccess.data[0];

function Dashboard() {
    const [avatarDisplay, setAvatarDisplay] = useState(false);

    const [fullname, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);

    const handleOnChangeFullName = (e) => {
        setFullName(e.target.value);
    };
    const handleOnChangeEmail = (e) =>{
        setEmail(e.target.value);
    };
    const handleOnChangePhone = (e) => {
        setPhone(e.target.value);
    };
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

    const handleSave = (e) => {
        axios.post('/user/dashboard/update', {
            username,
            fullname,
            email,
            phone,
        }).then((res) => {
            if(res.data.affectedRows > 0){
                axios.post('/user/userinfo', {
                    username,
                })
                    .then((res) => {
                        localStorage.setItem('user', JSON.stringify(res.data[0]));
                    })
                    .catch((err) => console.log(err));
                alert('Cập nhật thành công');
            }
        })
        .catch((err) => (console.log(err)));
    }

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
                            <input id="fullname" className={cx('item-value')} value={fullname} onChange={(e) => handleOnChangeFullName(e)}/>
                        </div>
                        <div className={cx('personal-detail-item')}>
                            <label htmlFor="email">Email</label>
                            <input id="email" className={cx('item-value')} value={email} onChange={(e) => handleOnChangeEmail(e)} />
                        </div>
                        <div className={cx('personal-detail-item')}>
                            <label htmlFor="phone">Số điện thoại</label>
                            <input id="phone" className={cx('item-value')} value={phone} onChange = {(e) => handleOnChangePhone(e)}/>
                        </div>
                        <button className={cx('save-btn')} onClick = {(e) => handleSave(e)}>Lưu</button>
                    </Col>
                </Row>
            </Container>
            {avatarDisplay && <Avatar setAvatarDisplay={setAvatarDisplay} />}
        </div>
    );
}

export default Dashboard;
