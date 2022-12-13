import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './OrderInfo.module.scss';
import Products from './Products';
import Address from './Address';
import Payment from './Payment';

const cx = classNames.bind(styles);

function OrderInfo() {
    const location = useLocation();
    const { userId, productList, buyDirectly } = location.state;

    const [total, setTotal] = useState(0);
    const [userAddress, setUserAddress] = useState([]);
    const [addressId, setAddressId] = useState(null);
    const [paymentId, setPaymentId] = useState(null);
    const [numberOfSuccessAffectedRow, setNumberOfSuccessAffectedRow] = useState(0);

    useEffect(() => {
        axios
            .post('/user/address', {
                userId: userId,
            })
            .then((res) => {
                setUserAddress(res.data);
            })
            .catch((err) => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (Object.keys(userAddress).length > 0) {
            const defaultAddressId = userAddress.filter((item) => item.defaultAddress.data[0] === 1)[0].addressId;
            setAddressId(defaultAddressId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress]);

    /// Phí vận chuyển
    const ship = 0;

    useEffect(() => {
        if (productList.length !== 0 && numberOfSuccessAffectedRow === productList.length) {
            alert('Đặt hàng hàng thành công');
            window.open(window.location.origin + `/user/id/${userId}/order`, '_self');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberOfSuccessAffectedRow]);

    const handleOrder = () => {
        if (paymentId === null) {
            alert('Vui lòng chọn phương thức thanh toán');
        } else {
            axios
                .post('/user/order/new', {
                    userId,
                    total,
                    addressId,
                    paymentId,
                })
                .then((res) => {
                    if (res.data.affectedRows > 0) {
                        axios
                            .post('/user/order/orderId', { userId })
                            .then((res) => {
                                const orderId = res.data[res.data.length - 1].orderId;
                                productList.forEach((product) => {
                                    axios
                                        .post('/user/order/new/detail', {
                                            orderId,
                                            product,
                                        })
                                        .then((res) => {
                                            if (res.data.affectedRows > 0) {
                                                if (!buyDirectly) {
                                                    /// Đặt hàng từ giỏ hàng (cập nhật lại số lượng sản phẩm đang có)
                                                }
                                                setNumberOfSuccessAffectedRow((state) => state + 1);
                                            }
                                        })
                                        .catch((err) => console.log(err));
                                });
                            })
                            .catch((err) => console.log(err));
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>THÔNG TIN ĐẶT HÀNG</h3>
            <Products productList={productList} setTotal={setTotal} />
            {addressId !== null && userAddress.length > 0 && (
                <Address userId={userId} setAddressId={setAddressId} userAddress={userAddress} addressId={addressId} />
            )}
            <Payment setPaymentId={setPaymentId} />
            <div className={cx('product-order-price')}>
                <div className={cx('order-price')}>
                    <label>Tổng tiền hàng:</label>
                    <span>
                        {total.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </span>
                </div>
                <div className={cx('ship-price')}>
                    <label>Phí vận chuyển:</label>
                    <span>
                        {ship.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </span>
                </div>
                <div className={cx('total-price')}>
                    <label>Tổng số tiền:</label>
                    <span>
                        {(total + ship).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </span>
                </div>
                <button className={cx('total-price', 'btn', 'order-btn')} onClick={handleOrder}>
                    Đặt hàng
                </button>
            </div>
        </div>
    );
}

export default OrderInfo;
