import classNames from 'classnames/bind';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import notify from '../../../../../components/ToastMessage';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const role = user && Object.keys(user).length > 0 && user.roleAccess.data[0];
const username = user && Object.keys(user).length > 0 && user.userName;

function Avatar({ setAvatarDisplay }) {
    const [avatar, setAvatar] = useState('https://daknong.dms.gov.vn/CmsView-QLTT-portlet/res/no-image.jpg');

    const getbase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setAvatar(reader.result);
        };
    };

    const handleOnChangeAvatar = (event) => {
        if (event.target.files && event.target.files[0]) {
            getbase64(event.target.files[0]);
        }
    };

    const handleSubmitAvatar = () => {
        avatar &&
            axios
                .post('/user/upload/image', {
                    avatar,
                    role: role.toString(),
                    username,
                })
                .then((res) => {
                    if (res.data.affectedRows > 0) {
                        notify('Cập nhật ảnh đại diện thành công', 'success', 2000);
                    }
                })
                .catch(() => notify('Vui lòng chọn ảnh có kích thước file nhỏ hơn', 'warn', 2000));
        setAvatarDisplay(false);
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Ảnh đại diện</h3>

            <div className={cx('avatar-register')}>
                <h3 className={cx('heading-avatar')}>Ảnh được chọn</h3>
                <img className={cx('avatar-input')} src={avatar} alt="" />
                <input type="file" id="img" name="img" accept="image/*" onChange={(e) => handleOnChangeAvatar(e)} />
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={handleSubmitAvatar}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={() => setAvatarDisplay(false)}>
                    Đóng
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Avatar;
