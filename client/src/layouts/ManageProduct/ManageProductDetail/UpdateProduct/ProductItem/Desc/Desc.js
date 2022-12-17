import classNames from 'classnames/bind';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import styles from './Desc.module.scss';
import notify from '../../../../../../components/ToastMessage';

const cx = classNames.bind(styles);

function Desc({ product, setUpdateDesc }) {
    const [desc, setDesc] = useState('');

    const handleSubmit = () => {
        if (desc === '') {
            notify('Vui lòng điền đầy đủ thông tin', 'warn', 2000);
        } else {
            axios
                .post('/products/update/desc', {
                    descriptionId: product.descriptionId,
                    desc,
                })
                .then((res) => {
                    if (res.data.affectedRows > 0) {
                        notify('Cập nhật mô tả thành công', 'success', 2000);
                        setUpdateDesc(false);
                        setTimeout(() => window.location.reload(), 2100);
                    }
                });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thông tin sản phẩm</h3>

            <div className={cx('employee-detail')}>
                <h3 className={cx('heading-address')}>Chi tiết mô tả</h3>
                <div className={cx('employee-input')}>
                    <input
                        className={cx('employee-input-item')}
                        value={`Mã sản phẩm: ${product.shoesId}`}
                        readOnly={true}
                    />
                </div>
                <div className={cx('employee-input')}>
                    <textarea
                        className={cx('employee-input-item')}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Mô tả"
                    />
                </div>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={handleSubmit}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={() => setUpdateDesc(false)}>
                    Đóng
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Desc;
