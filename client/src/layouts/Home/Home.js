import classNames from 'classnames/bind';

import styles from './Home.module.scss';
// import { useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    return <div className={cx('wrapper')}>Home Page</div>;
}

export default Home;
