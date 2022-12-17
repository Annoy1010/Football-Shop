import classNames from 'classnames/bind';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import styles from './Price.module.scss';
import notify from '../../../../../../components/ToastMessage';

const cx = classNames.bind(styles);

function Price({ product, setUpdatePrice }) {
    const [price, setPrice] = useState('');

    const handleSubmit = () => {
        if (price === '') {
            notify('Vui lòng điền đầy đủ thông tin', 'warn', 2000);
        } else {
            if (!Number.isInteger(Number.parseInt(price))) {
                notify('Vui lòng kiểm tra lại thông tin nhập', 'warn', 2000);
            } else {
                axios
                    .post('/products/update/price', {
                        shoesId: product.shoesId,
                        price,
                    })
                    .then((res) => {
                        if (res.data.affectedRows > 0) {
                            notify('Cập nhật giá tiền thành công', 'success', 2000);
                            setUpdatePrice(false);
                            setTimeout(() => window.location.reload(), 2100);
                        }
                    });
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thông tin sản phẩm</h3>

            <div className={cx('employee-detail')}>
                <h3 className={cx('heading-address')}>Chi tiết giá tiền</h3>
                <div className={cx('employee-input')}>
                    <input
                        className={cx('employee-input-item')}
                        value={`Mã sản phẩm: ${product.shoesId}`}
                        readOnly={true}
                    />
                </div>
                <div className={cx('employee-input')}>
                    <input
                        className={cx('employee-input-item')}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder={`Giá tiền: ${product.price}VNĐ`}
                    />
                </div>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={handleSubmit}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={() => setUpdatePrice(false)}>
                    Đóng
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Price;
