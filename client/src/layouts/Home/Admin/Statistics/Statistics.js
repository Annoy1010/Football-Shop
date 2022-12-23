import classNames from 'classnames/bind';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import styles from './Statistics.module.scss';
const cx = classNames.bind(styles);

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

function Statistics() {
    const [trademarkList, setTrademarkList] = useState([]);
    const [availableQuantityByTrademark, setAvailableQuantityByTrademark] = useState([]);
    const [importQuantityTotalByTrademark, setImportQuantityTotalTrademark] = useState([]);
    const [importProductHistory, setImportHistory] = useState([]);
    const [partTimeSalary, setPartTimeSalary] = useState(0);
    const [numberOfEmployee, setNumberOfEmployee] = useState(0);
    const [monthForReportSale, setMonthForReportSale] = useState(() => {
        var today = new Date();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        return mm;
    });
    const [yearForReportSale, setYearForReportSale] = useState(() => {
        var today = new Date();
        return today.getFullYear();
    });
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        axios
            .get('/products/trademark')
            .then((res) => setTrademarkList(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/products/trademark/quantity')
            .then((res) => setAvailableQuantityByTrademark(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/products/trademark/import/quantity')
            .then((res) => setImportQuantityTotalTrademark(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/products/import/all')
            .then((res) => setImportHistory(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/parameter')
            .then((res) => setPartTimeSalary(res.data[0].partTimeSalary))
            .catch((err) => console.log(err));
        axios
            .get('/user/employee/all')
            .then((res) => setNumberOfEmployee(res.data.length))
            .catch((err) => console.log(err));
        axios
            .get('/order')
            .then((res) => setOrderHistory(res.data))
            .catch((err) => console.log(err));
    }, []);

    const productData = {
        labels: trademarkList.length > 0 && trademarkList.map((item) => item.trademarkName),
        datasets: [
            {
                label: 'Số lượng nhập',
                data:
                    importQuantityTotalByTrademark.length > 0 &&
                    importQuantityTotalByTrademark.map((item) => item.importQuantityTotal),
                backgroundColor: '#268190',
                border: 'none',
            },
            {
                label: 'Số lượng còn sẵn',
                data:
                    availableQuantityByTrademark.length > 0 &&
                    availableQuantityByTrademark.map((item) => item.sumQuantity),
                backgroundColor: '#98FB98',
                border: 'none',
            },
        ],
    };

    const totalEmployeeSalary = partTimeSalary && numberOfEmployee && numberOfEmployee * partTimeSalary;
    const totalImport =
        importProductHistory.length > 0 &&
        importProductHistory.reduce((acc, item) => {
            var date = new Date(Date.parse(item.importDate));
            var month = ('00' + (date.getUTCMonth() + 1)).slice(-2);
            var year = date.getUTCFullYear();

            if (month === monthForReportSale && year === yearForReportSale) {
                return acc + item.totalPrice;
            }
            return acc;
        }, 0);

    const saleData = {
        labels: ['Lợi nhuận', 'Lương nhân viên', 'Tiền nhập hàng'],
        datasets: [
            {
                data: [totalEmployeeSalary * 3 + totalImport, totalEmployeeSalary, totalImport],
                backgroundColor: ['#E97451', '#EE4B2B', '#E49B0F'],
            },
        ],
    };

    const formatDate = (item, type) => {
        var date;
        switch (type) {
            case 'product':
                date = new Date(Date.parse(item.importDate));
                date =
                    ('00' + date.getUTCDate()).slice(-2) +
                    '-' +
                    ('00' + (date.getUTCMonth() + 1)).slice(-2) +
                    '-' +
                    date.getUTCFullYear();
                return date;
            case 'order':
                date = new Date(Date.parse(item.orderDate));
                date =
                    ('00' + date.getUTCDate()).slice(-2) +
                    '-' +
                    ('00' + (date.getUTCMonth() + 1)).slice(-2) +
                    '-' +
                    date.getUTCFullYear();
                return date;
            default:
                break;
        }
    };

    const handleViewReport = (type) => {
        switch (type) {
            case 'prev':
                if (Number.parseInt(monthForReportSale) > 1) {
                    setMonthForReportSale((state) => (Number.parseInt(state) - 1).toString());
                }
                break;
            case 'next':
                var today = new Date();
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                if (Number.parseInt(yearForReportSale) === Number.parseInt(yyyy)) {
                    if (Number.parseInt(monthForReportSale) < Number.parseInt(mm)) {
                        setMonthForReportSale((state) => (Number.parseInt(state) + 1).toString());
                    }
                } else if (Number.parseInt(yearForReportSale) < Number.parseInt(yyyy)) {
                    if (Number.parseInt(monthForReportSale) < 12) {
                        setMonthForReportSale((state) => (Number.parseInt(state) + 1).toString());
                    } else if (Number.parseInt(monthForReportSale) === 12) {
                        setYearForReportSale((state) => (Number.parseInt(state) + 1).toString());
                        setMonthForReportSale('1');
                    }
                }
                break;
            default:
                break;
        }
    };
    console.log(orderHistory);
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('statistics-product')}>
                <Row>
                    <Col sm={12} xl={7} lg={7}>
                        <h2 className={cx('heading')}>BIỂU ĐỒ SỐ LƯỢNG GIÀY CỦA CỬA HÀNG</h2>
                        <Bar data={productData} style={{ marginBottom: '30px' }} />
                    </Col>
                    <Col sm={12} xl={5} lg={5} className={cx('history')}>
                        <h2 className={cx('heading')}>Lịch sử nhập giày</h2>
                        <Container>
                            <Row>
                                <Col sm={3} xl={3} lg={3} className={cx('history-item-heading')}>
                                    <h4>Mã nhập hàng</h4>
                                </Col>
                                <Col sm={3} xl={3} lg={3} className={cx('history-item-heading')}>
                                    <h4>Tổng tiền</h4>
                                </Col>
                                <Col sm={3} xl={3} lg={3} className={cx('history-item-heading')}>
                                    <h4>Ngày nhập hàng</h4>
                                </Col>
                                <Col sm={3} xl={3} lg={3} className={cx('history-item-heading')}>
                                    <h4>Mã nhân viên</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Container className={cx('detail-history')}>
                                        {importProductHistory.length > 0 &&
                                            importProductHistory.map((item) => (
                                                <Row key={item.importId} className={cx('history-item')}>
                                                    <Col sm={3} xl={3} lg={3} className={cx('history-item-detail')}>
                                                        {item.importId}
                                                    </Col>
                                                    <Col sm={3} xl={3} lg={3} className={cx('history-item-detail')}>
                                                        {item.totalPrice.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    </Col>
                                                    <Col sm={3} xl={3} lg={3} className={cx('history-item-detail')}>
                                                        {formatDate(item, 'product')}
                                                    </Col>
                                                    <Col sm={3} xl={3} lg={3} className={cx('history-item-detail')}>
                                                        {item.employeeId}
                                                    </Col>
                                                </Row>
                                            ))}
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>

            <Container className={cx('statistics-sale')}>
                <Row>
                    <Col sm={12} xl={5} lg={5}>
                        <h2 className={cx('heading')}>BIỂU ĐỒ DOANH THU CỦA CỬA HÀNG</h2>
                        <Pie data={saleData} />
                        <div className={cx('btn-option-time')}>
                            <button className={cx('btn-change-time-report')} onClick={() => handleViewReport('prev')}>
                                <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                            </button>
                            <span>{monthForReportSale + '/' + yearForReportSale}</span>
                            <button className={cx('btn-change-time-report')} onClick={() => handleViewReport('next')}>
                                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                            </button>
                        </div>
                        <div className={cx('btn-export')}>
                            <button>Xem chi tiết</button>
                        </div>
                    </Col>
                    <Col sm={12} xl={7} lg={7}>
                        <h2 className={cx('heading')}>Đơn hàng gần đây</h2>
                        <div className={cx('history')}>
                            <Container>
                                <Row>
                                    <Col sm={2} xl={2} lg={2} className={cx('history-item-heading')}>
                                        <h4>Mã đơn hàng</h4>
                                    </Col>
                                    <Col sm={2} xl={2} lg={2} className={cx('history-item-heading')}>
                                        <h4>Mã khách hàng</h4>
                                    </Col>

                                    <Col sm={3} xl={3} lg={3} className={cx('history-item-heading')}>
                                        <h4>Ngày đặt hàng</h4>
                                    </Col>
                                    <Col sm={2} xl={2} lg={2} className={cx('history-item-heading')}>
                                        <h4>Tổng tiền đơn hàng</h4>
                                    </Col>
                                    <Col sm={3} xl={3} lg={3} className={cx('history-item-heading')}>
                                        <h4>Trạng thái đơn hàng</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Container className={cx('detail-history')}>
                                            {orderHistory.length > 0 &&
                                                orderHistory.map((item) => (
                                                    <Row key={item.orderId} className={cx('history-item')}>
                                                        <Col sm={2} xl={2} lg={2} className={cx('history-item-detail')}>
                                                            {item.orderId}
                                                        </Col>
                                                        <Col sm={2} xl={2} lg={2} className={cx('history-item-detail')}>
                                                            {item.userId}
                                                        </Col>
                                                        <Col sm={3} xl={3} lg={3} className={cx('history-item-detail')}>
                                                            {formatDate(item, 'order')}
                                                        </Col>
                                                        <Col sm={2} xl={2} lg={2} className={cx('history-item-detail')}>
                                                            {item.totalCost.toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })}
                                                        </Col>
                                                        <Col sm={3} xl={3} lg={3} className={cx('history-item-detail')}>
                                                            {item.shipStatus.data[0] === 1
                                                                ? 'Đã hoàn tất'
                                                                : 'Chưa hoàn tất'}
                                                        </Col>
                                                    </Row>
                                                ))}
                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Statistics;
