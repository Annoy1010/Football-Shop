import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Comment.module.scss';
import data from '../../../hardData';
import CommentItem from './CommentItem';

const cx = classNames.bind(styles);

function Comment({ productId }) {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Đánh giá sản phẩm</h3>
            <div className={cx('write-comment')}>
                <div className={cx('avatar')}>
                    <img
                        src="https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png-300x300.png"
                        alt=""
                    />
                </div>
                <textarea className={cx('comment-area')} rows={4} placeholder="Viết đánh giá" />
                <button className={cx('send-btn')}>Gửi</button>
            </div>
            {data.comment.map((commentItem, index) =>
                commentItem.productId === productId ? <CommentItem key={index} comment={commentItem} /> : <></>,
            )}
        </div>
    );
}

Comment.prototype = {
    productId: PropTypes.number.isRequired,
};

export default Comment;
