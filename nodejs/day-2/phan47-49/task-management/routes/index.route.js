import taskRouter from './task.route.js';

export const routes = (app) => {
    app.use('/tasks', taskRouter);
}
