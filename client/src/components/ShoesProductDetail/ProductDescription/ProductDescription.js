import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './ProductDescription.module.scss';
const cx = classNames.bind(styles);

function ProductDescription({ product }) {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Mô tả sản phẩm</h3>
            <div className={cx('product-desc')}>
                <div className={cx('product-item')}>
                    <span className={cx('product-item-name')}>
                        <b>Tên giày</b>
                    </span>
                    <span className={cx('product-item-desc')}>{product.name}</span>
                </div>
                <div className={cx('product-item')}>
                    <span className={cx('product-item-name')}>
                        <b>Loại sân thi đấu</b>
                    </span>
                    <span className={cx('product-item-desc')}>{product.field}</span>
                </div>
                <div className={cx('product-item')}>
                    <span className={cx('product-item-name')}>
                        <b>Nhãn hiệu</b>
                    </span>
                    <span className={cx('product-item-desc')}>{product.trademark}</span>
                </div>
                <div className={cx('product-item')}>
                    <span className={cx('product-item-name')}>
                        <b>Xuất sứ</b>
                    </span>
                    <span className={cx('product-item-desc')}>{product.originNational}</span>
                </div>
                <div className={cx('product-item')}>
                    <span className={cx('product-item-name')}>
                        <b>Mô tả chi tiết</b>
                    </span>
                    <span className={cx('product-item-desc')}>Sản phẩm được nhiều khách hàng quan tâm</span>
                </div>
            </div>
        </div>
    );
}

ProductDescription.prototype = {
    product: PropTypes.object.isRequired,
};

export default ProductDescription;
