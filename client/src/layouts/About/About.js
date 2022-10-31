import classNames from 'classnames/bind';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import styles from './About.module.scss';
import data from '../../hardData';

const cx = classNames.bind(styles);

function About() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
    return (
        <div className={cx('wrapper')} data-aos="fade-up">
            <div className={cx('store-intro')}>
                <p>
                    Abc.com là hệ thống cửa hàng cung cấp các sản phẩm Giày bóng đá NIKE, ADIDAS, PUMA, MIZUNO, ASICS,
                    KAMITO... Tất cả sản phẩm đều được nhập khẩu từ các nhà phân phối tại Việt Nam với tem, nhãn, hộp
                    đầy đủ.
                </p>
            </div>
            <div className={cx('store-rule')}>
                <h3 className={cx('heading')}>PHƯƠNG CHÂM LÀM VIỆC CỦA ĐỘI NGŨ ABC.COM</h3>
                <ul className={cx('rule-list')}>
                    {data.storeRules.map((rule, index) => (
                        <li key={index} className={cx('rule-item')}>
                            {rule.content}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cx('store-info')}>
                <h3 className={cx('heading-info')}>
                    CÔNG TY TNHH ABC<br></br>ĐỊA CHỈ: ĐẠI HỌC CÔNG NGHỆ THÔNG TIN, ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ
                    MINH<br></br>HOTLINE:
                    <span className={cx('hotline')}> 0368.341.595</span>
                </h3>
            </div>
        </div>
    );
}

export default About;
