import classNames from 'classnames/bind';

import styles from './Home.module.scss';
// import SlideShow from './SlideShow';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            Home Page
            {/* <SlideShow /> */}
        </div>
    );
}

export default Home;
