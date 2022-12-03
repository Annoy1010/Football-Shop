import express from 'express';
import cors from 'cors';
import route from './routes';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));
// app.use(cors());

route(app);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
