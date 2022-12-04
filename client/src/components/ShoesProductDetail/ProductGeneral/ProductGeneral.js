import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './ProductGeneral.module.scss';

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
            alert('Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng');
        } else {
            if (user.roleAccess.data[0] !== 0) {
                alert('Bạn không có quyền thêm sản phẩm vào giỏ hàng');
            } else {
                if (chosedSize === null) {
                    alert('Vui lòng chọn size giày');
                } else if (currentValue === 0) {
                    alert('Vui lòng chọn số lượng giày');
                } else {
                    console.log('cart id: ', cartId);
                    cartId &&
                        userIsExisted &&
                        user.roleAccess.data[0] === 0 &&
                        axios
                            .post('/user/cart/add/product', {
                                cartId: cartId,
                                shoesId: chosedSize + 1,
                                quantity: currentValue,
                            })
                            .then((res) => {
                                if (res.data.affectedRows > 0) {
                                    alert('Thêm vào giỏ hàng thành công');
                                    setCurrentValue(0);
                                    setChosedSize(null);
                                    window.location.reload();
                                }
                            })
                            .catch((err) => console.log(err));
                }
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
                    <div className={cx('product-price')}>{product.price}đ</div>
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
                        <button className={cx('buy-btn')}>Mua ngay</button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductGeneral;
