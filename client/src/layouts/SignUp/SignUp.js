import classNames from 'classnames/bind';
import axios from 'axios';
import { useState, useEffect } from 'react';

import styles from './SignUp.module.scss';

const cx = classNames.bind(styles);

function SignUp() {
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);

    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [provinceid, setProvinceId] = useState('');
    const [districtid, setDistrictId] = useState('');
    const [wardid, setWardId] = useState('');
    const [detailaddress, setDetailAddress] = useState('');

    const [usernameExist, setUserNameExist] = useState(false);
    const [lengthpass, setLengthPass] = useState(false);
    const statusAddress = 1;
    useEffect(() => {
        axios
            .get('/province')
            .then((res) => setProvinceList(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleOnChangeProvince = (e) => {
        provinceList.forEach((province) => {
            if (province.provinceName === e.target.value) {
                setProvinceId(province.provinceId);
                axios
                    .get(`/district/province?provinceId=${province.provinceId}`)
                    .then((res) => setDistrictList(res.data))
                    .catch((err) => console.log(err));
            }
        });
    };

    const handleOnChangeDistrict = (e) => {
        districtList.forEach((district) => {
            if (district.districtName === e.target.value) {
                setDistrictId(district.districtId);
                axios
                    .get(`/ward/district?districtId=${district.districtId}`)
                    .then((res) => setWardList(res.data))
                    .catch((err) => console.log(err));
            }
        });
    };

    const handleOnChangeWard = (e) => {
        wardList.forEach((ward) => {
            if (ward.wardName === e.target.value){
                setWardId(ward.wardId);
            }
        });
    };

    const handleOnChangeUserName = (e) => {
        setUserName(e.target.value);
        setUserNameExist(false);
    };
    const handleOnChangePassWord = (e) => {
        setPassWord(e.target.value);
        setLengthPass(false);
    };
    const handleOnChangeFullName = (e) => {
        setFullName(e.target.value);
    };
    const handleOnChangeEmail = (e) =>{
        setEmail(e.target.value);
    };
    const handleOnChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleOnChangeDetailAddress = (e) => {
        setDetailAddress(e.target.value);
    };

    const handleOnSignUp = (e) => {
        axios.post('/user/signup/username', {
            username,
        })
            .then((res) => {
                const result = res.data;
                if (result.length === 0){
                    if(password.length < 6){
                        setLengthPass(true);
                    } else {
                        axios.post('/user/signup', {
                            username,
                            password,
                            fullname,
                            email,
                            phone,
                        })
                            .then((res) => {
                                if (res.data.affectedRows > 0) {
                                    alert('Đăng ký tài khoản thành công');
                                    window.open(window.location.origin, '_self');
                                    const userId = res.data.insertId;
                                    if(userId){
                                        axios.post('/user/signup/cart', {
                                            userId,
                                        })
                                            .then((res) => {
                                            })
                                            .catch((err) => console.log(err));
                                        axios.post('/user/signup/address', {
                                            userId,
                                            provinceid,
                                            districtid,
                                            wardid,
                                            detailaddress,
                                            statusAddress,
                                        })
                                            .then((res) => {
                                            })
                                            .catch((err) => console.log(err));
                                    }
                                }
                                else{
                                    alert('Tên đăng nhập đã được sử dụng');
                                }
                        })
                        .catch((err) => console.log(err));
                    }
                }else{
                    setUserNameExist(true);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')} method="POST">
                <div className={cx('input-item')}>
                    <label htmlFor="username" className={cx('label-item')}>
                        Tên đăng nhập
                    </label>
                    <input type="text" id="username" className={cx('input-area')} value={username} onChange={(e)=> handleOnChangeUserName(e)} required />
                    {usernameExist === true ? (
                        <label className={cx('error-message')}>Tên đăng nhập đã được sử dụng</label>
                    ) : (
                        <></>
                    )}
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="password" className={cx('label-item')}>
                        Mật khẩu
                    </label>
                    <input type="password" id="password" className={cx('input-area')} value={password} onChange={(e)=>handleOnChangePassWord(e)} required />
                    {lengthpass === true ? (
                        <label className={cx('error-message')}>Mật khẩu phải có độ dài lớn hơn hoặc bằng 6</label>
                    ) : (
                        <></>
                    )}   
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="fullname" className={cx('label-item')}>
                        Họ và tên
                    </label>
                    <input type="text" id="fullname" className={cx('input-area')} value={fullname} onChange={(e) => handleOnChangeFullName(e)}  required />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="email" className={cx('label-item')}>
                        Email
                    </label>
                    <input type="email" id="email" className={cx('input-area')} value={email} onChange={(e) => handleOnChangeEmail(e)}  required />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="phone" className={cx('label-item')}>
                        Số điện thoại
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className={cx('input-area')}
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        onChange = {(e) => handleOnChangePhone(e)}
                        required
                    />
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="province" className={cx('label-item')}>
                        Tỉnh
                    </label>
                    <select
                        id="province"
                        className={cx('input-area')}
                        required
                        onChange={(e) => handleOnChangeProvince(e)}
                    >
                        <option className={cx('option-value')} selected>
                            Chọn Tỉnh/Thành phố
                        </option>
                        {provinceList.map((province) => (
                            <option key={province.provinceId} className={cx('option-value')}>
                                {province.provinceName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="district" className={cx('label-item')}>
                        Huyện
                    </label>
                    <select
                        id="district"
                        className={cx('input-area')}
                        required
                        onChange={(e) => handleOnChangeDistrict(e)}
                    >
                        <option className={cx('option-value')} selected>
                            Chọn Quận/Huyện
                        </option>
                        {districtList.map((district) => (
                            <option key={district.districtId} className={cx('option-value')}>
                                {district.districtName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="ward" className={cx('label-item')}>
                        Xã
                    </label>
                    <select id="ward" className={cx('input-area')} required onChange={(e) => setWardId(e.target.value)}>
                        <option className={cx('option-value')} selected>
                            Chọn Phường/Xã
                        </option>
                        {wardList.map((ward) => (
                            <option key={ward.wardId} value={ward.wardId} className={cx('option-value')}>
                                {ward.wardName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('input-item')}>
                    <label htmlFor="detail-address" className={cx('label-item')}>
                        Địa chỉ chi tiết
                    </label>
                    <input type="text" id="detail-address" className={cx('input-area')} onChange={(e) => handleOnChangeDetailAddress(e)} required />
                </div>
            </form>
            <button className={cx('submit-btn')} onClick={(e)=>handleOnSignUp(e)}>Đăng ký</button>
        </div>
    );
}

export default SignUp;
