import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '../../Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Menu({ children, items = [], onChange = () => {}, hideOnClick = false }) {
    const handleOnBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return (
            <div className={cx('menu-body')}>
                {current.data.map((item, index) => {
                    const isParent = Boolean(item.children);
                    return (
                        <MenuItem
                            key={index}
                            item={item}
                            onClick={() => {
                                if (isParent) {
                                    setHistory((prev) => [...prev, item.children]);
                                } else {
                                    onChange(item);
                                }
                            }}
                        />
                    );
                })}
            </div>
        );
    };

    const showMenuList = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current.title} onBack={handleOnBack} />}
                {renderItems()}
            </PopperWrapper>
        </div>
    );

    const handeReset = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            interactive
            delay={[0, 500]}
            placement="bottom-end"
            render={showMenuList}
            onHide={handeReset}
            hideOnClick={hideOnClick}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.bool,
};

export default Menu;
