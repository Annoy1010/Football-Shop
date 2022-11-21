import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './ForgetPassword.module.scss';
import VerifyEmail from './VerifyEmail';
import CreateNewPassword from './CreateNewPassword';

const cx = classNames.bind(styles);

function ForgetPassword() {
    const [isValidVerifiedEmail, setIsValidVerifiedEmail] = useState(false);
    return (
        <div className={cx('wrapper')}>
            {isValidVerifiedEmail ? (
                <CreateNewPassword />
            ) : (
                <VerifyEmail setIsValidVerifiedEmail={setIsValidVerifiedEmail} />
            )}
        </div>
    );
}

export default ForgetPassword;
