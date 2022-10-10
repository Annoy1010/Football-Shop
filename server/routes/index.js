import provinceRouter from './province';

function route(app) {
    app.use('/province', provinceRouter);
}

export default route;
