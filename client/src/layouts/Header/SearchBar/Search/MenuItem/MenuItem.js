import classNames from 'classnames/bind';

import styles from './MenuItem.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ item, index }) {
    return (
        <div key={index} className={cx('wrapper')}>
            <img src={item.img} alt="" className={cx('item-img')} />
            <div className={cx('item-info')}>
                <div className={cx('item-detail')}>
                    <span className={cx('item-name')}>{item.name}</span>
                    <span className={cx('item-size')}>{item.size}</span>
                </div>
                <div className={cx('item-price')}>
                    <span
                        className={cx('origin-price', {
                            sale: item.salePrice !== null,
                        })}
                    >
                        {item.originPrice}đ
                    </span>
                    {item.salePrice && <span className={cx('sale-price')}>{item.salePrice}đ</span>}
                </div>
            </div>
        </div>
    );
}

export default MenuItem;
