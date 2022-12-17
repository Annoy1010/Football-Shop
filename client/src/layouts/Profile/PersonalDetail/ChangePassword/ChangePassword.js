import classNames from 'classnames/bind';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import styles from './ChangePassword.module.scss';
import notify from '../../../../components/ToastMessage';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const email = user && Object.keys(user).length > 0 && user.email;

function ChangePassword() {
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [reNewPass, setReNewPass] = useState('');

    const handleOnSubmit = () => {
        if (!currentPass || !newPass || !reNewPass) {
            notify('Vui lòng điền đầy đủ các trường thông tin', 'warn', 2000);
        } else {
            axios
                .post('/user/submit/currentpass', {
                    email,
                    currentPass,
                })
                .then((res) => {
                    if (res.data.length === 0) {
                        notify('Mật khẩu hiện tại không chính xác', 'error', 2000);
                    } else {
                        if (newPass !== reNewPass) {
                            notify('Mật khẩu xác nhận không chính xác', 'error', 2000);
                        } else {
                            axios
                                .post('/user/password/newpass', {
                                    email,
                                    newPass,
                                })
                                .then((res) => {
                                    if (res.data.affectedRows > 0) {
                                        notify('Thay đổi mật khẩu thành công', 'success', 2000);
                                        setCurrentPass('');
                                        setNewPass('');
                                        setReNewPass('');
                                    }
                                })
                                .catch((err) => console.log(err));
                        }
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Đổi mật khẩu</h3>
            <span className={cx('note')}>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</span>
            <form className={cx('form-password')}>
                <div className={cx('input-password-item')}>
                    <label htmlFor="current-password">Mật khẩu hiện tại</label>
                    <input
                        type="password"
                        id="current-password"
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                    />
                </div>
                <div className={cx('input-password-item')}>
                    <label htmlFor="new-password">Mật khẩu mới</label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                    />
                </div>
                <div className={cx('input-password-item')}>
                    <label htmlFor="submit-password">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        id="submit-password"
                        value={reNewPass}
                        onChange={(e) => setReNewPass(e.target.value)}
                    />
                </div>
            </form>
            <button className={cx('submit-btn')} onClick={handleOnSubmit}>
                Xác nhận
            </button>
            <ToastContainer />
        </div>
    );
}

export default ChangePassword;
