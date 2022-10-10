import express from 'express';
import route from './routes';

const PORT = process.env.PORT || 8000;

const app = express();

route(app);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
