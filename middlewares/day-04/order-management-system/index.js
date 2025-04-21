import express from 'express';
import bodyParser from 'body-parser';

import { adminRouter } from './routes/admin/indexRoute.js';
import { clientRouter } from './routes/client/indexRoute.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


adminRouter(app);
clientRouter(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
