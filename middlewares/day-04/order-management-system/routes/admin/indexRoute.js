import userRouter from './userRoute.js';

export const adminRouter = (app) => {
    app.use('/users', userRouter);
}