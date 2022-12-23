import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import styles from './SignIn.module.scss';
import configs from '../../config';
import notify from '../../components/ToastMessage';

const cx = classNames.bind(styles);

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleOnChangeUserName = (e) => {
        setUsername(e.target.value);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleOnSignIn = (e) => {
        axios
            .post('/user/login', {
                username,
                password,
            })
            .then((res) => {
                if (res.data.length > 0) {
                    localStorage.setItem('user', JSON.stringify(res.data[0]));
                    notify('Đăng nhập thành công', 'success', 2000);
                    setTimeout(() => window.open(window.location.origin, '_self'), 2100);
                } else {
                    notify('Thông tin đăng nhập sai. Vui lòng kiểm tra lại thông tin nhập', 'error', 2000);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('signin')}>
                <div className={cx('signin-type')}>
                    <div className={cx('form')}>
                        <div className={cx('input-item')}>
                            <label htmlFor="username" className={cx('label-item')}>
                                Tên đăng nhập
                            </label>
                            <input
                                type="text"
                                id="username"
                                className={cx('input-area')}
                                value={username}
                                onChange={(e) => handleOnChangeUserName(e)}
                                required
                            />
                        </div>
                        <div className={cx('input-item')}>
                            <label htmlFor="password" className={cx('label-item')}>
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                id="password"
                                className={cx('input-area')}
                                value={password}
                                onChange={(e) => handleOnChangePassword(e)}
                                required
                            />
                        </div>
                    </div>

                    <div className={cx('account-option')}>
                        <Link to={configs.routes.forgetPassword} className={cx('reset-account-link')}>
                            Quên mật khẩu?
                        </Link>
                        <Link to={configs.routes.signup} className={cx('create-account-link')}>
                            Tạo tài khoản mới
                        </Link>
                    </div>
                    <button className={cx('submit-btn')} onClick={(e) => handleOnSignIn(e)}>
                        Đăng nhập
                    </button>
                </div>
                <div className={cx('signin-type')}>
                    <button className={cx('social-btn', 'google')}>Đăng nhập bằng Google</button>
                    <button className={cx('social-btn', 'facebook')}>Đăng nhập bằng Facebook</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignIn;
