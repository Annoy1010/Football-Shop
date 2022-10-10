import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import MenuItem from './MenuItem';
import { useRef } from 'react';

const cx = classNames.bind(styles);

const SHOESES = [
    {
        name: 'Nike Mercurial Vapor 15',
        size: 39,
        originPrice: 750000,
        salePrice: null,
        img: 'https://static.nike.com/a/images/t_default/1c465a01-bbdc-4cfe-a5b2-5073cdd98ec7/zoom-mercurial-vapor-15-academy-tf-football-shoes-L8JgP4.png',
    },
    {
        name: 'Mizuno Morelia II Elite',
        size: 40,
        originPrice: 100000,
        salePrice: null,
        img: 'https://emea.mizuno.com/dw/image/v2/BDBS_PRD/on/demandware.static/-/Sites-masterCatalog_Mizuno/default/dw17fb0ca4/Football_Images/SH_P1GA221260_00.png?sw=300&sh=300',
    },
];

function Search() {
    const [inputValue, setInputValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        setSearchResult(SHOESES);
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
