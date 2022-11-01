import classNames from 'classnames/bind';

import styles from './Payment.module.scss';

const cx = classNames.bind(styles);

function Payment() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thông tin thanh toán</h3>
            <div className={cx('payment-options')}>
                <div className={cx('payment-options-item')}>
                    <input type="radio" id="payment-cash" className={cx('payment-item')} name="payment" value="cash" />
                    <label htmlFor="payment-cash">Thanh toán khi nhận hàng</label>
                </div>
                <div className={cx('payment-options-item')}>
                    <input type="radio" id="payment-card" className={cx('payment-item')} name="payment" value="card" />
                    <label htmlFor="payment-card">Thanh toán bàng Mastercard VISA</label>
                </div>
            </div>
        </div>
    );
}

export default Payment;
