import classNames from 'classnames/bind';

import styles from './Admin.module.scss';
import ShopIntro from './ShopIntro';
import DetailData from './DetailData';
import Statistics from './Statistics';

const cx = classNames.bind(styles);

function Admin() {
    return (
        <div className={cx('wrapper')}>
            <ShopIntro />
            <DetailData />
            <Statistics />
        </div>
    );
}

export default Admin;
