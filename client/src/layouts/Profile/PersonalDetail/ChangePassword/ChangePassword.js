import classNames from 'classnames/bind';

import styles from './ChangePassword.module.scss';

const cx = classNames.bind(styles);

function ChangePassword() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Đổi mật khẩu</h3>
            <span className={cx('note')}>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</span>
            <form className={cx('form-password')}>
                <div className={cx('input-password-item')}>
                    <label htmlFor="current-password">Mật khẩu hiện tại</label>
                    <input type="password" id="current-password" />
                </div>
                <div className={cx('input-password-item')}>
                    <label htmlFor="new-password">Mật khẩu mới</label>
                    <input type="password" id="new-password" />
                </div>
                <div className={cx('input-password-item')}>
                    <label htmlFor="submit-password">Xác nhận mật khẩu</label>
                    <input type="password" id="submit-password" />
                </div>
            </form>
            <button className={cx('submit-btn')}>Xác nhận</button>
        </div>
    );
}

export default ChangePassword;
