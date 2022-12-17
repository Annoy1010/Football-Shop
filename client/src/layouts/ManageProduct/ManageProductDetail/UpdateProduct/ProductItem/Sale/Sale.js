import classNames from 'classnames/bind';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import styles from './Sale.module.scss';
import notify from '../../../../../../components/ToastMessage';

const cx = classNames.bind(styles);

function Sale({ product, setUpdateSale }) {
    const [sale, setSale] = useState('');

    const handleSubmit = () => {
        if (sale === '') {
            notify('Vui lòng điền đầy đủ thông tin', 'warn', 2000);
        } else {
            if (!Number.isInteger(Number.parseInt(sale))) {
                notify('Vui lòng kiểm tra lại thông tin nhập', 'warn', 2000);
            } else {
                axios
                    .post('/products/update/sale', {
                        shoesId: product.shoesId,
                        sale,
                    })
                    .then((res) => {
                        if (res.data.affectedRows > 0) {
                            notify('Cập nhật giảm giá thành công', 'success', 2000);
                            setUpdateSale(false);
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
                <h3 className={cx('heading-address')}>Chi tiết giảm giá</h3>
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
                        value={sale}
                        onChange={(e) => setSale(e.target.value)}
                        placeholder={`Giảm giá: ${product.sale}%`}
                    />
                </div>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={handleSubmit}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={() => setUpdateSale(false)}>
                    Đóng
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Sale;
