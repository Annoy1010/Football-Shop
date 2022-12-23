import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './DetailData.module.scss';
const cx = classNames.bind(styles);

function DetailData() {
    const [numberOfCustomer, setNumberOfCustomer] = useState(0);
    const [numberOfEmployee, setNumberOfEmployee] = useState(0);
    const [numberOfProduct, setNumberOfProduct] = useState(0);

    useEffect(() => {
        axios
            .get('/user/employee/all')
            .then((res) => setNumberOfEmployee(res.data.length))
            .catch((err) => console.log(err));
        axios
            .get('/user/all')
            .then((res) => setNumberOfCustomer(res.data.length))
            .catch((err) => console.log(err));

        axios
            .get('/products/all/detail')
            .then((res) => setNumberOfProduct(res.data.length))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('data-item')}>
                <div className={cx('data-img')}>
                    <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" />
                </div>
                <div className={cx('data-desc')}>
                    <div className={cx('desc-title')}>
                        <span>Số lượng người dùng</span>
                    </div>
                    <div className={cx('desc-detail')}>{numberOfCustomer !== 0 && <span>{numberOfCustomer}</span>}</div>
                </div>
            </div>
            <div className={cx('data-item')}>
                <div className={cx('data-img')}>
                    <img src="https://cdn-icons-png.flaticon.com/512/3462/3462212.png" alt="" />
                </div>
                <div className={cx('data-desc')}>
                    <div className={cx('desc-title')}>
                        <span>Số lượng nhân viên</span>
                    </div>
                    <div className={cx('desc-detail')}>{numberOfEmployee !== 0 && <span>{numberOfEmployee}</span>}</div>
                </div>
            </div>
            <div className={cx('data-item')}>
                <div className={cx('data-img')}>
                    <img src="https://freesvg.org/img/1517505968.png" alt="" />
                </div>
                <div className={cx('data-desc')}>
                    <div className={cx('desc-title')}>
                        <span>Số lượng sản phẩm</span>
                    </div>
                    <div className={cx('desc-detail')}>{numberOfProduct !== 0 && <span>{numberOfProduct}</span>}</div>
                </div>
            </div>
        </div>
    );
}

export default DetailData;
