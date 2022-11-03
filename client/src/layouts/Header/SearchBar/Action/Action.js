import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faShoppingCart } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Action.module.scss';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const userIsNotExisted = user && Object.keys(user).length === 0 && Object.getPrototypeOf(user) === Object.prototype;

const USER_OPTIONS = [
    { choice: 'Thông tin tài khoản', path: `/user/profile/id/${user.userId}` },
    { choice: 'Đơn hàng', path: `/user/id/${user.userId}/order` },
    { choice: 'Đăng xuất', path: '/' },
];

function Action() {
    const handleSignOut = (option, e) => {
        if (option !== 'Đăng xuất') {
            e.preventDefault();
        } else {
            localStorage.setItem('user', JSON.stringify({}));
            window.location.reload();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-icon')}>
                <FontAwesomeIcon icon={faUserAlt} />
                {!userIsNotExisted && (
                    <div className={cx('menu')}>
                        {USER_OPTIONS.map((option, index) => (
                            <Link
                                className={cx('menu-item')}
                                key={index}
                                to={option.path}
                                onClick={(e) => handleSignOut(option.choice, e)}
                            >
                                {option.choice}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <Link className={cx('cart-icon')} to={`/user/id/${user}/cart`}>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                {!userIsNotExisted && <span className={cx('order-quantity')}>2</span>}
            </Link>
        </div>
    );
}

export default Action;
