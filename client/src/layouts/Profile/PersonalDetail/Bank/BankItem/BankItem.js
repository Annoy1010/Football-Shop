import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './BankItem.module.scss';

const cx = classNames.bind(styles);

function BankItem({ defaultItem }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('bank-img')}>
                <img src="https://cdn-icons-png.flaticon.com/512/195/195488.png" alt="" />
            </div>
            <div className={cx('bank-info')}>
                <div className={cx('bank-name')}>VCB</div>
                <div className={cx('bank-owner')}>
                    <b>Họ và tên: </b>LE THE PHUC
                </div>
                <div className={cx('bank-area')}>
                    <span className={cx('bank-area-name')}>
                        <b>Khu vực: </b>TP. Hồ Chí Minh
                    </span>
                    <span className={cx('bank-area-branch')}>
                        <b>Chi nhánh:</b> Thủ Đức
                    </span>
                </div>
            </div>
            {defaultItem === true ? <span className={cx('bank-default')}>Mặc định</span> : <></>}
        </div>
    );
}

BankItem.prototype = {
    defaultItem: PropTypes.bool,
};

export default BankItem;
