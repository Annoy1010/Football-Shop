import classNames from 'classnames/bind';

import styles from './SlideShow.module.scss';

const cx = classNames.bind(styles);

function SlideShow() {
    return (
        <>
            <div id="mycarousel" className={cx('carousel slide')} dataRide="carousel">
                <ol className={cx('carousel-indicators')}>
                    <li dataTarget="#mycarousel" dataSlideTo="0" className={cx('active')}></li>
                    <li dataTarget="#mycarousel" dataSlideTo="1" className={cx('')}></li>
                    <li dataTarget="#mycarousel" dataSlideTo="2" className={cx('')}></li>
                </ol>

                <div className={cx('carousel-inner')}>
                    <div className={cx('carousel-item active')}>
                        <img
                            className={cx('d-block w-100')}
                            src="http://leanature.com/wp-content/uploads/2015/09/Slide_g%C3%A9n%C3%A9rique_Groupe.jpg"
                            alt=""
                        />
                    </div>

                    <div className={cx('carousel-item')}>
                        <img
                            className={cx('d-block w-100')}
                            src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/53a4bc56-d08f-4ee1-b542-a26a20945688/nature-wallpaper14.jpg"
                            alt=""
                        />
                    </div>

                    <div className={cx('carousel-item')}>
                        <img
                            className={cx('d-block w-100')}
                            src="http://files.all-free-download.com//downloadfiles/wallpapers/1280_720/beautiful_waterfall_wallpaper_rivers_nature_1142.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <div className={cx('control')}>
                <a className={cx('carousel-control-prev')} href="#mycarousel" role="button" data-slide="prev">
                    {' '}
                    <span className={cx('carousel-control-prev-icon')} aria-hidden="true"></span>{' '}
                    <span className={cx('sr-only')}>Previous</span>
                </a>
                <a className={cx('carousel-control-next')} href="#mycarousel" role="button" data-slide="next">
                    {' '}
                    <span className={cx('carousel-control-next-icon')} aria-hidden="true"></span>{' '}
                    <span className={cx('sr-only')}>Next</span>{' '}
                </a>
            </div>
        </>
    );
}

export default SlideShow;
