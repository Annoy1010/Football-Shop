import classNames from 'classnames/bind';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import styles from './Statistics.module.scss';
const cx = classNames.bind(styles);

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, LineElement, PointElement);

function Statistics() {
    const [trademarkList, setTrademarkList] = useState([]);
    const [availableQuantityByTrademark, setAvailableQuantityByTrademark] = useState([]);
    const [importQuantityTotalByTrademark, setImportQuantityTotalTrademark] = useState([]);
    const [importProductHistory, setImportProductHistory] = useState([]);
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
            .then((res) => setImportProductHistory(res.data))
            .catch((err) => console.log(err));
        axios
            .get('/parameter')
            .then((res) => setPartTimeSalary(res.data[0].partTimeSalary))
            .catch((err) => console.log(err));
        axios
            .get('/user/employee/all')
            .then((res) =>
                setNumberOfEmployee(() => {
                    const numberOfEmployeeWorkBeforeToday = res.data.filter((employee) => {
                        var mm = new Date().getUTCMonth();
                        var yyyy = new Date().getUTCFullYear();

                        var date = new Date(Date.parse(employee.startDate));
                        var monthOfEntryWork = date.getUTCMonth();
                        var yearOfEntryWork = date.getUTCFullYear();
                        console.log(monthOfEntryWork, mm);
                        return monthOfEntryWork < mm && yearOfEntryWork <= yyyy;
                    }).length;
                    return numberOfEmployeeWorkBeforeToday;
                }),
            )
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
                label: 'S??? l?????ng nh???p',
                data:
                    importQuantityTotalByTrademark.length > 0 &&
                    importQuantityTotalByTrademark.map((item) => item.importQuantityTotal),
                backgroundColor: '#268190',
                border: 'none',
            },
            {
                label: 'S??? l?????ng c??n s???n',
                data:
                    availableQuantityByTrademark.length > 0 &&
                    availableQuantityByTrademark.map((item) => item.sumQuantity),
                backgroundColor: '#98FB98',
                border: 'none',
            },
        ],
    };

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const saleOfMonth =
        orderHistory.length > 0 &&
        months.map((month) => {
            const sale = orderHistory.reduce((acc, orderItem) => {
                var date = new Date(Date.parse(orderItem.orderDate));
                var monthOfOrder = ('00' + (date.getUTCMonth() + 1)).slice(-2);
                var yearOfOrder = date.getUTCFullYear();

                return (
                    Number.parseInt(monthOfOrder) === month &&
                    yearOfOrder === new Date().getUTCFullYear() &&
                    acc + orderItem.totalCost
                );
            }, 0);
            return sale;
        });

    const saleData = {
        labels: [
            'Th??ng 1',
            'Th??ng 2',
            'Th??ng 3',
            'Th??ng 4',
            'Th??ng 5',
            'Th??ng 6',
            'Th??ng 7',
            'Th??ng 8',
            'Th??ng 9',
            'Th??ng 10',
            'Th??ng 11',
            'Th??ng 12',
        ],
        datasets: [
            {
                label: 'Doanh thu',
                data: saleOfMonth,
                backgroundColor: '#0047AB',
                pointBorderColor: '#191970',
                fill: true,
                tension: 0.4,
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

    const summaryData = {
        labels: ['L???i nhu???n', 'L????ng nh??n vi??n', 'Ti???n nh???p h??ng'],
        datasets: [
            {
                data: [
                    saleOfMonth[Number.parseInt(monthForReportSale) - 1] - totalEmployeeSalary - totalImport,
                    totalEmployeeSalary,
                    totalImport,
                ],
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

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('statistics-product')}>
                <Row>
                    <Col sm={12} xl={7} lg={7}>
                        <h2 className={cx('heading')}>BI???U ????? S??? L?????NG GI??Y C???A C???A H??NG</h2>
                        <Bar data={productData} style={{ marginBottom: '30px' }} />
                    </Col>
                    <Col sm={12} xl={5} lg={5} className={cx('history')}>
                        <h2 className={cx('heading')}>L???ch s??? nh???p gi??y</h2>
                        <Container>
                            <Row>
                                <Col sm={3} xl={3} lg={3} className={cx('history-item-heading')}>
                                    <h4>M?? nh???p h??ng</h4>
                                </Col>
                                <Col sm={3} xl={3} lg={3} className={cx('history-item-heading')}>
                                    <h4>T???ng ti???n</h4>
                                </Col>
                                <Col sm={3} xl={3} lg={3} className={cx('history-item-heading')}>
                                    <h4>Ng??y nh???p h??ng</h4>
                                </Col>
                                <Col sm={3} xl={3} lg={3} className={cx('history-item-heading')}>
                                    <h4>M?? nh??n vi??n</h4>
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

            <div className={cx('statistics-sale')}>
                <h2 className={cx('heading')}>BI???U ????? DOANH THU C???A C???A H??NG N??M {`${new Date().getFullYear()}`}</h2>
                <Line data={saleData} />
            </div>

            <Container className={cx('statistics-summary')}>
                <Row>
                    <Col sm={12} xl={5} lg={5}>
                        <h2 className={cx('heading')}>BI???U ????? T???NG H???P C???A C???A H??NG</h2>
                        <Pie data={summaryData} />
                        <div className={cx('btn-option-time')}>
                            <button className={cx('btn-change-time-report')} onClick={() => handleViewReport('prev')}>
                                <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                            </button>
                            <span>{monthForReportSale + '/' + yearForReportSale}</span>
                            <button className={cx('btn-change-time-report')} onClick={() => handleViewReport('next')}>
                                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                            </button>
                        </div>
                        {/* <div className={cx('btn-export')}>
                            <button>Xem chi ti???t</button>
                        </div> */}
                    </Col>
                    <Col sm={12} xl={7} lg={7}>
                        <h2 className={cx('heading')}>????n h??ng g???n ????y</h2>
                        <div className={cx('history')}>
                            <Container>
                                <Row>
                                    <Col sm={2} xl={2} lg={2} className={cx('history-item-heading')}>
                                        <h4>M?? ????n h??ng</h4>
                                    </Col>
                                    <Col sm={2} xl={2} lg={2} className={cx('history-item-heading')}>
                                        <h4>M?? kh??ch h??ng</h4>
                                    </Col>

                                    <Col sm={3} xl={3} lg={3} className={cx('history-item-heading')}>
                                        <h4>Ng??y ?????t h??ng</h4>
                                    </Col>
                                    <Col sm={2} xl={2} lg={2} className={cx('history-item-heading')}>
                                        <h4>T???ng ti???n ????n h??ng</h4>
                                    </Col>
                                    <Col sm={3} xl={3} lg={3} className={cx('history-item-heading')}>
                                        <h4>Tr???ng th??i ????n h??ng</h4>
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
                                                                ? '???? ho??n t???t'
                                                                : 'Ch??a ho??n t???t'}
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
