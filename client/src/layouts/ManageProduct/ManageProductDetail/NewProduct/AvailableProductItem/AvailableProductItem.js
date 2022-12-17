import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import styles from './AvailableProductItem.module.scss';
import ImportAvailableProduct from './ImportAvailableProduct';
import notify from '../../../../../components/ToastMessage';

const cx = classNames.bind(styles);

function AvailableProductItem({ product, index, importNewProductFormClick, setImportList }) {
    const [displayImportScreen, setDisplayImportScreen] = useState(false);

    const handleDisplayImportScreen = () => {
        if (!importNewProductFormClick) {
            notify('Vui lòng tạo phiếu nhập hàng trước khi nhập sản phẩm', 'warn', 2000)
           
        } else {
            setDisplayImportScreen(true);
        }
    };

    return (
        <div className={cx('wrapper')} key={index}>
            <div className={cx('product-img')}>
                <img src={product.mainImage} alt="" />
            </div>
            <div className={cx('product-desc')}>
                <span className={cx('product-name')}>{product.shoesName}</span>
                <button className={cx('btn-add-product')} onClick={handleDisplayImportScreen}>
                    + Nhập thêm số lượng
                </button>
            </div>
            {displayImportScreen && (
                <ImportAvailableProduct
                    product={product}
                    setDisplayImportScreen={setDisplayImportScreen}
                    setImportList={setImportList}
                />
            )}
            <ToastContainer />
        </div>
    );
}

AvailableProductItem.propTypes = {
    product: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    importNewProductFormClick: PropTypes.bool.isRequired,
    setImportList: PropTypes.func.isRequired,
};

export default AvailableProductItem;
