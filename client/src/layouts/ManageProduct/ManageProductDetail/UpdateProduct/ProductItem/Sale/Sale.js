import classNames from 'classnames/bind';
import axios from 'axios';
import { useState } from 'react';

import styles from './Sale.module.scss';

const cx = classNames.bind(styles);

function Sale({ product, setUpdateSale }) {
    const [sale, setSale] = useState('');

    const handleSubmit = () => {
        if (sale === '') {
            alert('Vui lòng điền đầy đủ thông tin');
        } else {
            if (!Number.isInteger(Number.parseInt(sale))) {
                alert('Vui lòng kiểm tra lại thông tin nhập');
            } else {
                axios
                    .post('/products/update/sale', {
                        shoesId: product.shoesId,
                        sale,
                    })
                    .then((res) => {
                        if (res.data.affectedRows > 0) {
                            alert('Cập nhật giảm giá thành công');
                            setUpdateSale(false);
                            window.location.reload();
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
        </div>
    );
}

export default Sale;
