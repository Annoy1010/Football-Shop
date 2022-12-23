import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

import styles from './VerifyEmail.module.scss';

const cx = classNames.bind(styles);

function VerifyEmail({ setIsExactResetCode, setResetEmail }) {
    const [email, setEmail] = useState('');
    const [resetCodeInput, setResetCodeInput] = useState('');
    const [randomCode, setRandomCode] = useState(null);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidVerified, setInvalidVerified] = useState(false);

    function randomResetCode() {
        return Math.floor(Math.random() * 99999) + 10000;
    }

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
        setInvalidEmail(false);
    };

    const handleOnChangeCode = (e) => {
        setResetCodeInput(e.target.value);
        setInvalidVerified(false);
    };

    const handleSendCode = (e) => {
        axios
            .get(`/forgetpassword/email?email=${email}`)
            .then((res) => {
                const result = res.data;
                if (result.length > 0) {
                    const verifiedCode = randomResetCode();
                    axios
                        .post('/sendemail', {
                            email: email,
                            resetCode: verifiedCode.toString(),
                        })
                        .then((res) =>
                            console.log(res.data && 'Đã gửi mã thành công' && console.log(res.data.resetCode)),
                        )
                        .catch((err) => console.log(err));
                    setRandomCode(verifiedCode);
                    setResetEmail(email);
                } else {
                    setInvalidEmail(true);
                    e.preventDefault();
                }
            })
            .catch((err) => console.log(err));
    };

    const handleVerifyCode = () => {
        if (resetCodeInput === randomCode.toString()) {
            setEmail('');
            setResetCodeInput('');
            setIsExactResetCode(true);
        } else {
            setInvalidVerified(true);
        }
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
                        onChange={(e) => handleOnChangeEmail(e)}
                    />
                    {invalidEmail === true ? (
                        <label className={cx('error-message')}>Email không chính xác</label>
                    ) : (
                        <></>
                    )}
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="verify" className={cx('label-item')}>
                        Mã xác thực
                    </label>
                    <input
                        type="text"
                        id="verify"
                        value={resetCodeInput}
                        className={cx('input-area')}
                        onChange={(e) => handleOnChangeCode(e)}
                    />
                    {invalidVerified === true ? (
                        <label className={cx('error-message')}>Mã xác thực không chính xác</label>
                    ) : (
                        <></>
                    )}
                </div>
                <div className={cx('options-btn')}>
                    <input
                        type="button"
                        className={cx('submit-btn', 'send-btn')}
                        onClick={(e) => handleSendCode(e)}
                        value="Gửi mã xác nhận"
                    />
                    <input
                        type="button"
                        className={cx('submit-btn', 'verify-btn')}
                        onClick={handleVerifyCode}
                        value="Xác nhận"
                    />
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
    setIsExactResetCode: PropTypes.func,
    setResetEmail: PropTypes.func,
};

export default VerifyEmail;
