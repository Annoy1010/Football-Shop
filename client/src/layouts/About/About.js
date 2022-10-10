import classNames from 'classnames/bind';

import styles from './About.module.scss';

const cx = classNames.bind(styles);

function About() {
    return <div className={cx('wrapper')}>About Page</div>;
}

export default About;
