import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './AddressItem.module.scss';

const cx = classNames.bind(styles);

function AddressItem({ defaultItem, user }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('personal-info')}>
                <span className={cx('personal-name')}>{user.name}</span>
                <span className={cx('personal-phone')}>{user.phone}</span>
            </div>
            <div className={cx('address-detail')}>
                <span>{`${user.address.street}, ${user.address.ward}`}</span>
            </div>
            <div className={cx('address-detail')}>
                <span>{`${user.address.district}, ${user.address.province}`}</span>
            </div>
            {defaultItem === true ? <span className={cx('address-default')}>Mặc định</span> : <></>}
        </div>
    );
}

AddressItem.prototype = {
    defaultItem: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};

export default AddressItem;
