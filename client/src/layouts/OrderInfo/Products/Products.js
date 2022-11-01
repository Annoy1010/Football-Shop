import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Products.module.scss';
import ProductItem from './ProductItem';
import user from '../../../user';
import data from '../../../hardData';
import configs from '../../../config';

const cx = classNames.bind(styles);

function Products({ total, setTotal }) {
    let totalPrice = 0;
    const productsOfUser = data.cart.filter((item) => item.userId === user)[0];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('order')}>
                <h3 className={cx('heading')}>Thông tin sản phẩm</h3>
                <Container className={cx('menu')}>
                    <Row>
                        <Col>
                            <Container>
                                <Row className={cx('menu-option')}>
                                    <Col xl={9} className={cx('menu-option-item')}>
                                        Sản phẩm
                                    </Col>
                                    <Col xl={3} className={cx('menu-option-item')}>
                                        Số lượng
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Container className={cx('product-order-info')}>
                    <Row>
                        <Col className={cx('product-order-list')}>
                            {productsOfUser.products.map((product, index) => {
                                const currentProduct = data.products.filter(
                                    (productItem) => productItem.id === product.productId,
                                )[0];
                                totalPrice += currentProduct.price * product.quantity;
                                return <ProductItem product={product} index={index} />;
                            })}
                            {setTotal(totalPrice)}
                        </Col>
                    </Row>
                    <Row className={cx('option-btn-list')}>
                        <Col xl={6}>
                            <Link className={cx('option-btn')} to={`/user/id/${user}/cart`}>
                                Quay lại giỏ hàng
                            </Link>
                        </Col>
                        <Col xl={5}>
                            <Link className={cx('option-btn', 'continue-btn')} to={configs.routes.products}>
                                Tiếp tục mua hàng
                            </Link>
                        </Col>
                        <Col xl={1}></Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Products;
