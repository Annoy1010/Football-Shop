import classNames from 'classnames/bind';

import styles from './Payment.module.scss';

const cx = classNames.bind(styles);

function Payment({ setPaymentId }) {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thông tin thanh toán</h3>
            <div className={cx('payment-options')}>
                <div className={cx('payment-options-item')}>
                    <input
                        type="radio"
                        id="payment-cash"
                        className={cx('payment-item')}
                        name="payment"
                        value="1"
                        onChange={(e) => setPaymentId(e.target.value)}
                    />
                    <label htmlFor="payment-cash">Thanh toán khi nhận hàng</label>
                </div>
                <div className={cx('payment-options-item')}>
                    <input
                        type="radio"
                        id="payment-card"
                        className={cx('payment-item')}
                        name="payment"
                        value="2"
                        onChange={(e) => setPaymentId(e.target.value)}
                    />
                    <label htmlFor="payment-card">Thanh toán bằng Mastercard VISA</label>
                </div>
            </div>
        </div>
    );
}

export default Payment;
