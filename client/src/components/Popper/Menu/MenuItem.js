// import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';
import { Button } from '../../Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ item, onClick }) {
    const classes = cx('menu-item', {
        seperate: item.seperate,
    });
    return (
        <Button className={classes} leftIcon={item.icon} to={item.to} onClick={onClick}>
            {item.title}
        </Button>
    );
}

MenuItem.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
};

export default MenuItem;
