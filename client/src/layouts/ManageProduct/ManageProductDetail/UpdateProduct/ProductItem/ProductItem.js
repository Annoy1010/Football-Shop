import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './ProductItem.module.scss';
import Price from './Price';
import Sale from './Sale';
import Desc from './Desc';

const cx = classNames.bind(styles);

function ProductItem({ product, index }) {
    const [updatePrice, setUpdatePrice] = useState(false);
    const [updateSale, setUpdateSale] = useState(false);
    const [updateDesc, setUpdateDesc] = useState(false);

    return (
        <div key={index} className={cx('wrapper')}>
            <div className={cx('product-img')}>
                <img src={product.mainImage} alt="" />
            </div>
            <div className={cx('product-desc')}>
                <span className={cx('product-name')}>{product.shoesName}</span>
                <div className={cx('option-btn')}>
                    <button className={cx('btn-change-price')} onClick={() => setUpdatePrice(true)}>
                        Giá tiền
                    </button>
                    <button className={cx('btn-change-sale')} onClick={() => setUpdateSale(true)}>
                        Giảm giá
                    </button>
                    <button className={cx('btn-change-desc')} onClick={() => setUpdateDesc(true)}>
                        Mô tả
                    </button>
                </div>
            </div>
            {updatePrice && <Price product={product} setUpdatePrice={setUpdatePrice} />}
            {updateSale && <Sale product={product} setUpdateSale={setUpdateSale} />}
            {updateDesc && <Desc product={product} setUpdateDesc={setUpdateDesc} />}
        </div>
    );
}

export default ProductItem;
