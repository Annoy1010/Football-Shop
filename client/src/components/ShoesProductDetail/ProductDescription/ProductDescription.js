import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './ProductDescription.module.scss';
const cx = classNames.bind(styles);

function ProductDescription({ product }) {
    const [originalList, setOriginalList] = useState([]);
    const [grassList, setGrassList] = useState([]);
    const [descList, setDescList] = useState('');

    useEffect(() => {
        axios
            .get('/products/originNational')
            .then((res) => setOriginalList(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/products/grass')
            .then((res) => setGrassList(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/products/desc')
            .then((res) => setDescList(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Mô tả sản phẩm</h3>
            <div className={cx('product-desc')}>
                <div className={cx('product-item')}>
                    <span className={cx('product-item-name')}>
                        <b>Tên giày</b>
                    </span>
                    <span className={cx('product-item-desc')}>{product.shoesName}</span>
                </div>
                <div className={cx('product-item')}>
                    <span className={cx('product-item-name')}>
                        <b>Loại sân thi đấu</b>
                    </span>
                    <span className={cx('product-item-desc')}>
                        {grassList &&
                            grassList.length > 0 &&
                            grassList.filter((item) => item.grassId === product.grassId)[0].fieldName}
                    </span>
                </div>
                <div className={cx('product-item')}>
                    <span className={cx('product-item-name')}>
                        <b>Nhãn hiệu</b>
                    </span>
                    <span className={cx('product-item-desc')}>{product.trademarkId}</span>
                </div>
                <div className={cx('product-item')}>
                    <span className={cx('product-item-name')}>
                        <b>Xuất sứ</b>
                    </span>
                    <span className={cx('product-item-desc')}>
                        {originalList &&
                            originalList.length > 0 &&
                            originalList.filter((item) => item.nationalId === product.originNationalId)[0].nationalName}
                    </span>
                </div>
                <div className={cx('product-item')}>
                    <span className={cx('product-item-name')}>
                        <b>Mô tả chi tiết</b>
                    </span>
                    <span className={cx('product-item-desc')}>
                        {(descList &&
                            descList.length > 0 &&
                            descList.filter((item) => item.descriptionId === product.descriptionId)[0].content) ||
                            'Chưa có mô tả cho sản phẩm'}
                    </span>
                </div>
            </div>
        </div>
    );
}

ProductDescription.prototype = {
    product: PropTypes.object.isRequired,
};

export default ProductDescription;
