import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import styles from './Comment.module.scss';
import CommentItem from './CommentItem';
import notify from '../../../components/ToastMessage';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const userIsExisted = user && Object.keys(user).length > 0;

function Comment({ productId }) {
    const defaultAvatar =
        'https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png-300x300.png';

    const [commentList, setCommentList] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        axios
            .post(`/products/comment/shoes`, {
                shoesId: productId,
            })
            .then((res) => setCommentList(res.data))
            .catch((err) => console.log(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleComment = () => {
        if (!userIsExisted) {
            notify('Vui lòng đăng nhập trước khi bình luận', 'warn', 2000);
        } else {
            if (content !== '') {
                const commentContent = content;
                const userId = userIsExisted && user.roleAccess.data[0] === 0 && user.userId;
                const shoesId = productId;
                axios
                    .post('/products/comment', {
                        userId,
                        shoesId,
                        commentContent,
                    })
                    .then((res) => {
                        setContent('');
                        setCommentList(res.data);
                    })
                    .catch((err) => console.log(err));
            } else {
                notify('Vui lòng điền bình luận trước khi gửi', 'warn', 2000);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Đánh giá sản phẩm</h3>
            <div className={cx('write-comment')}>
                <div className={cx('avatar')}>
                    <img src={userIsExisted ? user.avatar || defaultAvatar : defaultAvatar} alt="" />
                </div>
                <textarea
                    className={cx('comment-area')}
                    rows={4}
                    placeholder="Viết đánh giá"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className={cx('send-btn')} onClick={handleComment}>
                    Gửi
                </button>
            </div>
            {commentList &&
                commentList.length > 0 &&
                commentList.map((commentItem, index) => (
                    <CommentItem
                        index={index}
                        productId={productId}
                        commentItem={commentItem}
                        setCommentList={setCommentList}
                    />
                ))}
            <ToastContainer />
        </div>
    );
}

Comment.prototype = {
    productId: PropTypes.string.isRequired,
};

export default Comment;
