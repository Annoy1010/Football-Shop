const storeRules = [
    {
        content:
            'Luôn cập nhật những mẫu mã giày bóng đá mới nhất và những chính sách khuyến mãi - ưu đãi giảm giá hấp dẫn.',
    },
    {
        content:
            'Chính sách bảo hành tuyệt đối với sản phẩm và đổi hàng trong vòng 7 ngày, thanh toán tiện lợi thông qua dịch vụ COD (Nhận hàng - Thanh toán)',
    },
    {
        content:
            'Đội ngũ CSKH tư vấn nhiệt tình, kỹ càng sẽ giúp khách hàng có thể lựa chọn cho mình một đôi giày phù hợp và hài lòng nhất.',
    },
    {
        content:
            'Tập thể ABC.COM hiểu rằng sự hài lòng của khách hàng chính là mục tiêu to lớn nhất, là thước đo thành công của một thương hiệu.',
    },
];

const contacts = [
    {
        title: 'Địa chỉ của chúng tôi:',
        desc: 'Đại học Công nghệ thông tin, Đại học Quốc gia Thành phố Hồ Chí Minh',
    },
    { title: 'Số điện thoại:', desc: '0368341595' },
    { title: 'Thời gian làm việc:', desc: 'Thứ 2 đến CN từ 8h đến 21h' },
];

const productOptionsList = [
    {
        title: 'Mặt sân thi đấu',
        children: [
            {
                name: 'Sân cỏ nhân tạo (TF)',
            },
            {
                name: 'Sân cỏ tự nhiên (FG)',
            },
            {
                name: 'Sân Futsal (IC)',
            },
        ],
    },
    {
        title: 'Loại giày',
        children: [
            {
                name: 'Nike',
                list: [
                    {
                        type: 'Nike Mercurial',
                    },
                    {
                        type: 'Nike Phantom',
                    },
                    {
                        type: 'Nike Tiempo',
                    },
                    {
                        type: 'Nike Magista',
                    },
                    {
                        type: 'Nike Hypervenom',
                    },
                ],
            },
            {
                name: 'Adidas',
                list: [
                    {
                        type: 'Adidas X',
                    },
                    {
                        type: 'Adidas Copa',
                    },
                    {
                        type: 'Adidas Predator',
                    },
                    {
                        type: 'Adidas Nemeziz',
                    },
                ],
            },
            {
                name: 'Puma',
                list: [
                    {
                        type: 'Puma Future',
                    },
                    {
                        type: 'Puma Ultra',
                    },
                ],
            },
            {
                name: 'Mizuno',
                list: [
                    {
                        type: 'Mizuno Morelia NEO',
                    },
                    {
                        type: 'Mizuno Morelia Japan',
                    },
                ],
            },
            {
                name: 'Kamito',
                list: [
                    {
                        type: 'Kamito TA11',
                    },
                ],
            },
            {
                name: 'Wika',
                list: [
                    {
                        type: 'Wika QH19',
                    },
                ],
            },
        ],
    },
    {
        title: 'Vị trí thi đấu',
        children: [
            {
                name: 'Thủ môn',
            },
            {
                name: 'Hậu vệ',
            },
            {
                name: 'Tiền vệ',
            },
            {
                name: 'Tiền đạo',
            },
        ],
    },
    {
        title: 'Phụ kiện',
    },
];

const productsOfField = [
    {
        id: 1,
        name: 'Giày cỏ nhân tạo (TF)',
        desc: 'Giày dành cho mặt sân nhân tạo 5-7 người',
        src: 'https://static.nike.com/a/images/t_default/abb37116-285b-41e2-baf3-4305a3cb8298/mercurial-vapor-15-club-tf-football-shoes-1f5s8B.png',
    },
    {
        id: 2,
        name: 'Giày cỏ tự nhiên (FG)',
        desc: 'Giày dành cho mặt sân tự nhiên 11 người',
        src: 'https://static.nike.com/a/images/t_default/b6836e2d-1979-4496-9401-dd8d6778731a/phantom-gt2-elite-fg-football-boot-wRNH0g.png',
    },
    {
        id: 3,
        name: 'Sân Futsal (IC)',
        desc: 'Giày dành cho mặt sân xi măng và trong nhà',
        src: 'https://www.newmagista.com/7065-thickbox_default/nike-mercurial-superflyx-vi-elite-ic-indoor-shoes-orange-black.jpg',
    },
];

const slides = [
    {
        className: 'first-item',
        src: 'https://4.bp.blogspot.com/-H1gshry3UAM/Vv0SirY6ePI/AAAAAAAA6Fo/0JrXw0mFcIEUKrasTbObx2dwokdbDm8ag/s1600/Adidas-X-SL%2B%25280-1%2529.jpg',
        alt: 'First Slide',
    },
    { className: 'second-item', src: 'https://wallpaperaccess.com/full/3947630.jpg', alt: 'Second Slide' },
    {
        className: 'third-item',
        src: 'https://www.soccerbible.com/media/101127/5-nike-mercurial-dream-speed-min.jpg',
        alt: 'Third Slide',
    },
];

const trademarks = [
    {
        name: 'NIKE',
        slogan: 'Just Do It',
        src: 'https://wallpapercave.com/wp/wp2085600.jpg',
    },
    {
        name: 'ADIDAS',
        slogan: 'Impossible Is Nothing',
        src: 'https://cdn.vox-cdn.com/thumbor/jg9YNoiEViGyBpve5UCYvDrDsDE=/254x0:1784x1020/1220x813/filters:focal(254x0:1784x1020):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/35704048/338067.0.jpg',
    },
    {
        name: 'PUMA',
        slogan: 'Unleash Your Wild Side',
        src: 'https://boothype.com/wp-content/uploads/2020/08/PUMA-PR_ULTRA-5_1920x1080_5.jpg',
    },
    {
        name: 'MIZUNO',
        slogan: 'Reach Beyond',
        src: 'https://cdn.sportlaunches.com/wp-content/uploads/2018/06/Mizuno-Rebula-2-V1-Mij-Soccer-Cleats.jpg',
    },
    {
        name: 'KAMITO',
        slogan: 'Bình thường mới - Sắc màu mới',
        src: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/298808059_431147082396474_6212363867714991399_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=y_ynNH2aUOYAX-kFhVt&_nc_ht=scontent.fsgn2-7.fna&oh=00_AT8WU9r8xqk1LkjoLa2DoNYtFHg-T9fwYtr3I1MwGImzgQ&oe=635DEB55',
    },
    {
        name: 'WIKA',
        slogan: 'Chạm Là Cản Phá',
        src: 'https://www.quynhonsport.com/wp-content/uploads/2021/03/E5312082-6469-49A8-B022-EAA0CC8B177B.jpeg',
    },
];

const allProductChoicesMenu = [
    {
        title: 'Kích thước',
        children: [{ item: 38 }, { item: 39 }, { item: 40 }, { item: 41 }, { item: 42 }, { item: 43 }, { item: 44 }],
        fullDisplay: false,
        perFive: true,
        perFour: false,
        default: false,
    },
    {
        title: 'Mặt sân thi đấu',
        children: [{ item: 'TF' }, { item: 'FG' }, { item: 'IC' }],
        perFour: true,
        default: false,
    },
    {
        title: 'Vị trí thi đấu',
        children: [{ item: 'Thủ môn' }, { item: 'Hậu vệ' }, { item: 'Tiền vệ' }, { item: 'Tiền đạo' }],
        fullDisplay: false,
        perFive: false,
        perFour: false,
        default: true,
    },
    {
        title: 'Nhãn hiệu',
        children: [
            { item: 'Nike' },
            { item: 'Adidas' },
            { item: 'Puma' },
            { item: 'Mizuno' },
            { item: 'Kamito' },
            { item: 'Wika' },
        ],
        fullDisplay: false,
        perFive: true,
        perFour: false,
        default: false,
    },
    {
        title: 'Giá tiền',
        children: [
            { item: 'Dưới 300.000đ' },
            { item: '300.000đ - 500.000đ' },
            { item: '500.000đ - 1.000.000đ' },
            { item: 'Trên 1.000.000đ' },
        ],
        fullDisplay: true,
        perFive: false,
        perFour: false,
        default: false,
    },
];

const position = [
    {
        name: 'Thủ môn',
        src: 'https://media.gqitalia.it/photos/609a802887b06705033b7093/3:4/w_2736,h_3648,c_limit/GettyImages-1298991700.jpg',
    },
    {
        name: 'Hậu vệ',
        src: 'https://ae01.alicdn.com/kf/HTB1dqY5cGagSKJjy0Fbq6y.mVXad/18608-Sergio-Ramos-T-y-Ban-Nha-C-u-Th-B-ng-V-ch-Gi-i.jpg_Q90.jpg_.webp',
    },
    { name: 'Tiền vệ', src: 'https://bloganchoi.com/wp-content/uploads/2020/07/kaka-milan.jpg' },
    { name: 'Tiền đạo', src: 'https://i.pinimg.com/originals/cb/aa/49/cbaa494630e80787291c9d5a5e8dffa7.jpg' },
];

const data = {
    storeRules,
    contacts,
    productOptionsList,
    productsOfField,
    slides,
    trademarks,
    position,
    allProductChoicesMenu,
};

export default data;
