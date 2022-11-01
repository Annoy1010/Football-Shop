import classNames from 'classnames/bind';

import styles from './OrderInfo.module.scss';
import Products from './Products';
import Address from './Address';
import Payment from './Payment';
import user from '../../user';
import data from '../../hardData';
import { useState } from 'react';

const cx = classNames.bind(styles);

function OrderInfo() {
    const [total, setTotal] = useState(0);
    const productsOfUser = data.cart.filter((item) => item.userId === user)[0];

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>THÔNG TIN ĐẶT HÀNG</h3>
            <Products total={total} setTotal={setTotal} />
            <Address />
            <Payment />
            <div className={cx('product-order-price')}>
                <div className={cx('order-price')}>
                    <label>Tổng tiền hàng:</label>
                    <span>{total}đ</span>
                </div>
                <div className={cx('ship-price')}>
                    <label>Phí vận chuyển:</label>
                    <span>{productsOfUser.ship}đ</span>
                </div>
                <div className={cx('total-price')}>
                    <label>Tổng số tiền:</label>
                    <span>{total + productsOfUser.ship}đ</span>
                </div>
                <div className={cx('total-price', 'btn')}>
                    <button className={cx('order-btn')}>Đặt hàng</button>
                </div>
            </div>
        </div>
    );
}

export default OrderInfo;
