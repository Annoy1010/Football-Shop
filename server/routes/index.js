import provinceRouter from './province';
import districtRouter from './district';
import wardRouter from './ward';

function route(app) {
    app.use('/province', provinceRouter);
    app.use('/district', districtRouter);
    app.use('/ward', wardRouter);
}

export default route;
