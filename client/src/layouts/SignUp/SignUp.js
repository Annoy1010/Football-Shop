import classNames from 'classnames/bind';

import styles from './SignUp.module.scss';

const cx = classNames.bind(styles);

function SignUp() {
    return (
        <div className={cx('wrapper')}>
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
                <div className={cx('input-item')}>
                    <label htmlFor="fullname" className={cx('label-item')}>
                        Họ và tên
                    </label>
                    <input type="text" id="fullname" className={cx('input-area')} required />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="email" className={cx('label-item')}>
                        Email
                    </label>
                    <input type="email" id="email" className={cx('input-area')} required />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="phone" className={cx('label-item')}>
                        Số điện thoại
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className={cx('input-area')}
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        required
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="province" className={cx('label-item')}>
                        Tỉnh
                    </label>
                    <select id="province" className={cx('input-area')} required>
                        <option className={cx('option-value')} selected="selected">
                            Chọn Tỉnh/Thành phố
                        </option>
                        <option className={cx('option-value')}>Daklak</option>
                    </select>
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="district" className={cx('label-item')}>
                        Huyện
                    </label>
                    <select id="district" className={cx('input-area')} required>
                        <option className={cx('option-value')} selected="selected">
                            Chọn Quận/Huyện
                        </option>
                        <option className={cx('option-value')}>Krông Ana</option>
                    </select>
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="ward" className={cx('label-item')}>
                        Xã
                    </label>
                    <select id="ward" className={cx('input-area')} required>
                        <option className={cx('option-value')} selected="selected">
                            Chọn Phường/Xã
                        </option>
                        <option className={cx('option-value')}>Eabong</option>
                    </select>
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="detail-address" className={cx('label-item')}>
                        Địa chỉ chi tiết
                    </label>
                    <input type="text" id="detail-address" className={cx('input-area')} required />
                </div>
            </form>
            <button className={cx('submit-btn')}>Đăng ký</button>
        </div>
    );
}

export default SignUp;
