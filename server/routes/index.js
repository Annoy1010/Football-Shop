import provinceRouter from './province';
import districtRouter from './district';
import wardRouter from './ward';
import storeRouter from './store';
import userRouter from './user';
import forgetpasswordRouter from './forgetpassword';
import sendemailRouter from './sendEmail';
import feedbackRouter from './feedback';
import productRouter from './product';
import orderRouter from './order';

function route(app) {
    app.use('/province', provinceRouter);
    app.use('/district', districtRouter);
    app.use('/ward', wardRouter);
    app.use('/store', storeRouter);
    app.use('/user', userRouter);
    app.use('/forgetpassword', forgetpasswordRouter);
    app.use('/sendemail', sendemailRouter);
    app.use('/feedback', feedbackRouter);
    app.use('/products', productRouter);
    app.use('/order', orderRouter);
}

export default route;
