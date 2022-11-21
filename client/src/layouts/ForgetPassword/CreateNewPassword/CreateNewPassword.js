import classNames from 'classnames/bind';
import { useState } from 'react';
import Axios from 'axios';

import styles from './CreateNewPassword.module.scss';

const cx = classNames.bind(styles);

function CreateNewPasword({ resetEmail }) {
    console.log('reset email: ', resetEmail);
    const [passInput, setPassInput] = useState('');
    const [rePassInput, setRePassInput] = useState('');

    const handleSubmit = () => {
        if (rePassInput !== passInput) {
            alert('Mật khẩu xác nhận không đúng');
        } else {
            Axios.post('/forgetpassword/newpass', {
                rePassInput,
                resetEmail,
            })
                .then((res) => {
                    if (res.data.affectedRows > 0) {
                        alert('Khôi phục tài khoản thành công');
                        window.open(window.location.origin, '_self');
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('reset-form')}>
                <div className={cx('input-item')}>
                    <label htmlFor="password" className={cx('label-item')}>
                        Mật khẩu mới
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={passInput}
                        className={cx('input-area')}
                        onChange={(e) => setPassInput(e.target.value)}
                        required
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="verify" className={cx('label-item')}>
                        Xác nhận mật khẩu
                    </label>
                    <input
                        type="password"
                        id="verify"
                        value={rePassInput}
                        className={cx('input-area')}
                        onChange={(e) => setRePassInput(e.target.value)}
                        required
                    />
                </div>
            </form>
            <button className={cx('submit-btn')} onClick={handleSubmit}>
                Xác nhận
            </button>
        </div>
    );
}

export default CreateNewPasword;
