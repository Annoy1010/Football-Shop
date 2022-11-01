import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';
import classNames from 'classnames/bind';

import styles from './Introduction.module.scss';
import configs from '../../../config';
import userLogin from '../../../user';

const cx = classNames.bind(styles);

const actions = [
    { title: 'Đăng ký', path: configs.routes.signup },
    { title: 'Đăng nhập', path: configs.routes.signin },
];
const user = userLogin;

function Introduction() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('website-name', 'title')}>
                <a href="/">Abc.com</a>
            </div>
            <div className={cx('account')}>
                {user ? (
                    <span className={cx('account-name', 'title')}>Người dùng</span>
                ) : (
                    <>
                        <span className={cx('account-name', 'title')}>Tài khoản</span>
                        <div className={cx('account-down-icon')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        <div className={cx('list')}>
                            {actions.map((action, index) => (
                                <NavLink key={index} className={cx('action-item')} to={action.path}>
                                    {action.title}
                                </NavLink>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Introduction;
