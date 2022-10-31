import classNames from 'classnames/bind';

import styles from './CreateNewPassword.module.scss';

const cx = classNames.bind(styles);

function CreateNewPasword() {
    return (
        <div className={cx('wrapper')}>
            <form className={cx('reset-form')}>
                <div className={cx('input-item')}>
                    <label htmlFor="password" className={cx('label-item')}>
                        Mật khẩu mới
                    </label>
                    <input type="password" id="password" className={cx('input-area')} required />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="verify" className={cx('label-item')}>
                        Xác nhận mật khẩu
                    </label>
                    <input type="password" id="verify" className={cx('input-area')} required />
                </div>
            </form>
            <button className={cx('submit-btn')}>Xác nhận</button>
        </div>
    );
}

export default CreateNewPasword;
