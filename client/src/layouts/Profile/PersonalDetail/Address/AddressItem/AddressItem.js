import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './AddressItem.module.scss';

const cx = classNames.bind(styles);

function AddressItem({ defaultItem }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('personal-info')}>
                <span className={cx('personal-name')}>Lê Thế Phúc</span>
                <span className={cx('personal-phone')}>0368341595</span>
            </div>
            <div className={cx('address-detail')}>
                <span>Bưu điện Linh Trung, Đường số 4</span>
            </div>
            <div className={cx('address-detail')}>
                <span>Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh</span>
            </div>
            {defaultItem === true ? <span className={cx('address-default')}>Mặc định</span> : <></>}
        </div>
    );
}

AddressItem.prototype = {
    defaultItem: PropTypes.bool,
};

export default AddressItem;
