import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './Content.module.scss';

const cx = classNames.bind(styles);

function Content() {
    let result = [];
    axios
        .get('/api')
        .then((res) => (result = res.data))
        .catch((err) => console.log(err));
    return (
        <div className={cx('wrapper')}>
            {result.map((item, index) => (
                <span key={index}>{item.name}</span>
            ))}
            <div className={cx('chat-bot')}></div>
        </div>
    );
}

export default Content;
