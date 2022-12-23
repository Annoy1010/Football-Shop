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
import bankRouter from './bank';
import parameterRouter from './parameter';

function route(app) {
    app.use('/bank', bankRouter);
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
    app.use('/parameter', parameterRouter);
}

export default route;
