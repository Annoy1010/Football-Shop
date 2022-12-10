import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import styles from './OrderInfo.module.scss';
import Products from './Products';
import Address from './Address';
import Payment from './Payment';

const cx = classNames.bind(styles);

function OrderInfo() {
    const location = useLocation();
    const { userId, productList } = location.state;

    const [total, setTotal] = useState(0);
    const ship = 0;

    const handleOrder = () => {};

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>THÔNG TIN ĐẶT HÀNG</h3>
            <Products productList={productList} setTotal={setTotal} />
            <Address userId={userId} />
            <Payment />
            <div className={cx('product-order-price')}>
                <div className={cx('order-price')}>
                    <label>Tổng tiền hàng:</label>
                    <span>{total}đ</span>
                </div>
                <div className={cx('ship-price')}>
                    <label>Phí vận chuyển:</label>
                    <span>{ship}đ</span>
                </div>
                <div className={cx('total-price')}>
                    <label>Tổng số tiền:</label>
                    <span>{total + ship}đ</span>
                </div>
                <Link
                    className={cx('total-price', 'btn')}
                    to={`/user/id/${userId}/order`}
                    state={{ productList }}
                    onClick={handleOrder}
                >
                    <button className={cx('order-btn')}>Đặt hàng</button>
                </Link>
            </div>
        </div>
    );
}

export default OrderInfo;
