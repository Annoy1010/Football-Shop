import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './ForgetPassword.module.scss';
import VerifyEmail from './VerifyEmail';
import CreateNewPassword from './CreateNewPassword';

const cx = classNames.bind(styles);

function ForgetPassword() {
    const [isExactResetCode, setIsExactResetCode] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    return (
        <div className={cx('wrapper')}>
            {isExactResetCode === true ? (
                <CreateNewPassword resetEmail={resetEmail} />
            ) : (
                <VerifyEmail setIsExactResetCode={setIsExactResetCode} setResetEmail={setResetEmail} />
            )}
        </div>
    );
}

export default ForgetPassword;
