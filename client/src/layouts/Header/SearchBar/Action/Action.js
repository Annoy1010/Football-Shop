import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faShoppingCart } from '@fortawesome/fontawesome-free-solid';
import classNames from 'classnames/bind';

import styles from './Action.module.scss';
import userLogin from '../../../../user';

const cx = classNames.bind(styles);

const user = userLogin;

const USER_OPTIONS = [
    { choice: 'Thông tin tài khoản' },
    { choice: 'Đơn hàng' },
    { choice: 'Đổi mật khẩu' },
    { choice: 'Đăng xuất' },
];

function Action() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-icon')}>
                <FontAwesomeIcon icon={faUserAlt} />
                {user && (
                    <div className={cx('menu')}>
                        {USER_OPTIONS.map((option, index) => (
                            <span className={cx('menu-item')} key={index}>
                                {option.choice}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className={cx('cart-icon')}>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                {user ? <span className={cx('order-quantity')}>2</span> : <></>}
            </div>
        </div>
    );
}

export default Action;
