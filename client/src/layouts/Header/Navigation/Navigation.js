import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';
import classNames from 'classnames/bind';

import styles from './Navigation.module.scss';
import { publicRoutes } from '../../../routes';
import data from '../../../hardData';

const cx = classNames.bind(styles);

const MENU = [
    { title: 'Trang chủ', link: publicRoutes[0].path },
    { title: 'Tất cả sản phẩm', link: publicRoutes[1].path },
    { title: 'Cách chọn size', link: publicRoutes[2].path },
    { title: 'Liên hệ', link: publicRoutes[3].path },
    { title: 'Về chúng tôi', link: publicRoutes[4].path },
    { title: 'Giảm giá', link: publicRoutes[5].path },
];

function Navigation() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showProducts, setShowProducts] = useState(false);

    return (
        <div className={cx('wrapper')}>
            {MENU.map((item, index) => (
                <NavLink
                    className={(state) => {
                        state.isActive && setActiveIndex(index);
                        return cx('link-item', { active: index === activeIndex });
                    }}
                    key={index}
                    to={item.link}
                    onMouseOver={() => item.title === 'Tất cả sản phẩm' && setShowProducts(true)}
                    onMouseOut={() => item.title === 'Tất cả sản phẩm' && setShowProducts(false)}
                >
                    {item.title}
                    {item.title === 'Tất cả sản phẩm' && (
                        <FontAwesomeIcon className={cx('account-down-icon')} icon={faChevronDown} />
                    )}
                    {index === activeIndex ? <div className={cx('line-bar')}></div> : <></>}
                </NavLink>
            ))}
            {showProducts && (
                <div
                    className={cx('menu')}
                    onMouseOver={() => setShowProducts(true)}
                    onMouseOut={() => setShowProducts(false)}
                >
                    {data.productOptionsList.map((option, index) => (
                        <div key={index} className={cx('product-option-item')}>
                            <h4 className={cx('product-option-heading')}>{option.title}</h4>
                            {option.children && (
                                <div className={cx('product-option-detail-item')}>
                                    {option.children.map((optionChild, index) => (
                                        <div key={index} className={cx('type-info')}>
                                            {optionChild.list ? (
                                                <h3 className={cx('type-heading')}>{optionChild.name}</h3>
                                            ) : (
                                                <span className={cx('type-detail-item')}>{optionChild.name}</span>
                                            )}
                                            {optionChild.list && (
                                                <div className={cx('type-detail-info')}>
                                                    {optionChild.list.map((optionChildItem, index) => (
                                                        <span key={index} className={cx('type-detail-item')}>
                                                            {optionChildItem.type}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Navigation;
