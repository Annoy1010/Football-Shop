import provinceRouter from './province';
import districtRouter from './district';
import wardRouter from './ward';
import storeRouter from './store';
import userRouter from './user';

function route(app) {
    app.use('/province', provinceRouter);
    app.use('/district', districtRouter);
    app.use('/ward', wardRouter);
    app.use('/store', storeRouter);
    app.use('/user', userRouter);
}

export default route;
