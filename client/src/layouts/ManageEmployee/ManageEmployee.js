import classNames from 'classnames/bind';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer } from 'react-toastify';

import styles from './ManageEmployee.module.scss';
import EmployeeItem from './EmployeeItem/EmployeeItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import NewEmployee from './NewEmployee';
import notify from '../../components/ToastMessage';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const userIsExisted = user && Object.keys(user).length > 0;

function ManageEmployee() {
    const [loading, setLoading] = useState(true);
    const [employeeList, setEmployeeList] = useState([]);
    const [newEmployee, setNewEmployee] = useState(false);

    useEffect(() => {
        axios
            .get('/user/employee/all')
            .then((res) => setEmployeeList(res.data))
            .catch((err) => console.log(err));
        setLoading(false);
    }, []);

    const handleAddEmployee = () => {
        if (userIsExisted && user.roleAccess.data[0] === 1 && user.isAdmin.data[0] === 1) {
            setNewEmployee(true);
        } else {
            notify('Bạn không có quyền chỉnh sửa', 'error', 2000);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>DANH SÁCH CÁC NHÂN VIÊN</h3>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <Container className={cx('header-wrapper')}>
                    <Row className={cx('header-row')}>
                        <Col xl lg className={cx('header-data')}>
                            <span className={cx('header-item')}>Mã nhân viên</span>
                        </Col>
                        <Col xl lg className={cx('header-data')}>
                            <span className={cx('header-item')}>Ảnh đại diện</span>
                        </Col>
                        <Col xl lg className={cx('header-data')}>
                            <span className={cx('header-item')}>Tên nhân viên</span>
                        </Col>
                        <Col xl lg className={cx('header-data')}>
                            <span className={cx('header-item')}>Số điện thoại</span>
                        </Col>
                        <Col xl lg className={cx('header-data')}>
                            <span className={cx('header-item')}>Email</span>
                        </Col>
                        <Col xl lg className={cx('header-data')}>
                            <span className={cx('header-item')}>Ngày vào làm</span>
                        </Col>
                        <Col xl lg className={cx('header-data')}>
                            <span className={cx('header-item')}>Lựa chọn</span>
                        </Col>
                    </Row>
                    {employeeList &&
                        employeeList.length > 0 &&
                        employeeList.map((employee, index) => <EmployeeItem employee={employee} index={index} />)}
                    <button className={cx('add-btn')} onClick={handleAddEmployee}>
                        <FontAwesomeIcon icon={faPlus} className={cx('btn-icon')} />
                        Thêm nhân viên
                    </button>
                    {newEmployee && <NewEmployee setNewEmployee={setNewEmployee} />}
                </Container>
            )}
            <ToastContainer />
        </div>
    );
}

export default ManageEmployee;
