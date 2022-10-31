import classNames from 'classnames/bind';

import styles from './ForgetPassword.module.scss';
import VerifyEmail from './VerifyEmail';
import CreateNewPassword from './CreateNewPassword';

const cx = classNames.bind(styles);
const RESET_PASSWORD = true;

function ForgetPassword() {
    return <div className={cx('wrapper')}>{RESET_PASSWORD ? <CreateNewPassword /> : <VerifyEmail />}</div>;
}

export default ForgetPassword;
