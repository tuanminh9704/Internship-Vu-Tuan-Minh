import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { adminRouter } from './routes/admin/indexRoute.js';
import { clientRouter } from './routes/client/indexRoute.js';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(errorHandler);


adminRouter(app);
clientRouter(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
