import classNames from 'classnames/bind';

import styles from './Logo.module.scss';

const cx = classNames.bind(styles);

function Logo() {
    return (
        <div className={cx('wrapper')}>
            <a href="/">
                <img
                    className={cx('logo')}
                    src="https://images.vexels.com/media/users/3/132241/isolated/lists/0d413432a55194038d3266f8045868dd-soccer-player-silhouette-1.png"
                    alt="logo"
                />
            </a>
        </div>
    );
}

export default Logo;
