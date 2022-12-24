import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import styles from './Field.module.scss';
import data from '../../../hardData';

const cx = classNames.bind(styles);

function Field() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
    return (
        <div className={cx('wrapper')} data-aos="fade-up">
            <h3 className={cx('heading')}>CHỌN GIÀY THEO MẶT SÂN</h3>
            <div className={cx('product-list')}>
                {data.productsOfField.map((item, index) => (
                    <div key={index} className={cx('product-item')} data-aos="fade-up">
                        <img className={cx('product-image')} src={item.src} alt="" />
                        <div className={cx('product-intro')}>
                            <div className={cx('product-desc')}>
                                <h3 className={cx('product-title')}>{item.name}</h3>
                                <span className={cx('product-desc')}>{item.desc}</span>
                            </div>
                            <Link
                                className={cx('product-view-btn')}
                                to="/products"
                                state={{ field: item.id, trademark: null, position: null }}
                            >
                                Xem ngay
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Field;
