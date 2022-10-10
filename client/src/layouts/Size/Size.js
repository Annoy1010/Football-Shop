import classNames from 'classnames/bind';

import styles from './Size.module.scss';

const cx = classNames.bind(styles);

function Size() {
    return <div className={cx('wrapper')}>Size Page</div>;
}

export default Size;
