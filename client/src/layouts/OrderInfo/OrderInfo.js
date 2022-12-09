import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OrderInfo.module.scss';
import Products from './Products';
import Address from './Address';
import Payment from './Payment';
import user from '../../localStorage';
import data from '../../hardData/hardData';

const cx = classNames.bind(styles);

function OrderInfo() {
    const [total, setTotal] = useState(0);
    const [cartId, setCartId] = useState(null);
    const [paymentmethods, setPaymentMethods] = useState(0);
    const [productListInCart, setProductListInCart] = useState([]);
    useEffect(() => {
        axios
            .post('/user/cartId', {
                userId: user.userId,
            })
            .then((res) => setCartId(res.data[0].cartId))
            .catch();
            
    }, []);
    useEffect(() => {
        if (cartId) {
            axios
                .post('/user/cart/cartid/order', {
                    cartId: cartId,
                })
                .then((res) => setProductListInCart(res.data))
                .catch((err) => console.log(err));
        }
    }, [cartId]);
    const handleOrder = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1)+ '-' +today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        if(paymentmethods) {
            alert('ban da thanh toan bang Mastercard VISA');
        }
        axios
                .post('/user/order', {
                    userId: user.userId,
                    orderDate: dateTime,
                    totalCost: total,
                    paymentStatus: paymentmethods,
                })
                .then((res) => {
                    if (res.data.affectedRows > 0) {
                        const orderId = res.data.insertId;
                        for (let i = 0; i < productListInCart.length; i++){
                            axios
                                .post('/user/order/detail', {
                                    orderId: orderId,
                                    shoesId: productListInCart[i].shoesId,
                                    shoesQuantity: productListInCart[i].shoesQuantity,
                                    //sizeId: productListInCart[i].sizeId,
                                })
                                .then((res) => {

                                })
                                .catch();
                                // xoa san pham trong gio hang
                            axios
                                .post('/user/cart/detail/deleteproduct', {
                                    detailId: productListInCart[i].detailId,
                                })
                                .then((res) => {

                                })
                                .catch();
                        }
                        alert('Ban da dat hang thanh cong');
                        window.open(window.location.origin, '_self');
                    }
                })
                .catch((err) => console.log(err));
    }
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>THÔNG TIN ĐẶT HÀNG</h3>
            <Products total={total} setTotal={setTotal} />
            <Address />
            <Payment paymentmethods = {paymentmethods} setPaymentMethods = {setPaymentMethods}/>
            <div className={cx('product-order-price')}>
                <div className={cx('order-price')}>
                    <label>Tổng tiền hàng:</label>
                    <span>{total}đ</span>
                </div>
                <div className={cx('ship-price')}>
                    <label>Phí vận chuyển:</label>
                    <span>{}đ</span>
                </div>
                <div className={cx('total-price')}>
                    <label>Tổng số tiền:</label>
                    <span>{total}đ</span>
                </div>
                <div className={cx('total-price', 'btn')}>
                    <button className={cx('order-btn')} onClick={handleOrder}>Đặt hàng</button>
                </div>
            </div>
        </div>
    );
}

export default OrderInfo;
