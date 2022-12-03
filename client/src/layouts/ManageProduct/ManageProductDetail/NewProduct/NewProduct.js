import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './NewProduct.module.scss';
import AvailableProductItem from './AvailableProductItem'; /// Sản phẩm hiện đang có trong shop
import ImportNewProduct from './ImportNewProduct'; /// Nhập thông tin sản phẩm mới
import ImportedProduct from './ImportedProduct';
const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem('user'));
const employeeId = user && Object.keys(user).length > 0 && user.employeeId;

function NewProduct() {
    const [availableProducts, setAvailableProducts] = useState([]);
    const [displayImportNewProductScreen, setDisplayNewProductScreen] = useState(false);
    const [importNewProductFormClick, setImportNewProductFormClick] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);
    const [importList, setImportList] = useState([]);
    const [importStatus, setImportStatus] = useState(0);

    const distinctAvailableProductList = [];

    useEffect(() => {
        if (importList.length > 0) {
            setTotalPrice(
                importList.reduce(
                    (acc, item) => {
                        if (item.shoesId) {
                            return Number.parseInt(acc) + item.price * (1 - item.sale / 100) * item.quantity;
                        }
                        return Number.parseInt(acc) + item.price * (1 - item.sale / 100) * item.importQuantity;
                    },
                    [0],
                ),
            );
        }
    }, [importList]);

    console.log(availableProducts);
    useEffect(() => {
        axios
            .get('/products/all')
            .then((res) => {
                if (res.data.length > 0) {
                    setAvailableProducts(res.data);
                }
            })
            .catch(() => []);
    }, []);

    useEffect(() => {
        axios
            .get('/products/all')
            .then((res) => {
                if (res.data.length > 0) {
                    setAvailableProducts(res.data);
                }
            })
            .catch(() => {});
        if (importList.length !== 0 && importStatus === importList.length) {
            alert('Nhập hàng thành công');
            setImportStatus(0);
            setImportList([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [importStatus]);

    const handleDisplayImportNewProduct = () => {
        if (!importNewProductFormClick) {
            alert('Vui lòng tạo phiếu nhập hàng trước khi nhập sản phẩm');
        } else {
            setDisplayNewProductScreen(true);
        }
    };

    const handleImportNewProductForm = () => {
        setImportNewProductFormClick(true);
    };

    const handleDestroyImportNewProductForm = () => {
        setImportList([]);
        setImportNewProductFormClick(false);
    };

    const handleSubmitImportNewProduct = () => {
        axios
            .post('/products/import/newImport', {
                employeeId: employeeId.toString(),
                totalPrice: totalPrice.toString(),
            })
            .then((res) => {
                if (res.data.length !== 0) {
                    const _importId = res.data[res.data.length - 1].importId;
                    importList.forEach((item, index) => {
                        if (item.shoesId && item.shoesId !== null) {
                            axios
                                .post('/products/import/newImportDetail', {
                                    importId: _importId.toString(),
                                    shoesId: item.shoesId.toString(),
                                    quantity: item.quantity.toString(),
                                    sizeId: item.sizeId,
                                })
                                .then((res) => {
                                    if (res.data.affectedRows > 0) {
                                        axios
                                            .post('/products/size/all', {
                                                shoesId: item.shoesId.toString(),
                                                sizeId: item.sizeId,
                                                quantity: item.quantity.toString(),
                                            })
                                            .then((res) => {
                                                if (res.data.affectedRows > 0) {
                                                    setImportStatus((state) => state + 1);
                                                    alert('thành công');
                                                }
                                            })
                                            .catch((err) => console.log(err));
                                    }
                                })
                                .catch((err) => console.error(err));
                        } else {
                            axios
                                .post('/products/import/newDescriptionlId')
                                .then((res) => {
                                    if (res.data.length !== 0) {
                                        const _descriptionId = res.data[res.data.length - 1].descriptionId;
                                        // setDescriptionId(res.data[0].descriptionId);
                                        axios
                                            .post('/products/import/newProduct', {
                                                descriptionId: _descriptionId.toString(),
                                                item,
                                            })
                                            .then((res) => {
                                                if (res.data.length !== 0) {
                                                    const _shoesId = res.data[res.data.length - 1].shoesId;
                                                    console.log('shoes id cua ', index, ': ', _shoesId);
                                                    axios
                                                        .post('/products/import/newImportDetailAndSize', {
                                                            shoesId: _shoesId.toString(),
                                                            importId: _importId.toString(),
                                                            sizeId: item.sizeId,
                                                            importQuantity: item.importQuantity.toString(),
                                                        })
                                                        .then((res) => {
                                                            if (res.data.affectedRows > 0) {
                                                                axios
                                                                    .post('/products/import/image', {
                                                                        shoesId: _shoesId.toString(),
                                                                        product: item,
                                                                    })
                                                                    .then((res) => {
                                                                        if (res.data.affectedRows > 0) {
                                                                            setImportStatus((state) => state + 1);
                                                                        }
                                                                    })
                                                                    .catch((err) => console.log(err));
                                                            }
                                                        })
                                                        .catch((err) => console.log(err));
                                                }
                                            });
                                    }
                                })
                                .catch((err) => console.log(err));
                        }
                    });
                }
            })
            .catch((err) => console.log(err));
        axios
            .get('/products/all')
            .then((res) => {
                if (res.data.length > 0) {
                    setAvailableProducts(res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>DANH MỤC SẢN PHẨM HIỆN CÓ</h3>
            <Container className={cx('product-list')}>
                <Row>
                    {availableProducts &&
                        availableProducts.length > 0 &&
                        availableProducts.map(
                            (product) =>
                                !distinctAvailableProductList.includes(product.shoesName) &&
                                distinctAvailableProductList.push(product.shoesName) && (
                                    <Col lg={6} xl={6}>
                                        <AvailableProductItem
                                            product={product}
                                            index={product.shoesId}
                                            importNewProductFormClick={importNewProductFormClick}
                                            setImportList={setImportList}
                                        />
                                    </Col>
                                ),
                        )}
                </Row>
            </Container>
            <div className={cx('control-options')}>
                <button className={cx('btn-add-new-product')} onClick={handleDisplayImportNewProduct}>
                    + Nhập sản phẩm mới
                </button>
                <button className={cx('btn-import-new-product')} onClick={handleImportNewProductForm}>
                    Tạo phiếu nhập hàng
                </button>
            </div>
            {displayImportNewProductScreen && (
                <ImportNewProduct
                    setDisplayNewProductScreen={setDisplayNewProductScreen}
                    setImportList={setImportList}
                />
            )}
            {importNewProductFormClick && (
                <Container className={cx('import-list-container')}>
                    <h3>DANH SÁCH SẢN PHẨM VỪA ĐƯỢC NHẬP HÀNG</h3>
                    <Row className={cx('import-list')}>
                        {importList.length === 0 ? (
                            <h4>Không có sản phẩm nào được nhập hàng</h4>
                        ) : (
                            importList.map((productItem, index) => (
                                <ImportedProduct product={productItem} index={index} />
                            ))
                        )}
                    </Row>
                    {importList.length !== 0 && (
                        <>
                            <div className={cx('import-total-cost')}>
                                <span>
                                    Tổng tiền nhập hàng:
                                    <b style={{ marginLeft: '10px', fontSize: '1.5rem' }}>{`${totalPrice} VNĐ`}</b>
                                </span>
                            </div>
                            <button className={cx('btn-submit-import')} onClick={handleSubmitImportNewProduct}>
                                Xác nhận nhập hàng
                            </button>
                        </>
                    )}
                    <button className={cx('btn-destroy-import')} onClick={handleDestroyImportNewProductForm}>
                        Hủy phiếu nhập hàng
                    </button>
                </Container>
            )}
        </div>
    );
}

export default NewProduct;
