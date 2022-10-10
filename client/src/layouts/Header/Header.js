import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import Introducion from './Introduction';
import SearchBar from './SearchBar';
import Navigation from './Navigation';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <Introducion />
            <SearchBar />
            <Navigation />
        </div>
    );
}

export default Header;
