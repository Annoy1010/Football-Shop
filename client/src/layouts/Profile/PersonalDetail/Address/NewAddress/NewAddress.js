import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './NewAddress.module.scss';
import Axios from 'axios';

const cx = classNames.bind(styles);

function NewAddress({ onClick }) {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);

    const [userId, setUserId] = useState(currentUser.userId);
    const [provinceid, setProvinceId] = useState('');
    const [districtid, setDistrictId] = useState('');
    const [wardid, setWardId] = useState('');
    const [detailaddress, setDetailAddress] = useState('');

    const [provinceempty, setProvinceEmpty] = useState(false);
    const [districtempty, setDistrictEmpty] = useState(false);
    const [wardempty, setWardEmpty] = useState(false);
    const [detailaddressempty, setDetailAddressEmpty] = useState(false);

    useEffect(() => {
        Axios
            .get('/province')
            .then((res) => setProvinceList(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleOnChangeProvince = (e) => {
        provinceList.forEach((province) => {
            if (province.provinceName === e.target.value) {
                setProvinceId(province.provinceId);
                setProvinceEmpty(false);
                Axios
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
                setDistrictEmpty(false);
                Axios
                    .get(`/ward/district?districtId=${district.districtId}`)
                    .then((res) => setWardList(res.data))
                    .catch((err) => console.log(err));
            }
        });
    };
    const handleOnChangeWard = (e) => {
        wardList.forEach((ward) => {
            setWardEmpty(false);
            if (ward.wardName === e.target.value){
                setWardId(ward.wardId);
            }
        });
    };

    const handleOnChangeDetailAddress = (e) => {
        setDetailAddress(e.target.value);
        setDetailAddressEmpty(false);
    };

    const handleOnAddressRegister = (e) => {
        if (provinceid === ''){
            setProvinceEmpty(true);
        } else if(districtid === ''){
            setDistrictEmpty(true);
        } else if(wardid === ''){
            setWardEmpty(true);
        } else if(detailaddress === ''){
            setDetailAddressEmpty(true);
        } else{
            Axios.post('/user/address/add', {
                userId,
                provinceid,
                districtid,
                wardid,
                detailaddress,
            })
                .then((res) => {
                    if (res.data.affectedRows > 0) {
                        alert('Thêm địa chỉ mới thành công');
                        window.open(window.location.origin, '_self');

                    }
                })
                .catch((err) => console.log(err));
        }

    }
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thêm địa chỉ</h3>

            <div className={cx('address-register')}>
                <h3 className={cx('heading-address')}>Chi tiết địa chỉ</h3>
                <div className={cx('address-input')}>
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
                        {provinceempty === true ? (
                            <label className={cx('error-message')}>Bạn chưa chọn Tỉnh/Thành phố</label>
                            ) : (
                                <></>
                        )}
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
                        {districtempty === true ? (
                            <label className={cx('error-message')}>Bạn chưa chọn Huyện/Quận</label>
                            ) : (
                                <></>
                        )}
                        
                    </div>
                    <div className={cx('input-item')}>
                        <label htmlFor="ward" className={cx('label-item')}>
                            Xã
                        </label>
                        <select id="ward" className={cx('input-area')} onChange={(e) => handleOnChangeWard(e)} required>
                            <option className={cx('option-value')} selected>
                                Chọn Phường/Xã
                            </option>
                            {wardList.map((ward) => (
                                <option key={ward.districtId} value = {ward.wardid} className={cx('option-value')}>
                                    {ward.wardName}
                                </option>
                            ))}
                        </select>
                        {wardempty === true ? (
                            <label className={cx('error-message')}>Bạn chưa chọn Xã/Phường</label>
                            ) : (
                                <></>
                        )}
                    </div>
                    <div className={cx('input-item')}>
                        <label htmlFor="detail-address" className={cx('label-item')}>
                            Địa chỉ chi tiết
                        </label>
                        <input type="text" id="detail-address" className={cx('input-area')} value={detailaddress} onChange={(e) => handleOnChangeDetailAddress(e)} required />
                        {detailaddressempty === true ? (
                            <label className={cx('error-message')}>Bạn chưa nhập chi tiết địa chỉ</label>
                            ) : (
                                <></>
                        )}      
                    </div>
                </div>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={(e) => handleOnAddressRegister(e)}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={onClick}>
                    Đóng
                </button>
            </div>
        </div>
    );
}

export default NewAddress;
