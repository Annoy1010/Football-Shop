import classNames from 'classnames/bind';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import styles from './Size.module.scss';

const cx = classNames.bind(styles);

// const steps = [
//     {
//         title: 'Chuẩn bị',
//         content: `1 tờ giấy trắng lớn, phải to hơn bàn chân bạn <br></br> 1 cây bút chì 1 cây thước đo`,
//     },
//     {
//         title: 'Bước 1: Vẽ kích cỡ chân',
//         content: `Bạn đặt tờ giấy xuống sàn nhà, sau đó đặt bàn chân của bạn thật chắc chắn lên tờ giấy.
//         <br></br>
//         Dùng bút chì để vẽ lại khung bàn chân của mình cho thật chuẩn. Bạn nên giữ bút chì thẳng
//         đứng và vuông góc với tờ giấy để vẽ được chính xác hơn.<br></br>
//         <u>Lưu ý:</u> Bạn phải luôn giữ bàn chân ở vị trí cũ và không được di chuyển bàn chân ngay
//         khi dừng bút chì giữa chừng.`,
//     },
//     {
//         title: 'Bước 2: Đánh dấu các số đo chiều dài và chiều rộng',
//         content: `Bạn sử dụng bút chì để vẽ một đường thẳng để chạm vào các điểm trên cùng, dưới cùng và 2 bên
//         của bản phác thảo bàn chân như hình ảnh dưới để chúng ta đo chiều dài chân.`,
//     },
//     {
//         title: 'Bước 3: Xác định chiều dài bàn chân',
//         content: `Bạn sử dụng thước kẻ để đo chiều dài từ phía dưới dòng kẻ trên đến dòng kẻ dưới mà bạn đã
//         vẽ. Sau khi đo xong, bạn có thể làm tròn số trong khoảng 0.5cm. Bạn nên làm tròn xuống để
//         trừ hao cho những sai lệch khi vẽ khuôn chân vì các đường kẻ thường chênh lên một chút so
//         với kích thước thật của bàn chân bạn.<br></br> <u>Lưu ý:</u> Bạn phải đo trên đường thẳng
//         vuông góc với hai đường kẻ trên và dưới.`,
//     },
//     {
//         title: 'Bước 4: Tìm và chọn size giày phù hợp',
//         content: `Ghi con số mà bạn đo được vào tờ giấy, rồi áp dụng công thức sau để xác định size giày của
//         mình trên thang đo: N = L+1.5 cm = cỡ giày <br></br>
//         <u>Ví dụ:</u> Bạn đo được L= 23 cm => N= 23cm + 1.5cm= 24.5 cm. Vậy cỡ giày của bạn
//         là 24.5 cm. Dựa vào bảng đo dưới đây bạn sẽ xác định được cỡ giày Nam là size 39 và cỡ giày
//         Nữ là 42.`,
//     },
// ];

function Size() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')} data-aos="fade-up">
                HƯỚNG DẪN CHỌN SIZE GIÀY
            </h2>
            <div className={cx('description')}>
                <div className={cx('img-desc')} data-aos="fade-up">
                    <img
                        src="https://4men.com.vn/images/thumbs/2017/08/cach-do-size-giay-nam-chuan-100-news-234.jpg"
                        alt=""
                    />
                </div>

                {/* <div className={cx('detail-direct')}>
                    {steps.map((step, index) => (
                        <div key={index} className={cx('detail-step')}>
                            <h3 className={cx('step-title')}>{step.title}</h3>
                            <p className={cx('step-content')}>{step.content}</p>
                        </div>
                    ))}
                </div> */}

                <div className={cx('detail-direct')}>
                    <div className={cx('detail-step')} data-aos="fade-up">
                        <h3 className={cx('step-title')}>Chuẩn bị</h3>
                        <p className={cx('step-content')}>
                            1 tờ giấy trắng lớn, phải to hơn bàn chân bạn<br></br>1 cây bút chì<br></br>1 cây thước đo
                        </p>
                    </div>
                    <div className={cx('detail-step')} data-aos="fade-up">
                        <h3 className={cx('step-title')}>Bước 1: Vẽ kích cỡ chân</h3>
                        <p className={cx('step-content')}>
                            Bạn đặt tờ giấy xuống sàn nhà, sau đó đặt bàn chân của bạn thật chắc chắn lên tờ giấy.
                            <br></br>
                            Dùng bút chì để vẽ lại khung bàn chân của mình cho thật chuẩn. Bạn nên giữ bút chì thẳng
                            đứng và vuông góc với tờ giấy để vẽ được chính xác hơn.<br></br>
                            <u>Lưu ý:</u> Bạn phải luôn giữ bàn chân ở vị trí cũ và không được di chuyển bàn chân ngay
                            khi dừng bút chì giữa chừng.
                        </p>
                    </div>
                    <div className={cx('detail-step')} data-aos="fade-up">
                        <h3 className={cx('step-title')}>Bước 2: Đánh dấu các số đo chiều dài và chiều rộng</h3>
                        <p className={cx('step-content')}>
                            Bạn sử dụng bút chì để vẽ một đường thẳng để chạm vào các điểm trên cùng, dưới cùng và 2 bên
                            của bản phác thảo bàn chân như hình ảnh dưới để chúng ta đo chiều dài chân.
                        </p>
                    </div>
                    <div className={cx('detail-step')} data-aos="fade-up">
                        <h3 className={cx('step-title')}>Bước 3: Xác định chiều dài bàn chân</h3>
                        <p className={cx('step-content')}>
                            Bạn sử dụng thước kẻ để đo chiều dài từ phía dưới dòng kẻ trên đến dòng kẻ dưới mà bạn đã
                            vẽ. Sau khi đo xong, bạn có thể làm tròn số trong khoảng 0.5cm. Bạn nên làm tròn xuống để
                            trừ hao cho những sai lệch khi vẽ khuôn chân vì các đường kẻ thường chênh lên một chút so
                            với kích thước thật của bàn chân bạn.<br></br> <u>Lưu ý:</u> Bạn phải đo trên đường thẳng
                            vuông góc với hai đường kẻ trên và dưới.
                        </p>
                    </div>
                    <div className={cx('detail-step')} data-aos="fade-up">
                        <h3 className={cx('step-title')}>Bước 4: Tìm và chọn size giày phù hợp</h3>
                        <p className={cx('step-content')}>
                            Ghi con số mà bạn đo được vào tờ giấy, rồi áp dụng công thức sau để xác định size giày của
                            mình trên thang đo: N = L+1.5 cm = cỡ giày <br></br>
                            <u>Ví dụ:</u> Bạn đo được L= 23 cm {`${`=>`}`} N= 23cm + 1.5cm= 24.5 cm. Vậy cỡ giày của bạn
                            là 24.5 cm. Dựa vào bảng đo dưới đây bạn sẽ xác định được cỡ giày Nam là size 39 và cỡ giày
                            Nữ là 42.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Size;
