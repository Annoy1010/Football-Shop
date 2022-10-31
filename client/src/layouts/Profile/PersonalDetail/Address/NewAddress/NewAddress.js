import classNames from 'classnames/bind';

import styles from './NewAddress.module.scss';

const cx = classNames.bind(styles);

function NewAddress({ onClick }) {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thêm địa chỉ</h3>

            <div className={cx('address-register')}>
                <h3 className={cx('heading-address')}>Chi tiết địa chỉ</h3>
                <div className={cx('address-input')}>
                    <input className={cx('address-input-item')} placeholder="Tỉnh thành" />
                    <input className={cx('address-input-item')} placeholder="Quận huyện" />
                    <input className={cx('address-input-item')} placeholder="Xã phường" />
                    <input className={cx('address-input-item')} placeholder="Địa chỉ chi tiết" />
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

export default NewAddress;
