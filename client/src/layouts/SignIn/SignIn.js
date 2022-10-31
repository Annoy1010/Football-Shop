import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import configs from '../../config';

import styles from './SignIn.module.scss';

const cx = classNames.bind(styles);

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleOnSignin = () => {
        if (username === 'annoy' && password === 'l3th3Phuc') {
            alert('Đăng nhập thành công');
            window.location.reload(true);
        }
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
                                onChange={(e) => setUsername(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                    <div className={cx('account-option')}>
                        <Link to={configs.routes.forgetPassword} className={cx('reset-account-link')}>
                            Quên mật khẩu?
                        </Link>
                        <Link to={configs.routes.signup} className={cx('create-account-link')}>
                            Tạo tài khoản mới
                        </Link>
                    </div>
                    <button className={cx('submit-btn')} onClick={handleOnSignin}>
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
