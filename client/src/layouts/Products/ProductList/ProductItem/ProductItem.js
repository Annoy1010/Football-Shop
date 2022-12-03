import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem({ product }) {
    return (
        <>
            <div className={cx('product-img')}>
                <img src={product.mainImage} alt="" />
            </div>
            <div className={cx('product-desc')}>
                <div className={cx('product-id')}>Mã sản phẩm: {product.shoesId}</div>
                <div className={cx('product-price')}>
                    {/* {product.price}đ */}
                    <span
                        className={cx('product-price-origin', {
                            saled: product.sale !== 0 ? true : false,
                        })}
                    >
                        {product.price}đ
                    </span>
                    {product.sale !== 0 ? (
                        <span className={cx('product-price-sale')}>
                            {(product.price * (1 - product.sale / 100)).toFixed(0)}đ
                        </span>
                    ) : (
                        <></>
                    )}
                </div>
                <span className={cx('product-name')}>{product.shoesName}</span>
            </div>
            {product.sale !== 0 && <span className={cx('product-sale')}>{product.sale}%</span>}
        </>
    );
}

export default ProductItem;
