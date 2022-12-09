import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './CommentItem.module.scss';
const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const userIsExisted = user && Object.keys(user).length > 0;

function CommentItem({ index, productId, commentItem, setCommentList }) {
    const commentDate =
        new Date(commentItem.commentDate).getDate() +
        '/' +
        new Date(commentItem.commentDate).getMonth() +
        '/' +
        new Date(commentItem.commentDate).getFullYear();

    const [user, setUser] = useState({});

    useEffect(() => {
        axios
            .post('/user/userInfo', {
                userId: commentItem.userId,
            })
            .then((res) => setUser(res.data[0]))
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRemoveComment = () => {
        if (!userIsExisted) {
            alert('Vui lòng đăng nhập trước gỡ bình luận');
        } else {
            if (user.userId !== commentItem.userId) {
                alert('Bạn chỉ có thể gỡ bình luận của chính mình');
            } else {
                axios
                    .post('/products/comment/remove', {
                        commentId: commentItem.commentId,
                    })
                    .then((res) => {
                        if (res.data.affectedRows > 0) {
                            axios
                                .post(`/products/comment/shoes`, {
                                    shoesId: productId,
                                })
                                .then((res) => setCommentList(res.data))
                                .catch((err) => console.log(err));
                        }
                    })
                    .catch((err) => console.log(err));
            }
        }
    };

    return (
        <div key={index} className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img
                    src={
                        user.avatar ||
                        'https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png-300x300.png'
                    }
                    alt=""
                />
            </div>
            <div className={cx('comment-info')}>
                <span className={cx('username')}>{user.userName}</span>
                <span className={cx('comment-date')}>{commentDate}</span>
                <span className={cx('comment-content')}>{commentItem.content}</span>
                <span className={cx('btn-remove-comment')} onClick={handleRemoveComment}>
                    Gỡ bình luận
                </span>
            </div>
        </div>
    );
}

export default CommentItem;
