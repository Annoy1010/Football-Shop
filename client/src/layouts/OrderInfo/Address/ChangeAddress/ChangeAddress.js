import classNames from 'classnames/bind';

import styles from './ChangeAddress.module.scss';
import DetailAddressItem from './DetailAddressItem';

const cx = classNames.bind(styles);

function ChangeAddress({ setChangeButtonClicked, setAddressId, userAddress, addressId }) {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Danh sách các địa chỉ</h3>
            <div className={cx('address-register')}>
                {userAddress.map((item, index) => (
                    <DetailAddressItem index={index} address={item} setAddressId={setAddressId} addressId={addressId} />
                ))}
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={() => setChangeButtonClicked(false)}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={() => setChangeButtonClicked(false)}>
                    Đóng
                </button>
            </div>
        </div>
    );
}

export default ChangeAddress;
