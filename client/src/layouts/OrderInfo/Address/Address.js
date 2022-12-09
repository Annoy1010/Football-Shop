import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Address.module.scss';
import user from '../../../localStorage';
import data from '../../../hardData';

import Axios from 'axios';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Address() {
    const [userid, setUserId] = useState(user.userId);
    const [addressdelivery, setAddressDelivery] = useState({});

    const [provincename, setProvinceName] = useState('');
    const [districtname, setDistrictName] = useState('');
    const [wardname, setWardName] = useState('');

    const [provinceid, setProvinceId] = useState('');
    const [districtid, setDistrictId] = useState('');
    const [wardid, setWardId] = useState('');
    useEffect(() => {
        if (userid) {
            Axios
                .post('/user/info/deliveryaddress', {
                    userid: userid,
                })
                .then((res) => setAddressDelivery(res.data[0]))
                .catch((err) => console.log(err));
        }
    }, [userid]);
    
    useEffect(() => {
        if(Object.keys(addressdelivery).length > 0){
            setProvinceId(addressdelivery.provinceId);
        }
    }, [addressdelivery])

    useEffect(() => {
        if(Object.keys(addressdelivery).length > 0){
            setDistrictId(addressdelivery.districtid);
        }
    }, [addressdelivery])

    useEffect(() => {
        if(Object.keys(addressdelivery).length > 0){
            setWardId(addressdelivery.wardId);
        }
    }, [addressdelivery])

    useEffect(() => {
        if (provinceid) {
            Axios
                .post('/province/provincename', {
                    provinceid: provinceid,
                })
                .then((res) => setProvinceName(res.data[0].provinceName))
                .catch((err) => console.log(err));
        }
    }, [provinceid]);

    useEffect(() => {
        if (districtid) {
            Axios
                .post('/district/districtname', {
                    districtid: districtid,
                })
                .then((res) => setDistrictName(res.data[0].districtName))
                .catch((err) => console.log(err));
        }
    }, [districtid]);

    useEffect(() => {
        if (wardid) {
            Axios
                .post('/ward/wardname', {
                    wardid: wardid,
                })
                .then((res) => setWardName(res.data[0].wardName))
                .catch((err) => console.log(err));
        }
    }, [wardid]);

    const currentUser = data.user.filter((userItem) => userItem.id === user.userId)[0];
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thông tin nhận hàng</h3>
            <Container className={cx('order-info')}>
                <Row>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Họ và tên</label>
                        <span>{user.fullName}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Số điện thoại</label>
                        <span>{user.phone}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Email</label>
                        <span>{user.email}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Địa chỉ</label>
                        <span>{addressdelivery.detail_address}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Tỉnh thành</label>
                        <span>{provincename}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Quận huyện</label>
                        <span>{districtname}</span>
                    </Col>
                    <Col xl={3} className={cx('info-item')}>
                        <label className={cx('label-name')}>Xã phường</label>
                        <span>{wardname}</span>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Address;
