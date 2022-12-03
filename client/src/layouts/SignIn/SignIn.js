import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

import styles from './SignIn.module.scss';
import configs from '../../config';

const cx = classNames.bind(styles);

function SignIn({ username, setUsername, password, setPassword, setUser }) {
    const [successSignIn, setSuccessSignIn] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);

    if (successSignIn) {
        window.open(window.location.origin, '_self');
    }

    const handleOnChangeUserName = (e) => {
        setUsername(e.target.value);
        setSubmitClicked(false);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
        setSubmitClicked(false);
    };

    const handleOnSignIn = (e) => {
        Axios.post('/user/login', {
            username,
            password,
        })
            .then((res) => {
                if (res.data.length === 0) {
                    e.preventDefault();
                    setSubmitClicked(true);
                } else {
                    localStorage.setItem('user', JSON.stringify(res.data[0]));
                    setUsername('');
                    setPassword('');
                    setUser({ username: res.data[0].userName, password: res.data[0].pass });
                    setSuccessSignIn(true);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('signin')}>
                <div className={cx('signin-type')}>
                    <form className={cx('form')} method="POST">
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
                        {submitClicked && !successSignIn && (
                            <label className={cx('error-message')}>Tài khoản không chính xác</label>
                        )}
                    </form>

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
        </div>
    );
}

export default SignIn;
