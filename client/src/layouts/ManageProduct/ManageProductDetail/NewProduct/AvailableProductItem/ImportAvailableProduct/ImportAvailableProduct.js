import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import styles from './ImportAvailableProduct.module.scss';
import notify from '../../../../../../components/ToastMessage';

const cx = classNames.bind(styles);

function ImportAvailableProduct({ product, setDisplayImportScreen, setImportList }) {
    const [sizeList, setSizeList] = useState([]);
    const [sizeId, setSizeId] = useState(null);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [inputQuantity, setInputQuantity] = useState(0);

    useEffect(() => {
        axios
            .get('/products/size')
            .then((res) => setSizeList(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (sizeId !== null) {
            axios
                .post('/products/size/availableQuantity', {
                    shoesId: product.shoesId.toString(),
                    sizeId,
                })
                .then((res) => {
                    if (res.data.length > 0) {
                        setAvailableQuantity(res.data[0].quantity);
                    } else {
                        setAvailableQuantity(0);
                    }
                })
                .catch((err) => console.log(err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sizeId]);

    const handleOnChangeSize = (e) => {
        if (e.target.value !== '') {
            setSizeId(e.target.value);
        } else {
            setSizeId(null);
        }
        setInputQuantity(0);
    };

    const handeSubmitAddAvailableProduct = () => {
        if (sizeId === null) {
            notify('Vui lòng chọn size giày', 'warn', 2000);
        } else {
            if (Number.parseInt(inputQuantity) >= 0) {
                product.sizeId = sizeId;
                product.quantity = Number.parseInt(inputQuantity);
            } else {
                notify('Nhập sai định dạng số lượng nhập', 'error', 2000);
            }
        }
        setImportList((state) => [...state, product]);
        setDisplayImportScreen(false);
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Nhập thêm số lượng sản phẩm</h3>

            <div className={cx('quantity-detail')}>
                <h3 className={cx('heading-quantity')}>Chi tiết thông tin</h3>
                <div className={cx('quantity-input')}>
                    <div className={cx('info-item')}>
                        <label className={cx('label-input')}>Mã sản phẩm</label>
                        <input className={cx('quantity-input-item')} value={product.shoesId} readOnly />
                    </div>
                    <div className={cx('info-item')}>
                        <label className={cx('label-input')}>Tên sản phẩm</label>
                        <input className={cx('quantity-input-item')} value={product.shoesName} readOnly />
                    </div>
                    <div className={cx('info-item')}>
                        <label className={cx('label-input')}>Kích thước</label>
                        <select className={cx('quantity-input-item')} onChange={(e) => handleOnChangeSize(e)}>
                            <option value="" className={cx('option-item')}>
                                Chọn size
                            </option>
                            {sizeList.length > 0 &&
                                sizeList.map((item, index) => (
                                    <option key={index} value={item.sizeId} className={cx('option-item')}>
                                        {item.sizeName}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className={cx('info-item')}>
                        <label className={cx('label-input')}>Số lượng còn sẵn</label>
                        <input
                            className={cx('quantity-input-item')}
                            value={availableQuantity === null ? '' : availableQuantity}
                            readOnly
                        />
                    </div>

                    <div className={cx('info-item')}>
                        <label className={cx('label-input')}>Số lượng nhập mới</label>
                        <input
                            className={cx('quantity-input-item')}
                            value={inputQuantity}
                            onChange={(e) => setInputQuantity(e.target.value)}
                            placeholder="Số lượng nhập"
                        />
                    </div>
                </div>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={handeSubmitAddAvailableProduct}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={() => setDisplayImportScreen(false)}>
                    Đóng
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

ImportAvailableProduct.propTypes = {
    product: PropTypes.object.isRequired,
    setDisplayImportScreen: PropTypes.func.isRequired,
    setImportList: PropTypes.func.isRequired,
};

export default ImportAvailableProduct;
