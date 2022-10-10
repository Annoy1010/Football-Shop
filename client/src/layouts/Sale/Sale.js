import classNames from 'classnames/bind';

import styles from './Sale.module.scss';

const cx = classNames.bind(styles);

function Sale() {
    return <div className={cx('wrapper')}>Sale Page</div>;
}

export default Sale;
