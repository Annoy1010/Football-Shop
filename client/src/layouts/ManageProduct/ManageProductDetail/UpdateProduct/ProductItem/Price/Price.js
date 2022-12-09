import classNames from 'classnames/bind';
import { useState } from 'react';
import axios from 'axios';

import styles from './Price.module.scss';

const cx = classNames.bind(styles);

function Price({ product, setUpdatePrice }) {
    const [price, setPrice] = useState('');

    const handleSubmit = () => {
        if (price === '') {
            alert('Vui lòng điền đầy đủ thông tin');
        } else {
            if (!Number.isInteger(Number.parseInt(price))) {
                alert('Vui lòng kiểm tra lại thông tin nhập');
            } else {
                axios
                    .post('/products/update/price', {
                        shoesId: product.shoesId,
                        price,
                    })
                    .then((res) => {
                        if (res.data.affectedRows > 0) {
                            alert('Cập nhật giá tiền thành công');
                            setUpdatePrice(false);
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
        </div>
    );
}

export default Price;
