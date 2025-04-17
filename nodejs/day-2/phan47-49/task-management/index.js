import express from 'express';
import { routes } from './routes/index.route.js';
import { authMiddleware } from './middlewares/auth.js';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(authMiddleware);

routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})