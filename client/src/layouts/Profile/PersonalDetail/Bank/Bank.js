import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Bank.module.scss';
import BankItem from './BankItem';
import NewBank from './NewBank';

const cx = classNames.bind(styles);

function Bank() {
    const [addButtonClicked, setAddButtonClicked] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Ngân hàng</h3>
            <BankItem defaultItem={true} />
            <button className={cx('add-bank-btn')} onClick={() => setAddButtonClicked(true)}>
                + Thêm thẻ mới
            </button>
            {addButtonClicked && <NewBank onClick={() => setAddButtonClicked(false)} />}
        </div>
    );
}

export default Bank;
