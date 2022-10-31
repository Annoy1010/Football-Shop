import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

const subCategory = [
    { name: 'Hồ sơ', path: '' },
    { name: 'Ngân hàng', path: '' },
    { name: 'Địa chỉ', path: '' },
];

var indexActive = 0;

function Navigation() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleActive = (index) => {
        setActiveIndex(index);
        indexActive = index;
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('category-item')}>
                <h3 className={cx('heading-category-item')}>Tài khoản của tôi </h3>
            </div>
            <div className={cx('sub-category-list')}>
                {subCategory.map((subItem, index) => (
                    <Link
                        key={index}
                        className={cx('sub-category-item-link', {
                            active: index === activeIndex,
                        })}
                        to={window.location.pathname + subItem.path}
                        onClick={() => handleActive(index)}
                    >
                        {subItem.name}
                    </Link>
                ))}
            </div>
            <div className={cx('category-item')}>
                <h3 className={cx('heading-category-item')}>Đơn hàng</h3>
            </div>
        </div>
    );
}

export { indexActive };

export default Navigation;
