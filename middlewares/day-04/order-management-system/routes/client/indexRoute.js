import authRouter from './authRoute.js';
import orderRouter from './orderRoute.js';
import productRouter from './productRoute.js';

export const clientRouter = (app) => {
    app.use('/auth', authRouter);

    app.use('/products', productRouter);

    app.use('/orders', orderRouter)
}