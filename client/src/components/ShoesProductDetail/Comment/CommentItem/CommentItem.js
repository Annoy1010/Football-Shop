import classNames from 'classnames/bind';

import styles from './CommentItem.module.scss';
const cx = classNames.bind(styles);

function CommentItem({ key, comment }) {
    return (
        <div key={key} className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img
                    src="https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png-300x300.png"
                    alt=""
                />
            </div>
            <div className={cx('comment-info')}>
                <span className={cx('username')}>{comment.userName}</span>
                <span className={cx('comment-date')}>{comment.date}</span>
                <span className={cx('comment-content')}>{comment.content}</span>
            </div>
        </div>
    );
}

export default CommentItem;
