import classNames from 'classnames/bind';

import styles from './SignIn.module.scss';

const cx = classNames.bind(styles);

function SignIn() {
    return <div className={cx('wrapper')}>SignIn Page</div>;
}

export default SignIn;
