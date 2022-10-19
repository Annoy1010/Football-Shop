import classNames from 'classnames/bind';

import styles from './SignIn.module.scss';

const cx = classNames.bind(styles);

function SignIn() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('signin')}>
                <div className={cx('signin-type')}>
                    <form className={cx('form')} method="POST">
                        <div className={cx('input-item')}>
                            <label htmlFor="username" className={cx('label-item')}>
                                Tên đăng nhập
                            </label>
                            <input type="text" id="username" className={cx('input-area')} required />
                        </div>
                        <div className={cx('input-item')}>
                            <label htmlFor="password" className={cx('label-item')}>
                                Mật khẩu
                            </label>
                            <input type="password" id="password" className={cx('input-area')} required />
                        </div>
                    </form>
                    <button className={cx('submit-btn')}>Đăng nhập</button>
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
