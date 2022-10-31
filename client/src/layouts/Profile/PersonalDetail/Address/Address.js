import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Address.module.scss';
import AddressItem from './AddressItem';
import NewAddress from './NewAddress';

const cx = classNames.bind(styles);

function Address() {
    const [addButtonClicked, setAddButtonClicked] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Địa chỉ</h3>
            <AddressItem defaultItem={true} />
            <button className={cx('add-address-btn')} onClick={() => setAddButtonClicked(true)}>
                + Thêm địa chỉ mới
            </button>
            {addButtonClicked && <NewAddress onClick={() => setAddButtonClicked(false)} />}
        </div>
    );
}

export default Address;
