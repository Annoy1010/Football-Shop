import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';

import styles from './Introduction.module.scss';
import configs from '../../../config';

const cx = classNames.bind(styles);

const actions = [
    { title: 'Đăng ký', path: configs.routes.signup },
    { title: 'Đăng nhập', path: configs.routes.signin },
];

const user = JSON.parse(localStorage.getItem('user'));

function Introduction() {
    const [store, setStore] = useState({});
    useEffect(() => {
        Axios.get('/store')
            .then((res) => setStore(res.data[0]))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('website-name', 'title')}>
                <a href="/">{store && store.storeName}</a>
            </div>
            <div className={cx('account')}>
                {!(user && Object.keys(user).length === 0) ? (
                    <span className={cx('account-name', 'title')}>{`Xin chào, ${user.fullName}`}</span>
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
