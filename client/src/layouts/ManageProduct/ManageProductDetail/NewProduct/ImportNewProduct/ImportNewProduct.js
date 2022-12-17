import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer } from 'react-toastify';

import styles from './ImportNewProduct.module.scss';
import notify from '../../../../../components/ToastMessage';

const cx = classNames.bind(styles);

function ImportNewProduct({ setDisplayNewProductScreen, setImportList }) {
    const [productName, setProductName] = useState('');
    const [trademarkId, setTrademarkId] = useState('');
    const [typeNameId, setTypeNameId] = useState('');
    const [grassTypeId, setGrassTypeId] = useState('');
    const [positionId, setPositionId] = useState('');
    const [sizeId, setSizeId] = useState(null);
    const [originalNationId, setOriginalNationId] = useState('');
    const [price, setPrice] = useState(null);
    const [sale, setSale] = useState(null);
    const [importQuantity, setImportQuantity] = useState(null);
    const [frontImage, setFrontImage] = useState('https://daknong.dms.gov.vn/CmsView-QLTT-portlet/res/no-image.jpg');
    const [mainImage, setMainImage] = useState('https://daknong.dms.gov.vn/CmsView-QLTT-portlet/res/no-image.jpg');
    const [backImage, setBackImage] = useState('https://daknong.dms.gov.vn/CmsView-QLTT-portlet/res/no-image.jpg');

    const [trademarkList, setTrademarkList] = useState([]);
    const [grassTypeList, setGrassTypeList] = useState([]);
    const [positionList, setPositionList] = useState([]);
    const [sizeList, setSizeList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [originalNationList, setOriginalNationList] = useState([]);

    useEffect(() => {
        axios
            .get('/products/trademark')
            .then((res) => setTrademarkList(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/products/grass')
            .then((res) => setGrassTypeList(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/products/position')
            .then((res) => setPositionList(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/products/size')
            .then((res) => setSizeList(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/products/originNational')
            .then((res) => setOriginalNationList(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (trademarkId) {
            axios
                .get(`/products/type?trademarkId=${trademarkId}`)
                .then((res) => setTypeList(res.data))
                .catch((err) => console.log(err));
        }
    }, [trademarkId]);

    const getbase64 = (file, type) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            switch (type) {
                case 'front':
                    setFrontImage(reader.result);
                    break;
                case 'main':
                    setMainImage(reader.result);
                    break;
                case 'back':
                    setBackImage(reader.result);
                    break;
                default:
                    break;
            }
        };
    };

    const handleOnChangeFrontImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            getbase64(e.target.files[0], 'front');
        }
    };

    const handleOnChangeMainImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            getbase64(e.target.files[0], 'main');
        }
    };

    const handleOnChangeBackImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            getbase64(e.target.files[0], 'back');
        }
    };

    const handleAddNewProduct = () => {
        if (
            productName !== '' &&
            trademarkId !== '' &&
            grassTypeId !== '' &&
            typeNameId !== '' &&
            positionId !== '' &&
            sizeId !== null &&
            originalNationId !== '' &&
            price !== null &&
            sale !== null &&
            importQuantity !== null &&
            frontImage !== '' &&
            mainImage !== '' &&
            backImage !== ''
        ) {
            if (Number.isInteger(Number.parseInt(price)) && Number.parseInt(price) > 0) {
                if (
                    Number.isInteger(Number.parseInt(sale)) &&
                    Number.parseInt(sale) >= 0 &&
                    Number.parseInt(sale) <= 100
                ) {
                    if (Number.isInteger(Number.parseInt(importQuantity)) && Number.parseInt(importQuantity) > 0) {
                        const product = {
                            productName,
                            trademarkId,
                            typeNameId,
                            grassTypeId,
                            positionId,
                            sizeId,
                            originalNationId,
                            price,
                            sale,
                            importQuantity,
                            frontImage,
                            mainImage,
                            backImage,
                        };

                        setImportList((state) => [...state, product]);
                        setDisplayNewProductScreen(false);
                    } else {
                        notify('Vui lòng kiểm tra dữ liệu Số lượng nhập', 'warn', 2000);
                    }
                } else {
                    notify('Vui lòng kiểm tra dữ liệu Tỉ lệ giảm giá', 'warn', 2000);
                }
            } else {
                notify('Vui lòng kiểm tra dữ liệu Giá tiền', 'warn', 2000);
            }
        } else {
            notify('Vui lòng điền đầy đủ thông tin trước khi nhập hàng sản phẩm', 'warn', 2000);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Nhập sản phẩm mới</h3>

            <div className={cx('quantity-detail')}>
                <h3 className={cx('heading-quantity')}>Chi tiết thông tin</h3>
                <Container className={cx('quantity-input')}>
                    <Row>
                        <Col lg={6} xl={6} className={cx('info-item')}>
                            <label className={cx('label-input')}>Tên sản phẩm</label>
                            <input
                                className={cx('quantity-input-item')}
                                value={productName}
                                placeholder="Nike Mercurial Superfly 9 Elite"
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </Col>
                        <Col lg={6} xl={6} className={cx('info-item')}>
                            <label className={cx('label-input')}>Nhãn hiệu</label>
                            <select
                                className={cx('quantity-input-item')}
                                onChange={(e) => setTrademarkId(e.target.value)}
                            >
                                <option value="" className={cx('option-item')}>
                                    Chọn nhãn hiệu
                                </option>
                                {trademarkList.length > 0 &&
                                    trademarkList.map((item, index) => (
                                        <option key={index} value={item.trademarkId} className={cx('option-item')}>
                                            {item.trademarkName}
                                        </option>
                                    ))}
                            </select>
                        </Col>
                        <Col lg={6} xl={6} className={cx('info-item')}>
                            <label className={cx('label-input')}>Loại giày</label>
                            <select
                                className={cx('quantity-input-item')}
                                onChange={(e) => setTypeNameId(e.target.value)}
                            >
                                <option className={cx('option-item')}>Chọn loại giày</option>
                                {typeList.length > 0 &&
                                    typeList.map((item, index) => (
                                        <option key={index} value={item.typeId} className={cx('option-item')}>
                                            {item.typeName}
                                        </option>
                                    ))}
                            </select>
                        </Col>
                        <Col lg={6} xl={6} className={cx('info-item')}>
                            <label className={cx('label-input')}>Loại mặt sân</label>
                            <select
                                className={cx('quantity-input-item')}
                                onChange={(e) => setGrassTypeId(e.target.value)}
                            >
                                <option value="" className={cx('option-item')}>
                                    Chọn mặt sân
                                </option>
                                {grassTypeList.length > 0 &&
                                    grassTypeList.map((item, index) => (
                                        <option key={index} value={item.grassId} className={cx('option-item')}>
                                            {item.grassName}
                                        </option>
                                    ))}
                            </select>
                        </Col>
                        <Col lg={6} xl={6} className={cx('info-item')}>
                            <label className={cx('label-input')}>Vị trí thi đấu</label>
                            <select
                                className={cx('quantity-input-item')}
                                onChange={(e) => setPositionId(e.target.value)}
                            >
                                <option value="" className={cx('option-item')}>
                                    Chọn vị trí
                                </option>
                                {positionList.length > 0 &&
                                    positionList.map((item, index) => (
                                        <option key={index} value={item.playpositionId} className={cx('option-item')}>
                                            {item.playPositionName}
                                        </option>
                                    ))}
                            </select>
                        </Col>
                        <Col lg={6} xl={6} className={cx('info-item')}>
                            <label className={cx('label-input')}>Kích thước</label>
                            <select className={cx('quantity-input-item')} onChange={(e) => setSizeId(e.target.value)}>
                                <option value="" className={cx('option-item')}>
                                    Chọn size
                                </option>
                                {sizeList.length > 0 &&
                                    sizeList.map((item, index) => (
                                        <option key={index} value={item.sizeId} className={cx('option-item')}>
                                            {item.sizeName}
                                        </option>
                                    ))}
                            </select>
                        </Col>
                        <Col lg={6} xl={6} className={cx('info-item')}>
                            <label className={cx('label-input')}>Xuất sứ</label>
                            <select
                                className={cx('quantity-input-item')}
                                onChange={(e) => setOriginalNationId(e.target.value)}
                            >
                                <option value="1" className={cx('option-item')}>
                                    Chọn Quốc gia
                                </option>
                                {originalNationList.length > 0 &&
                                    originalNationList.map((item, index) => (
                                        <option key={index} value={item.nationalId} className={cx('option-item')}>
                                            {item.nationalName}
                                        </option>
                                    ))}
                            </select>
                        </Col>
                        <Col lg={6} xl={6} className={cx('info-item')}>
                            <label className={cx('label-input')}>Giá tiền</label>
                            <input
                                value={price}
                                className={cx('quantity-input-item')}
                                placeholder="100000 VNĐ"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Col>
                        <Col lg={6} xl={6} className={cx('info-item')}>
                            <label className={cx('label-input')}>Tỉ lệ giảm giá</label>
                            <input
                                value={sale}
                                className={cx('quantity-input-item')}
                                placeholder="20%"
                                onChange={(e) => setSale(e.target.value)}
                            />
                        </Col>
                        <Col lg={6} xl={6} className={cx('info-item')}>
                            <label className={cx('label-input')}>Số lượng nhập</label>
                            <input
                                value={importQuantity}
                                className={cx('quantity-input-item')}
                                placeholder="Số lượng nhập"
                                onChange={(e) => setImportQuantity(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className={cx('product-img')}>
                        <Col className={cx('product-image-item')}>
                            <img src={frontImage} alt="" />
                            <input
                                type="file"
                                id="img"
                                name="img"
                                accept="image/*"
                                onChange={(e) => handleOnChangeFrontImage(e)}
                            />
                        </Col>
                        <Col className={cx('product-image-item')}>
                            <img src={mainImage} alt="" />
                            <input
                                type="file"
                                id="img"
                                name="img"
                                accept="image/*"
                                onChange={(e) => handleOnChangeMainImage(e)}
                            />
                        </Col>
                        <Col className={cx('product-image-item')}>
                            <img src={backImage} alt="" />
                            <input
                                type="file"
                                id="img"
                                name="img"
                                accept="image/*"
                                onChange={(e) => handleOnChangeBackImage(e)}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('submit-btn')} onClick={handleAddNewProduct}>
                    Xác nhận
                </button>
                <button className={cx('close-btn')} onClick={() => setDisplayNewProductScreen(false)}>
                    Đóng
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

ImportNewProduct.propTypes = {
    setDisplayNewProductScreen: PropTypes.func.isRequired,
    setImportList: PropTypes.func.isRequired,
};

export default ImportNewProduct;
