import classNames from 'classnames/bind';

import styles from './NewBank.module.scss';

const cx = classNames.bind(styles);

function NewBank({ onClick }) {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thêm thẻ</h3>
            <div className={cx('card-detail')}>
                <h3 className={cx('heading-card')}>
                    <span>Chi tiết thẻ</span>
                    <img src="https://cdn-icons-png.flaticon.com/512/5787/5787904.png" alt="" />
                </h3>
                <div className={cx('card-input')}>
                    <input className={cx('card-input-item')} placeholder="Số thẻ" />
                    <div className={cx('card-input-item-date')} placeholder="Ngày hết hạn">
                        <input className={cx('card-input-date-item')} placeholder="Ngày hết hạn" />
                        <input className={cx('card-input-date-item')} placeholder="CVV" />
                    </div>
                    <input className={cx('card-input-item')} placeholder="Họ và tên chủ thẻ" />
                </div>
            </div>
            <div className={cx('address-register')}>
                <h3 className={cx('heading-address')}>Địa chỉ đăng ký</h3>
                <div className={cx('address-input')}>
                    <input className={cx('address-input-item')} placeholder="Khu vực" />
                    <input className={cx('address-input-item')} placeholder="Chi nhánh" />
                </div>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={() => {}}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={onClick}>
                    Đóng
                </button>
            </div>
        </div>
    );
}

export default NewBank;
