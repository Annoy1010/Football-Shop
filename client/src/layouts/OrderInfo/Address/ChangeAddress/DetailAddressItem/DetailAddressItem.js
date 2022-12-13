import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';

import styles from './DetailAddressItem.module.scss';
const cx = classNames.bind(styles);

function DetailAddressItem({ index, address, setAddressId, addressId }) {
    return (
        <div key={index} className={cx('wrapper')} onClick={() => setAddressId(address.addressId)}>
            <div className={cx('address-info')}>
                <div className={cx('address-detail')}>
                    <span>{`${address.detailAddress}, ${address.wardName}`}</span>
                </div>
                <div className={cx('address-detail')}>
                    <span>{`${address.districtName}, ${address.provinceName}`}</span>
                </div>
            </div>
            {address.addressId === addressId && <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />}
        </div>
    );
}

export default DetailAddressItem;
