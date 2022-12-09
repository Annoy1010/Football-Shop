import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import parsePhoneNumber from 'libphonenumber-js';

import styles from './NewEmployee.module.scss';

const cx = classNames.bind(styles);

function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function NewEmployee({ setNewEmployee }) {
    const [provinceList, setProvinceList] = useState([]);
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [workShift, setWorkShift] = useState('');
    const [province, setProvince] = useState('');
    const [storeId, setStoreId] = useState('');

    useEffect(() => {
        axios
            .get('/province')
            .then((res) => setProvinceList(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/store')
            .then((res) => setStoreId(res.data[0].storeId))
            .catch((err) => console.log(err));
        axios
            .get('/user/employee/all')
            .then((res) => setUserName(`nv${res.data[res.data.length - 1].employeeId + 1}`))
            .catch((err) => console.log(err));
    }, []);
    const handleSubmit = () => {
        if (name === '' || phone === '' || email === '' || position === '' || workShift === '' || province === '') {
            alert('Vui lòng điền đầy đủ thông tin nhân viên');
        } else {
            if (!isValidEmail(email)) {
                alert('Email không hợp lệ');
            } else {
                if (!parsePhoneNumber(`+84${phone.slice(1, phone.length)}`, 'VN').isValid()) {
                    alert('Số điện thoại không hợp lệ');
                } else {
                    axios
                        .post('/user/employee/manage/new', {
                            userName,
                            storeId,
                            name,
                            phone,
                            email,
                            position,
                            workShift,
                            province,
                        })
                        .then((res) => {
                            if (res.data.affectedRows > 0) {
                                alert('Thêm nhân viên thành công');
                                setNewEmployee(false);
                                window.location.reload();
                            }
                        })
                        .catch((err) => console.log(err));
                }
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thêm nhân viên</h3>

            <div className={cx('employee-detail')}>
                <h3 className={cx('heading-address')}>Chi tiết thông tin</h3>
                <div className={cx('employee-input')}>
                    <input
                        type="text"
                        value={name}
                        className={cx('employee-input-item')}
                        placeholder="Họ và tên"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={cx('employee-input')}>
                    <input
                        type="email"
                        value={email}
                        className={cx('employee-input-item')}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={cx('employee-input')}>
                    <input
                        type="tel"
                        value={phone}
                        className={cx('employee-input-item')}
                        placeholder="Số điện thoại"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className={cx('employee-input')}>
                    <select className={cx('employee-input-item')} onChange={(e) => setPosition(e.target.value)}>
                        <option value="">Chọn Chức vụ</option>
                        <option value="1">Quản lý</option>
                        <option value="0">Nhân viên</option>
                    </select>
                </div>
                <div className={cx('employee-input')}>
                    <select className={cx('employee-input-item')} onChange={(e) => setWorkShift(e.target.value)}>
                        <option value="">Chọn Ca làm việc</option>
                        <option value="1">Ca sáng</option>
                        <option value="2">Ca chiều</option>
                        <option value="3">Ca tối</option>
                    </select>
                </div>
                <div className={cx('employee-input')}>
                    <select className={cx('employee-input-item')} onChange={(e) => setProvince(e.target.value)}>
                        <option value="">Địa chỉ</option>
                        {provinceList.map((province) => (
                            <option key={province.provinceId} value={province.provinceId}>
                                {province.provinceName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={handleSubmit}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={() => setNewEmployee(false)}>
                    Đóng
                </button>
            </div>
        </div>
    );
}

export default NewEmployee;
