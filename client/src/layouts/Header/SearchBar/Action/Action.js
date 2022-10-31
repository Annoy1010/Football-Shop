import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faShoppingCart } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Action.module.scss';
import userLogin from '../../../../user';
import configs from '../../../../config';

const cx = classNames.bind(styles);

const user = userLogin;

const USER_OPTIONS = [
    { choice: 'Thông tin tài khoản', path: `/user/profile/id/${user}` },
    { choice: 'Đơn hàng', path: `/user/id/${user}/order` },
    { choice: 'Đăng xuất', path: configs.routes.home },
];

function Action() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-icon')}>
                <FontAwesomeIcon icon={faUserAlt} />
                {user && (
                    <div className={cx('menu')}>
                        {USER_OPTIONS.map((option, index) => (
                            <Link className={cx('menu-item')} key={index} to={option.path}>
                                {option.choice}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <Link className={cx('cart-icon')} to={`/user/id/${user}/cart`}>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                {user ? <span className={cx('order-quantity')}>2</span> : <></>}
            </Link>
        </div>
    );
}

export default Action;
