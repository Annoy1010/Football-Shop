import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer } from 'react-toastify';

import styles from './ProductGeneral.module.scss';
import notify from '../../ToastMessage';

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const userIsExisted = user && Object.keys(user).length !== 0;

function ProductGeneral({ product }) {
    const path = window.location.pathname;
    const pathElements = path.split('/');
    const id = pathElements[pathElements.length - 1];

    const [shoesSizeList, setShoesSizeList] = useState([]);
    const [defaultSize, setDefaultSize] = useState([]);
    const [chosedSize, setChosedSize] = useState(null);
    const [currentValue, setCurrentValue] = useState(0);
    const [cartId, setCartId] = useState(null);

    useEffect(() => {
        product &&
            axios
                .post('/products/size/available', {
                    shoesId: Number.parseInt(id),
                })
                .then((res) => setShoesSizeList(res.data))
                .catch((err) => console.log(err));

        product &&
            axios
                .get('/products/size')
                .then((res) => setDefaultSize(res.data))
                .catch((err) => console.log(err));
        userIsExisted &&
            user.roleAccess.data[0] === 0 &&
            axios
                .post('/user/cartId', {
                    userId: user.userId,
                })
                .then((res) => setCartId(res.data[0].cartId))
                .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isAvailable = (sizeId) => {
        return shoesSizeList.filter((item) => item.sizeId === sizeId && item.quantity > 0);
    };

    const handleAddProductIntoCart = () => {
        if (!userIsExisted) {
            notify('Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng', 'warn', 2000);
        } else {
            if (user.roleAccess.data[0] !== 0) {
                notify('Bạn không có quyền thêm sản phẩm vào giỏ hàng', 'error', 2000);
            } else {
                if (chosedSize === null) {
                    notify('Vui lòng chọn size giày', 'warn', 2000);
                } else if (currentValue === 0) {
                    notify('Vui lòng chọn số lượng giày', 'warn', 2000);
                } else {
                    cartId &&
                        userIsExisted &&
                        user.roleAccess.data[0] === 0 &&
                        axios
                            .post('/user/cart/add/product', {
                                cartId: cartId,
                                shoesId: product.shoesId,
                                quantity: currentValue,
                                sizeId: chosedSize + 1,
                            })
                            .then((res) => {
                                if (res.data.affectedRows > 0) {
                                    notify('Thêm vào giỏ hàng thành công', 'success', 2000);
                                    setCurrentValue(0);
                                    setChosedSize(null);
                                    setTimeout(() => window.location.reload(), 2100);
                                }
                            })
                            .catch((err) => console.log(err));
                }
            }
        }
    };

    const handleBuyShoesImmediatetly = () => {
        if (!userIsExisted) {
            notify('Vui lòng đăng nhập trước khi mua hàng', 'warn', 2000);
        } else {
            if (chosedSize === null) {
                notify('Vui lòng chọn size giày', 'warn', 2000);
            } else if (currentValue === 0) {
                notify('Vui lòng chọn số lượng giày', 'warn', 2000);
            }
        }
    };

    return (
        <Container>
            <Row>
                <Col sm={12} lg={4} xl={5} className={cx('product-img')}>
                    <img src={product.mainImage} alt="" />
                </Col>
                <Col sm={12} lg={8} xl={7} className={cx('product-detail')}>
                    <div className={cx('product-name')}>Giày Bóng Đá {product.shoesName}</div>
                    <div className={cx('product-id')}>
                        <b>Mã sản phẩm: </b>
                        {product.shoesId}
                    </div>
                    <div className={cx('product-price')}>
                        {product.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </div>
                    <div className={cx('product-size-title')}>Chọn size:</div>
                    <div className={cx('product-size-list')}>
                        {defaultSize.map((sizeItem, index) => (
                            <div
                                key={index}
                                className={cx('product-size-item', {
                                    active: index === chosedSize,
                                    'stock-size': isAvailable(sizeItem.sizeId).length === 0,
                                })}
                                onClick={() => setChosedSize(isAvailable(sizeItem.sizeId).length === 0 ? null : index)}
                            >
                                {sizeItem.sizeName}
                            </div>
                        ))}
                    </div>
                    <Link to="/size" className={cx('product-size-direct-link')}>
                        Hướng dẫn chọn size
                    </Link>
                    <div className={cx('product-quanity-title')}>Số lượng:</div>
                    <div className={cx('quantity-options')}>
                        <button
                            className={cx('down-option')}
                            onClick={() => setCurrentValue((prev) => (prev > 0 ? prev - 1 : prev))}
                        >
                            -
                        </button>
                        <div className={cx('detail-option')}>{currentValue}</div>
                        <button className={cx('up-option')} onClick={() => setCurrentValue((prev) => prev + 1)}>
                            +
                        </button>
                    </div>
                    <div className={cx('product-order')}>
                        <button className={cx('add-cart-btn')} onClick={handleAddProductIntoCart}>
                            Thêm vào giỏ hàng
                        </button>
                        <Link
                            className={cx('buy-btn')}
                            to={
                                userIsExisted &&
                                chosedSize !== null &&
                                currentValue > 0 &&
                                `/user/id/${user.userId}/order/info`
                            }
                            state={{
                                userId: user.userId,
                                productList: [
                                    {
                                        cartDetailId: null,
                                        shoesId: product.shoesId,
                                        chosedSize: chosedSize + 1,
                                        shoesQuantity: currentValue,
                                        price: product.price,
                                    },
                                ],
                                buyDirectly: true,
                            }}
                            onClick={handleBuyShoesImmediatetly}
                        >
                            Mua ngay
                        </Link>
                    </div>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
}

export default ProductGeneral;
