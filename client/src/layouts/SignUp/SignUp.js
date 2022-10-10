import classNames from 'classnames/bind';

import styles from './SignUp.module.scss';

const cx = classNames.bind(styles);

function SignUp() {
    return <div className={cx('wrapper')}>SignUp Page</div>;
}

export default SignUp;
