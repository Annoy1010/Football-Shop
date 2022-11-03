import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';

import styles from './SignIn.module.scss';
import configs from '../../config';

const cx = classNames.bind(styles);

function SignIn({ username, setUsername, password, setPassword, user, setUser }) {
    const [customerList, setCustomerList] = useState([]);
    useEffect(() => {
        Axios.get('/user/login')
            .then((res) => setCustomerList(res.data))
            .catch((err) => console.error(err));
    }, []);

    localStorage.setItem('user', JSON.stringify(user));

    const handleOnSignIn = (e) => {
        const customerInfo = customerList.filter((customer) => {
            return customer.userName === username && customer.pass === password;
        });

        if (customerInfo.length === 0) {
            e.preventDefault();
            alert('Kiểm tra lại tên đăng nhập hoặc mật khẩu');
        } else {
            localStorage.setItem('user', JSON.stringify(customerInfo[0]));
            setUser(customerInfo[0]);
            setUsername('');
            setPassword('');
            // window.location.reload();
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
                    <Link className={cx('submit-btn')} onClick={(e) => handleOnSignIn(e)} to={configs.routes.home}>
                        Đăng nhập
                    </Link>
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
