import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    const [store, setStore] = useState({});
    const [provinceName, setProvinceName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [wardName, setWardName] = useState('');

    useEffect(() => {
        axios
            .get('/store')
            .then((res) => setStore(res.data[0]))
            .catch((err) => console.log(err));
        axios
            .post('/province/name', {
                provinceId: store.provinceId,
            })
            .then((res) => setProvinceName(res.data[0].provinceName))
            .catch((err) => console.log(err));
        axios
            .post('/district/name', {
                districtId: store.districtId,
            })
            .then((res) => setDistrictName(res.data[0].districtName))
            .catch((err) => console.log(err));
        axios
            .post('/ward/name', {
                wardId: store.wardId,
            })
            .then((res) => setWardName(res.data[0].wardName))
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail')}>
                <div className={cx('item')}>
                    <h2 className={cx('heading')}>Thông tin liên hệ</h2>

                    <div className={cx('contact-info')}>
                        <span>
                            <strong>Địa chỉ: </strong>
                            {`${store.detailAddress}, ${wardName}, ${districtName}, ${provinceName}`}
                        </span>
                        <span>
                            <strong>Hotline: </strong>
                            <span>{store.phone}</span>
                        </span>
                    </div>
                </div>

                <div className={cx('item')}>
                    <h2 className={cx('heading')}>Bản đồ</h2>
                    <iframe
                        className={cx('map')}
                        src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d31346.34785202584!2d106.79979023212918!3d10.865268201459326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiAtIMSQSFFHIFRQLkhDTSwgxJDGsOG7nW5nIEjDoG4gVGh1ecOqbiwga2h1IHBo4buRIDYgUCwgTGluaCBUcnVuZywgVGjhu6cgxJDhu6ljLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!3m2!1d10.8700089!2d106.8030541!5e0!3m2!1svi!2s!4v1664251267624!5m2!1svi!2s"
                        width="600"
                        height="450"
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Location"
                    ></iframe>
                </div>

                <div className={cx('item')}>
                    <h2 className={cx('heading')}>Về chúng tôi</h2>

                    <div className={cx('logo')}>
                        <a href="/">
                            <img
                                src="https://images.vexels.com/media/users/3/132241/isolated/lists/0d413432a55194038d3266f8045868dd-soccer-player-silhouette-1.png"
                                alt="logo"
                            />
                        </a>
                    </div>
                    <div className={cx('social-network')}>
                        <a
                            className={cx('social-item')}
                            target="_blank"
                            rel="noreferrer"
                            href={store.facebookLink}
                            title="Facebook"
                        >
                            {' '}
                        </a>
                        <a
                            className={cx('social-item')}
                            target="_blank"
                            rel="noreferrer"
                            href={store.twitterLink}
                            title="Twitter"
                        >
                            {' '}
                        </a>
                        <a
                            className={cx('social-item')}
                            target="_blank"
                            rel="noreferrer"
                            href={store.instagramLink}
                            title="Instagram"
                        >
                            {' '}
                        </a>
                        <a
                            className={cx('social-item')}
                            target="_blank"
                            rel="noreferrer"
                            href={store.zaloLink}
                            title="Zalo"
                        >
                            {' '}
                        </a>
                    </div>
                </div>
            </div>

            <div className={cx('liscence')}>
                <span>Bản quyền &copy;2022 thuộc về Abc.com</span>
            </div>
        </div>
    );
}

export default Footer;
