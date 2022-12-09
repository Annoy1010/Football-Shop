import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './ImportedProduct.module.scss';

const cx = classNames.bind(styles);

function ImportedProduct({ product }) {
    const [size, setSize] = useState('');

    useEffect(() => {
        axios
            .get('/products/size')
            .then((res) => {
                setSize(() => {
                    const sizeList = res.data.filter((item) => item.sizeId === product.sizeId);
                    return sizeList[0].sizeName;
                });
            })
            .catch((err) => console.log(err));
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-img')}>
                <img src={product.mainImage} alt=""></img>
            </div>
            <div className={cx('product-desc')}>
                <span className={cx('product-name')}>
                    <span className={cx('product-title')}>Tên sản phẩm: </span>
                    {product.shoesName}
                </span>
                <span className={cx('product-size')}>
                    <span className={cx('product-title')}>Kích thước: </span>
                    {size}
                </span>
                <span className={cx('product-quantity')}>
                    <span className={cx('product-title')}>Số lượng nhập: </span>
                    {product.shoesId ? product.quantity : product.importQuantity}
                </span>
                <span className={cx('product-price')}>
                    <span className={cx('product-title')}>Đơn giá: </span>
                    {product.price}
                </span>
                <span className={cx('product-total-price')}>
                    <span className={cx('product-title')}>Tổng đơn giá: </span>
                    {product.shoesId
                        ? product.price * (1 - product.sale / 100) * product.quantity
                        : product.price * (1 - product.sale / 100) * product.importQuantity}{' '}
                    VNĐ
                </span>
            </div>
        </div>
    );
}

export default ImportedProduct;
