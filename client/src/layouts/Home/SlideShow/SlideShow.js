import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './SlideShow.module.scss';
import data from '../../../hardData';

const cx = classNames.bind(styles);

function SlideShow() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel fade activeIndex={index} onSelect={handleSelect} className={cx('wrapper')}>
            {data.slides.map((slide, index) => (
                <Carousel.Item>
                    <div key={index} className={cx(slide.className)} src={slide.src} alt={slide.alt}></div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default SlideShow;
