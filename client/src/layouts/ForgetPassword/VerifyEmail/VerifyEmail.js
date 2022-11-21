import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

import styles from './VerifyEmail.module.scss';

const cx = classNames.bind(styles);

function VerifyEmail({ setIsValidVerifiedEmail }) {
    const [email, setEmail] = useState('');

    const handleSendCode = (e) => {
        axios
            .get(`/forgetpassword/email?email=${email}`)
            .then((res) => {
                const result = res.data;
                if (result.length > 0) {
                    console.log(Math.floor(Math.random() * 99999) + 10000);
                } else {
                    alert('email không chính xác');
                    e.preventDefault();
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('reset-form')}>
                <div className={cx('input-item')}>
                    <label htmlFor="email" className={cx('label-item')}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        className={cx('input-area')}
                        placeholder="abc@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="verify" className={cx('label-item')}>
                        Mã xác thực
                    </label>
                    <input type="text" id="verify" className={cx('input-area')} />
                    <label className={cx('notice')}></label>
                </div>
                <div className={cx('options-btn')}>
                    <button className={cx('submit-btn', 'send-btn')} onClick={(e) => handleSendCode(e)}>
                        Gửi mã xác nhận
                    </button>
                    <button className={cx('submit-btn', 'verify-btn')}>Xác nhận</button>
                </div>
            </form>
            <div className={cx('notice')}>
                <p>
                    Sau khi xác nhận Email hợp lệ. Hệ thống sẽ gửi một mã xác thực đến Email của bạn. Vui lòng kiểm tra
                    Email và nhập chính xác mã xác thực để được cài đặt mật khẩu mới
                </p>
            </div>
        </div>
    );
}

VerifyEmail.propTypes = {
    setValidVerifiedEmail: PropTypes.func,
};

export default VerifyEmail;
