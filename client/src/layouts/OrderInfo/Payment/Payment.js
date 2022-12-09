import classNames from 'classnames/bind';

import styles from './Payment.module.scss';

const cx = classNames.bind(styles);

function Payment({paymentmethods, setPaymentMethods}) {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thông tin thanh toán</h3>
            <div className={cx('payment-options')}>
                <div className={cx('payment-options-item')}>
                    <input type="radio" id="payment-cash" className={cx('payment-item')} name="payment" value="cash" checked = {paymentmethods === 0}  onChange={(e) => setPaymentMethods(0)}/>
                    <label htmlFor="payment-cash">Thanh toán khi nhận hàng</label>
                </div>
                <div className={cx('payment-options-item')}>
                    <input type="radio" id="payment-card" className={cx('payment-item')} name="payment" value="card" checked = {paymentmethods === 1} onChange={(e) => setPaymentMethods(1)}/>
                    <label htmlFor="payment-card">Thanh toán bàng Mastercard VISA</label>
                </div>
            </div>
            {console.log("Phuong thuc thanh toan: " + paymentmethods)}
        </div>
    );
}

export default Payment;
