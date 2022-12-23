import classNames from 'classnames/bind';
import React from 'react';

import Admin from './Admin';
import SlideShow from './SlideShow';
import TrendProducts from './TrendProducts';
import Trademark from './Trademark';
import Position from './Position';
import Field from './Field';
import Feedback from './Feedback';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));

function Home() {
    return (
        <div className={cx('wrapper')}>
            {user && Object.keys(user).length > 0 && user.roleAccess.data[0] === 1 ? (
                <Admin />
            ) : (
                <React.Fragment>
                    <SlideShow />
                    <TrendProducts />
                    <Trademark />
                    <Field />
                    <Position />
                    <Feedback />
                </React.Fragment>
            )}
        </div>
    );
}

export default Home;
