import productRouter from './productRoute.js';
import {auth} from '../middlewares/checkAuth.js';

export const routerClient = (app) => {
    app.use(auth);
    app.use('/products', productRouter);
}