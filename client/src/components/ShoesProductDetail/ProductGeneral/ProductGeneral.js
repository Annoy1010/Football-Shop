import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    const [imageIsDisplayingIndex, setImageIsDisplayingIndex] = useState(0);

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
            notify('Vui l??ng ????ng nh???p tr?????c khi th??m s???n ph???m v??o gi??? h??ng', 'warn', 2000);
        } else {
            if (user.roleAccess.data[0] !== 0) {
                notify('B???n kh??ng c?? quy???n th??m s???n ph???m v??o gi??? h??ng', 'error', 2000);
            } else {
                if (chosedSize === null) {
                    notify('Vui l??ng ch???n size gi??y', 'warn', 2000);
                } else if (currentValue === 0) {
                    notify('Vui l??ng ch???n s??? l?????ng gi??y', 'warn', 2000);
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
                                    notify('Th??m v??o gi??? h??ng th??nh c??ng', 'success', 2000);
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
            notify('Vui l??ng ????ng nh???p tr?????c khi mua h??ng', 'warn', 2000);
        } else {
            if (chosedSize === null) {
                notify('Vui l??ng ch???n size gi??y', 'warn', 2000);
            } else if (currentValue === 0) {
                notify('Vui l??ng ch???n s??? l?????ng gi??y', 'warn', 2000);
            }
        }
    };

    const handleChangeImagePreview = (type) => {
        switch (type) {
            case 'next':
                if (imageIsDisplayingIndex < 2) {
                    setImageIsDisplayingIndex((state) => state + 1);
                } else {
                    setImageIsDisplayingIndex(0);
                }
                break;
            case 'prev':
                if (imageIsDisplayingIndex > 0) {
                    setImageIsDisplayingIndex((state) => state - 1);
                } else {
                    setImageIsDisplayingIndex(2);
                }
                break;
            default:
                break;
        }
    };

    return (
        <Container>
            <Row>
                <Col sm={12} lg={4} xl={5} className={cx('product-img')}>
                    <img
                        src={
                            imageIsDisplayingIndex === 0
                                ? product.mainImage
                                : imageIsDisplayingIndex === 1
                                ? product.frontImage
                                : product.backImage
                        }
                        alt=""
                    />
                </Col>
                <Col sm={12} lg={8} xl={7} className={cx('product-detail')}>
                    <div className={cx('product-name')}>Gi??y B??ng ???? {product.shoesName}</div>
                    <div className={cx('product-id')}>
                        <b>M?? s???n ph???m: </b>
                        {product.shoesId}
                    </div>
                    <div className={cx('product-price')}>
                        {product.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </div>
                    <div className={cx('product-size-title')}>Ch???n size:</div>
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
                        H?????ng d???n ch???n size
                    </Link>
                    <div className={cx('product-quanity-title')}>S??? l?????ng:</div>
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
                            Th??m v??o gi??? h??ng
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
            <Row>
                <Col sm={12} lg={4} xl={5} className={cx('product-image-list')}>
                    <button className={cx('btn-prev')} onClick={() => handleChangeImagePreview('prev')}>
                        <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                    </button>
                    <img
                        src={product.mainImage}
                        alt=""
                        className={cx('img-preview', {
                            active: imageIsDisplayingIndex === 0,
                        })}
                        onClick={() => setImageIsDisplayingIndex(0)}
                    />
                    <img
                        src={product.frontImage}
                        alt=""
                        className={cx('img-preview', {
                            active: imageIsDisplayingIndex === 1,
                        })}
                        onClick={() => setImageIsDisplayingIndex(1)}
                    />
                    <img
                        src={product.backImage}
                        alt=""
                        className={cx('img-preview', {
                            active: imageIsDisplayingIndex === 2,
                        })}
                        onClick={() => setImageIsDisplayingIndex(2)}
                    />
                    <button className={cx('btn-next')} onClick={() => handleChangeImagePreview('next')}>
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                    </button>
                </Col>
                <Col sm={12} lg={8} xl={7} />
            </Row>
            <ToastContainer />
        </Container>
    );
}

export default ProductGeneral;
