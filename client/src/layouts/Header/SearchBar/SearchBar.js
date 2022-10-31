import classNames from 'classnames/bind';

import styles from './SearchBar.module.scss';
import Search from './Search';
import Action from './Action';
import Logo from './Logo';

const cx = classNames.bind(styles);

function SearchBar() {
    return (
        <div className={cx('wrapper')}>
            <Logo />
            <Search />
            <Action />
        </div>
    );
}

export default SearchBar;
