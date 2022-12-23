import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';
import classNames from 'classnames/bind';

import styles from './Navigation.module.scss';
import configs from '../../../config';
import data from '../../../hardData';

const cx = classNames.bind(styles);

const MENU = [
    { title: 'Trang chủ', link: configs.routes.home },
    { title: 'Tất cả sản phẩm', link: configs.routes.products },
    { title: 'Cách chọn size', link: configs.routes.size },
    { title: 'Liên hệ', link: configs.routes.contact },
    { title: 'Về chúng tôi', link: configs.routes.about },
    { title: 'Giảm giá', link: configs.routes.sale },
];

const MENU_ADMIN = [
    { title: 'Trang chủ', link: configs.routes.home },
    { title: 'Quản lý sản phẩm', link: configs.routes.manageProducts },
    { title: 'Quản lý đơn hàng', link: configs.routes.manageOrders },
    { title: 'Quản lý nhân viên', link: configs.routes.manageEmployees },
];

const account = JSON.parse(localStorage.getItem('user'));

const admin =
    account && Object.keys(account).length !== 0 && JSON.parse(localStorage.getItem('user')).roleAccess.data[0];

function Navigation() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showProducts, setShowProducts] = useState(false);

    return (
        <div className={cx('wrapper')}>
            {admin
                ? MENU_ADMIN.map((item, index) => (
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
                  ))
                : MENU.map((item, index) => (
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
