import classNames from 'classnames/bind';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Profile.module.scss';
import PersonalDetail from './PersonalDetail';

const cx = classNames.bind(styles);

const subCategory = [{ name: 'Hồ sơ' }, { name: 'Ngân hàng' }, { name: 'Địa chỉ' }, { name: 'Đổi mật khẩu' }];

function Profile() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleActive = (index) => {
        setActiveIndex(index);
    };

    return (
        <Container className={cx('wrapper')}>
            <Row>
                <Col lg={4} xl={3}>
                    <div className={cx('category')}>
                        <div className={cx('category-item')}>
                            <h3 className={cx('heading-category-item')} onClick={() => handleActive(0)}>
                                Tài khoản của tôi
                            </h3>
                            <div className={cx('sub-category-list')}>
                                {subCategory.map((subItem, index) => (
                                    <div
                                        key={index}
                                        className={cx('sub-category-item-link', {
                                            active: index === activeIndex,
                                        })}
                                        onClick={() => handleActive(index)}
                                    >
                                        {subItem.name}
                                        {index === activeIndex ? <div className={cx('line-bar')}></div> : <></>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={8} xl={9}>
                    <PersonalDetail index={activeIndex} />
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;
