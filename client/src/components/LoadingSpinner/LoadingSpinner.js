import classNames from 'classnames/bind';

import styles from './LoadingSpinner.module.scss';

const cx = classNames.bind(styles);

function LoadingSpinner() {
    return (
        <div className={cx('lds-ellipsis')}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default LoadingSpinner;
