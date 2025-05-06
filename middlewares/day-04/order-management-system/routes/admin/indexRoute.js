import userRouter from './userRoute.js';
import productRouter from './productRoute.js'
import orderRouter from './orderRoute.js';
import {verifyTokenMiddleware, verifyUserAdmin} from '../../middlewares/authMiddleware.js';

export const adminRouter = (app) => {
    app.use('/admin/users', userRouter);

    app.use('/admin/products', productRouter);

    app.use('/admin/orders', orderRouter);

}