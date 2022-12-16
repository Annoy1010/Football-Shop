import classNames from 'classnames/bind';
import { useState,useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
//import axios from 'axios';

import styles from './Field.module.scss';
import data from '../../../hardData';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Field() {
    //const [grass, setGrass] = useState([]);
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
    /*useEffect(() => {
        axios
            .get('/products/grass')
            .then((res) => console.log(res.data))//setGrass(res.data))
            .catch((err) => console.log(err));
    },[]);*/
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
                            <button className={cx('product-view-btn')}>
                                <Link to = '/products' state = {{field: item.grassid, trademark: null}}>
                                    Xem ngay
                                </Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Field;
