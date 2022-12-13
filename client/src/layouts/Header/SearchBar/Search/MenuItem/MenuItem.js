import classNames from 'classnames/bind';

import styles from './MenuItem.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ item, index }) {
    return (
        <div key={index} className={cx('wrapper')}>
            <img src={item.mainImage} alt="" className={cx('item-img')} />
            <div className={cx('item-info')}>
                <div className={cx('item-detail')}>
                    <span className={cx('item-name')}>{item.shoesName}</span>
                    <span className={cx('item-size')}>{item.sizeId}</span>
                </div>
                <div className={cx('item-price')}>
                    <span
                        className={cx('origin-price', {
                            sale: item.sale > 0,
                        })}
                    >
                        {item.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </span>
                    {item.sale > 0 && (
                        <span className={cx('sale-price')}>
                            {item.price *
                                (1 - item.sale).toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MenuItem;
