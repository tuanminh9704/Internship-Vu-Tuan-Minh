import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';

import {routerClient} from './routes/indexRoute.js';
import ipLogger from './middlewares/logIP.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

const  accessLogStream = fs.createWriteStream('access.log', { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))


app.use(ipLogger);
app.use(errorHandler);

routerClient(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})