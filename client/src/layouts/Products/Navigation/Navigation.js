import classNames from 'classnames/bind';
// import { useState } from 'react';

import styles from './Navigation.module.scss';
import data from '../../../hardData';

const cx = classNames.bind(styles);

// const initChoice = { size: [], field: [], position: [], trademark: [], price: [] };

function Navigation({ setTradeMark }) {
    // const [productChoice, setProductChoice] = useState(initChoice);

    const handleOnClick = (e, type) => {
        switch (type) {
            case 'Kích thước':
                break;
            case 'Mặt sân thi đấu':
                break;
            case 'Vị trí thi đấu':
                break;
            case 'Nhãn hiệu':
                setTradeMark(e.target.textContent);
                break;
            case 'Giá tiền':
                break;
            default:
                break;
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('choice-list')}>
                {data.allProductChoicesMenu.map((choice, index) => (
                    <div key={index} className={cx('choice-item')}>
                        <div className={cx('choice-heading')}>{choice.title}</div>
                        <div
                            className={cx('choice-detail', {
                                'per-five-margin': choice.perFive === true,
                                default: choice.default === true,
                            })}
                        >
                            {choice.children.map((choiceChild, childIndex) => (
                                <div
                                    key={childIndex}
                                    className={cx('choice-detail-item', {
                                        'full-display': choice.fullDisplay === true,
                                        'per-five-display': choice.perFive === true,
                                        'per-four-display': choice.perFour === true,
                                    })}
                                    onClick={(e) => handleOnClick(e, choice.title)}
                                >
                                    <div className={cx('choice-detail-item-name')}>{choiceChild.item}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Navigation;
