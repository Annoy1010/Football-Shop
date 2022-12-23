import classNames from 'classnames/bind';
import { useState } from 'react';
import Axios from 'axios';
import { ToastContainer } from 'react-toastify';
import notify from '../../../components/ToastMessage';

import styles from './CreateNewPassword.module.scss';

const cx = classNames.bind(styles);

function CreateNewPasword({ resetEmail }) {
    console.log('reset email: ', resetEmail);
    const [passInput, setPassInput] = useState('');
    const [rePassInput, setRePassInput] = useState('');

    const handleSubmit = () => {
        if (rePassInput !== passInput) {
            notify('Mật khẩu xác nhận không đúng', 'error', 2000);
        } else {
            Axios.post('/forgetpassword/newpass', {
                rePassInput,
                resetEmail,
            })
                .then((res) => {
                    if (res.data.affectedRows > 0) {
                        notify('Khôi phục tài khoản thành công', 'success', 2000);
                        setTimeout(() => window.open(window.location.origin, '_self'), 2100);
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
                    />
                </div>
            </form>
            <button className={cx('submit-btn')} onClick={handleSubmit}>
                Xác nhận
            </button>
            <ToastContainer />
        </div>
    );
}

export default CreateNewPasword;
