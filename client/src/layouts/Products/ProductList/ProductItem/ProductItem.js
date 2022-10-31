import classNames from 'classnames/bind';

import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem({ product }) {
    return (
        <>
            <img className={cx('product-img')} src={product.src} alt="" width={'100%'} />
            <div className={cx('product-desc')}>
                <div className={cx('product-id')}>Mã sản phẩm: {product.id}</div>
                <div className={cx('product-price')}>{product.price}đ</div>
                <div className={cx('product-size-list')}>
                    {product.size.map((sizeItem, sizeIndex) => (
                        <div
                            key={sizeIndex}
                            className={cx('product-size-item', {
                                'stock-size': !product.availableSize.includes(sizeItem),
                            })}
                        >
                            {sizeItem}
                        </div>
                    ))}
                </div>
                <span className={cx('product-name')}>{product.name}</span>
            </div>
            {product.sale && <span className={cx('product-sale')}>{product.sale}%</span>}
        </>
    );
}

export default ProductItem;
