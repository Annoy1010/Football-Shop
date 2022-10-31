import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './OrderItem.module.scss';
import data from '../../../hardData';

const cx = classNames.bind(styles);

function OrderItem({ product, index }) {
    const productOrder = data.products.filter((productItem) => productItem.id === product.productId)[0];

    return (
        <div key={index} className={cx('wrapper')}>
            <div className={cx('product-img')}>
                <img src={productOrder.src} alt="" />
            </div>
            <div className={cx('product-desc')}>
                <span className={cx('product-name')}>{productOrder.name}</span>
                <span className={cx('product-size')}>{product.size}</span>
            </div>
            <div className={cx('product-quantity')}>
                <span>{product.quantity}</span>
            </div>
        </div>
    );
}

OrderItem.proptype = {
    product: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

export default OrderItem;
