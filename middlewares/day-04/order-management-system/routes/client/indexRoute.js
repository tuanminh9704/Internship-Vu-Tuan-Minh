import authRouter from './authRoute.js';

export const clientRouter = (app) => {
    app.use('/auth', authRouter);
}