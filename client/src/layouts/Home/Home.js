import classNames from 'classnames/bind';

import SlideShow from './SlideShow';
import TrendProducts from './TrendProducts';
import Trademark from './Trademark';
import Position from './Position';
import Field from './Field';
import Feedback from './Feedback';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <SlideShow />
            <TrendProducts />
            <Trademark />
            <Field />
            <Position />
            <Feedback />
        </div>
    );
}

export default Home;
