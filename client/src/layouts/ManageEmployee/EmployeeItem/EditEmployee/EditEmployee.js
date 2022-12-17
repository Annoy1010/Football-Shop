import classNames from 'classnames/bind';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import styles from './EditEmployee.module.scss';
import notify from '../../../../components/ToastMessage';

const cx = classNames.bind(styles);

function EditEmployee({ employee, setEdit }) {
    const [position, setPosition] = useState('');
    const [workShift, setWorkShift] = useState('');
    const [workStatus, setWorkStatus] = useState('');

    const handleSubmit = () => {
        if (position === '' || workShift === '' || workStatus === '') {
            notify('Vui lòng điền đầy đủ thông tin', 'warn', 2000);
        } else {
            axios
                .post('/user/employee/manage/update', {
                    employeeId: employee.employeeId,
                    position,
                    workShift,
                    workStatus,
                })
                .then((res) => {
                    if (res.data.affectedRows > 0) {
                        notify('Chỉnh sửa thông tin nhân viên thành công', 'success', 2000);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thông tin nhân viên</h3>

            <div className={cx('employee-detail')}>
                <h3 className={cx('heading-address')}>Chi tiết thông tin</h3>
                <div className={cx('employee-input')}>
                    <input
                        className={cx('employee-input-item')}
                        value={`Mã nhân viên: ${employee.employeeId}`}
                        readOnly={true}
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
                    <select className={cx('employee-input-item')} onChange={(e) => setWorkStatus(e.target.value)}>
                        <option value="">Chọn Trạng thái làm việc</option>
                        <option value="1">Đang làm</option>
                        <option value="0">Đã nghỉ</option>
                    </select>
                </div>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={handleSubmit}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={() => setEdit(false)}>
                    Đóng
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default EditEmployee;
