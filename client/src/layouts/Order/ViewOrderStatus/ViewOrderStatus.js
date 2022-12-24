import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faReceipt, faThumbsUp, faTruckMoving } from '@fortawesome/fontawesome-free-solid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import styles from './ViewOrderStatus.module.scss';
import OrderItem from '../OrderItem';
import notify from '../../../components/ToastMessage';

const cx = classNames.bind(styles);

function ViewOrderStatus({ setOrder, order }) {
    const [shoesDetailListOfOrder, setShoesDetailListOfOrder] = useState([]);

    useEffect(() => {
        axios
            .post('/user/order/all/shoes', {
                orderId: order.orderId,
            })
            .then((res) => setShoesDetailListOfOrder(res.data))
            .catch((err) => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDestroyOrder = () => {
        if (order.submitStatus.data[0] !== 1) {
            axios
                .post('/user/order/remove', {
                    orderId: order.orderId,
                })
                .then((res) => {
                    if (res.data.affectedRows > 0) {
                        notify('Hủy đơn hàng thành công', 'success', 2000);
                        setOrder({});
                        setTimeout(() => window.location.reload(), 2100);
                    }
                })
                .catch((err) => console.log(err));
        }
    };
    console.log(order);
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Trạng thái đơn hàng</h3>
            <span className={cx('order-id')}>{`Mã đơn hàng: ${order.orderId}`}</span>
            <h3 className={cx('heading')}>Danh sách các sản phẩm trong đơn hàng</h3>
            <div className={cx('product-list')}>
                {shoesDetailListOfOrder &&
                    shoesDetailListOfOrder.length > 0 &&
                    shoesDetailListOfOrder.map((product, index) => <OrderItem product={product} index={index} />)}
            </div>
            <div className={cx('status-detail')}>
                {order.paymentId === '1' && (
                    <>
                        <div
                            className={cx('status-item', {
                                'submit-active': order.submitStatus.data[0] === 1,
                            })}
                        >
                            <FontAwesomeIcon icon={faThumbsUp} className={cx('check-icon')} />
                        </div>
                        <div
                            className={cx('status-item', {
                                'ship-active': order.shipStatus.data[0] === 1,
                            })}
                        >
                            <FontAwesomeIcon icon={faTruckMoving} className={cx('check-icon')} />
                        </div>
                        <div
                            className={cx('status-item', {
                                'pay-active': order.paymentStatus.data[0] === 1,
                            })}
                        >
                            <FontAwesomeIcon icon={faReceipt} className={cx('check-icon')} />
                        </div>
                    </>
                )}
                {order.paymentId === '2' && (
                    <>
                        <div
                            className={cx('status-item', {
                                'pay-active': order.paymentStatus.data[0] === 1,
                            })}
                        >
                            <FontAwesomeIcon icon={faReceipt} className={cx('check-icon')} />
                        </div>
                        <div
                            className={cx('status-item', {
                                'submit-active': order.submitStatus.data[0] === 1,
                            })}
                        >
                            <FontAwesomeIcon icon={faThumbsUp} className={cx('check-icon')} />
                        </div>
                        <div
                            className={cx('status-item', {
                                'ship-active': order.shipStatus.data[0] === 1,
                            })}
                        >
                            <FontAwesomeIcon icon={faTruckMoving} className={cx('check-icon')} />
                        </div>
                    </>
                )}
            </div>
            <div className={cx('status-desc')}>
                {order.paymentId === '1' && (
                    <>
                        <div className={cx('status-desc-item')}>
                            <span>Xác nhận</span>
                            {order.submitStatus.data[0] === 1 && (
                                <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />
                            )}
                        </div>
                        <div className={cx('status-desc-item')}>
                            <span>Giao hàng</span>
                            {order.shipStatus.data[0] === 1 && (
                                <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />
                            )}
                        </div>
                        <div className={cx('status-desc-item')}>
                            <span>Thanh toán</span>
                            {order.paymentStatus.data[0] === 1 && (
                                <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />
                            )}
                        </div>
                    </>
                )}
                {order.paymentId === '2' && (
                    <>
                        <div className={cx('status-desc-item')}>
                            <span>Thanh toán</span>
                            {order.paymentStatus.data[0] === 1 && (
                                <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />
                            )}
                        </div>
                        <div className={cx('status-desc-item')}>
                            <span>Xác nhận</span>
                            {order.submitStatus.data[0] === 1 && (
                                <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />
                            )}
                        </div>
                        <div className={cx('status-desc-item')}>
                            <span>Giao hàng</span>
                            {order.shipStatus.data[0] === 1 && (
                                <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className={cx('options-btn')}>
                <button
                    className={cx('submit-btn', {
                        disabled: order.submitStatus.data[0] === 1,
                    })}
                    onClick={handleDestroyOrder}
                >
                    Hủy đơn hàng
                </button>
                <button className={cx('close-btn')} onClick={() => setOrder({})}>
                    Đóng
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ViewOrderStatus;
