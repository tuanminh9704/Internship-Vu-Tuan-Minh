import express from 'express';
import { routes } from './routes/index.route.js';
import { notFound, internalServerError } from './middlewares/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

routes(app);

app.use(notFound);
app.use(internalServerError);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})