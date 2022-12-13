import classNames from 'classnames/bind';
import { faSearch, faSpinner } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';
import { Wrapper as PoperWrapper } from '../../../../components/Popper';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Search() {
    const [inputValue, setInputValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(true);

    const inputRef = useRef();

    useEffect(() => {
        if (inputValue) {
            // setLoading(true);
            axios
                .post('/products/search/name', {
                    shoesName: inputValue,
                })
                .then((res) => setSearchResult(res.data))
                .catch((err) => console.log(err));
            setLoading(false);
        } else {
            setSearchResult([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue]);

    function handleOnChange(e) {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setInputValue(searchValue);
        }
    }

    return (
        <HeadlessTippy
            appendTo={() => document.body}
            interactive={true}
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PoperWrapper>
                        <h4 className={cx('search-title')}>Danh sách tìm kiếm</h4>
                        {searchResult.map((result) => (
                            <Link to={`/products/shoes/id/${result.shoesId}`}>
                                <MenuItem index={result.shoesId} item={result} />
                            </Link>
                        ))}
                    </PoperWrapper>
                </div>
            )}
            onClickOutside={() => setShowResult(false)}
        >
            <div className={cx('search')}>
                <input
                    className={cx('search-input')}
                    value={inputValue}
                    ref={inputRef}
                    placeholder="Tìm kiếm...."
                    spellCheck={false}
                    onChange={(e) => handleOnChange(e)}
                    onFocus={() => setShowResult(true)}
                />

                {inputValue && loading && (
                    <button className={cx('loading-btn')}>
                        <FontAwesomeIcon icon={faSpinner} className={cx('loading-icon')} />
                    </button>
                )}

                {!loading && inputValue && showResult && (
                    <button
                        className={cx('clear-btn')}
                        onClick={() => {
                            setInputValue('');
                            setSearchResult([]);
                            inputRef.current.focus();
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className={cx('clear-icon')}>
                            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                        </svg>
                    </button>
                )}
                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
