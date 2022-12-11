import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import classNames from 'classnames/bind';
import axios from 'axios';
import { Link } from 'react-router-dom';


import styles from './Search.module.scss';
import MenuItem from './MenuItem';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function Search() {
    const [inputValue, setInputValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        axios
            .post('/products/search/name', {
                shoesName: inputValue,
            })
            .then((res) => setSearchResult(res.data))
            .catch((err) => console.log(err));

        console.log(searchResult);
    }, [inputValue]);

    const searchList = useRef();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-action')}>
                <input
                    value={inputValue}
                    type="text"
                    className={cx('search-input')}
                    placeholder="Tìm kiếm..."
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {inputValue && <div className={cx('close-btn')} onClick={() => setInputValue('')}></div>}
                <FontAwesomeIcon icon={faSearch} className={cx('search-btn')} />
            </div>

            {inputValue.length > 0 && /// Thực tế thì kiểm tra searchReuslt.length
                showResult && (
                    <div ref={searchList} className={cx('search-list')}>
                        <h2 className={cx('menu-heading')}>Danh sách tìm kiếm</h2>
                        {searchResult.map((item, index) => (
                            <MenuItem index={index} item={item} />
                        ))}
                        <div className={cx('option-btn')}>
                            <button className={cx('more-btn')}>Xem tất cả</button>
                            <button className={cx('more-btn', 'clean-btn')} onClick={() => setInputValue('')}>
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Search;
