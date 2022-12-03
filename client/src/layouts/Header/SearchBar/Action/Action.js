import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faShoppingCart } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Action.module.scss';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const userIsExisted = user && Object.keys(user).length !== 0;
const USER_OPTIONS = userIsExisted && [
    {
        choice: 'Thông tin tài khoản',
        path: `/user/profile/id/${user.roleAccess.data[0] === 0 ? user.userId : user.employeeId}`,
    },
    { choice: 'Đơn hàng', path: `/user/id/${user.roleAccess.data[0] === 0 ? user.userId : user.employeeId}/order` },
    { choice: 'Đăng xuất', path: '/' },
];

function Action() {
    const handleSignOut = (option, e) => {
        if (option === 'Đăng xuất') {
            localStorage.setItem('user', JSON.stringify({}));
            window.location.href(window.location.href);
        }
    };

    const [cartId, setCartId] = useState(null);
    const [numberOfProductInCart, setNumberOfProductInCart] = useState(null);

    useEffect(() => {
        userIsExisted &&
            user.roleAccess.data[0] === 0 &&
            axios
                .post('/user/cartId', {
                    userId: user.userId,
                })
                .then((res) => setCartId(res.data[0].cartId))
                .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (cartId !== null) {
            axios
                .post('/user/cart/cartId', {
                    cartId: cartId,
                })
                .then((res) => setNumberOfProductInCart(res.data.length))
                .catch((err) => console.log(err));
        }
    }, [cartId]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-icon')}>
                <FontAwesomeIcon icon={faUserAlt} />
                {userIsExisted && (
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
            <Link
                className={cx('cart-icon')}
                to={userIsExisted && user.roleAccess.data[0] === 0 && `/user/id/${user.userId}/cart`}
            >
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                {userIsExisted && user.roleAccess.data[0] === 0 && numberOfProductInCart !== null && (
                    <span className={cx('order-quantity')}>{numberOfProductInCart}</span>
                )}
            </Link>
        </div>
    );
}

export default Action;
