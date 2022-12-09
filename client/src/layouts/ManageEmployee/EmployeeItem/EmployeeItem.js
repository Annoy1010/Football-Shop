import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './EmployeeItem.module.scss';
import EditEmployee from './EditEmployee';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const userIsExisted = user && Object.keys(user).length > 0;

function EmployeeItem({ employee, index }) {
    const [edit, setEdit] = useState(false);
    var date = new Date(Date.parse(employee.startDate));
    date =
        ('00' + date.getUTCDate()).slice(-2) +
        '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) +
        '-' +
        date.getUTCFullYear();

    const handleEditInfo = () => {
        if (userIsExisted && user.roleAccess.data[0] === 1 && user.isAdmin.data[0] === 1) {
            setEdit(true);
        } else {
            alert('Ban khong co quyen chinh sua');
        }
    };

    return (
        <Container key={index} className={cx('wrapper')}>
            <Row className={cx('employee-item')}>
                <Col className={cx('id', 'item-detail')}>{employee.employeeId}</Col>
                <Col className={cx('avatar', 'item-detail')}>
                    <img
                        src={
                            employee.avatar || 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                        }
                        alt=""
                    />
                </Col>
                <Col className={cx('name', 'item-detail')}>{employee.fullName}</Col>
                <Col className={cx('phone', 'item-detail')}>{employee.phone}</Col>
                <Col className={cx('email', 'item-detail')}>{employee.email}</Col>
                <Col className={cx('entryDate', 'item-detail')}>{date}</Col>
                <Col className={cx('option', 'item-detail')}>
                    <button onClick={handleEditInfo}>
                        <FontAwesomeIcon icon={faPencilAlt} className={cx('button-icon')} />
                        Chỉnh sửa
                    </button>
                </Col>
            </Row>
            {edit && <EditEmployee employee={employee} setEdit={setEdit} />}
        </Container>
    );
}

export default EmployeeItem;
