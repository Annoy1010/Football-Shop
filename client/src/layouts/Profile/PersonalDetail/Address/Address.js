import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Address.module.scss';
import AddressItem from './AddressItem';
import NewAddress from './NewAddress';
import user from '../../../../user';
import data from '../../../../hardData';

const cx = classNames.bind(styles);

function Address() {
    const currentUser = data.user.filter((userItem) => userItem.id === user)[0];

    const [addButtonClicked, setAddButtonClicked] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Địa chỉ</h3>
            <AddressItem defaultItem={true} user={currentUser} />
            <button className={cx('add-address-btn')} onClick={() => setAddButtonClicked(true)}>
                + Thêm địa chỉ mới
            </button>
            {addButtonClicked && <NewAddress onClick={() => setAddButtonClicked(false)} />}
        </div>
    );
}

export default Address;
